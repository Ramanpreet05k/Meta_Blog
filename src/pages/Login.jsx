import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { StoreContext } from "../context/StoreContext";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const { loginUser } = useContext(StoreContext);
  const navigate = useNavigate();

  // Handle input changes
  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:4000/user/login",
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (res.data.success) {
        const { user, token } = res.data;
        loginUser(user, token); // Update context
        toast.success(res.data.message);
        navigate("/"); // Redirect to homepage
      } else {
        toast.error(res.data.message || "Login failed!");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-pink-200 min-h-screen flex items-center justify-center py-12">
      <div className="bg-white max-w-md w-full p-6 rounded shadow-md border border-gray-200">
        <h1 className="text-2xl font-bold text-center text-gray-700">
          Login to Your Account
        </h1>
        <form
          onSubmit={submitHandler}
          className="flex flex-col gap-4 mt-6"
        >
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={onChangeHandler}
            placeholder="Your email"
            required
            className="w-full p-2 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-orange-400"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={onChangeHandler}
            placeholder="Your password"
            required
            className="w-full p-2 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-orange-400"
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 rounded text-white ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-orange-600 hover:bg-orange-700"
            }`}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
        <p className="text-center mt-4 text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-orange-600 hover:underline">
            Register Here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
