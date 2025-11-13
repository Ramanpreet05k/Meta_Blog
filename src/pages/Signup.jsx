import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle input changes
  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file input
  const fileHandler = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  // Handle form submission
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!formData.image) {
      return toast.error("Please select a profile image");
    }

    try {
      setLoading(true);
      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("password", formData.password);
      data.append("image", formData.image);

      const res = await axios.post(
        "http://localhost:4000/user/register",
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message || "Signup failed");
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
          Create Your Account
        </h1>
        <form
          onSubmit={submitHandler}
          className="flex flex-col gap-4 mt-6"
        >
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={onChangeHandler}
            placeholder="Your Name"
            required
            className="w-full p-2 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-orange-400"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={onChangeHandler}
            placeholder="Your Email"
            required
            className="w-full p-2 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-orange-400"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={onChangeHandler}
            placeholder="Your Password"
            required
            className="w-full p-2 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-orange-400"
          />
          <input
            type="file"
            accept="image/*"
            onChange={fileHandler}
            required
            className="w-full p-2 border border-gray-300 rounded outline-none"
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 rounded text-white ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-orange-600 hover:bg-orange-700"
            }`}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
        <p className="text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-orange-600 hover:underline">
            Login Here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
