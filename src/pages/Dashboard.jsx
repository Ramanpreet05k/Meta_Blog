import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("list");
  const token = localStorage.getItem("token");
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    image: null,
  });
  const [blogs, setBlogs] = useState([]);

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fileHandler = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", formData.title);
    data.append("category", formData.category);
    data.append("description", formData.description);
    data.append("image", formData.image);

    try {
      const res = await axios.post("http://localhost:4000/blog/create", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(res.data.message);
      setFormData({ title: "", category: "", description: "", image: null });
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const allBlogs = async () => {
      try {
        const res = await axios.get("http://localhost:4000/blog/all", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBlogs(res.data.blogs);
      } catch (error) {
        console.log("error", error);
      }
    };
    allBlogs();
  }, []);

  const removeBlog = async (blogId) => {
    try {
      const res = await axios.delete(
        `http://localhost:4000/blog/delete/${blogId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success(res.data.message);
      setBlogs(blogs.filter((blog) => blog._id !== blogId));
    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting blog");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white flex flex-col p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-8">Dashboard</h2>
        <button
          className={`w-full text-left py-2 px-4 mb-2 rounded-lg transition ${
            activeTab === "post"
              ? "bg-orange-500"
              : "hover:bg-gray-700 bg-gray-800"
          }`}
          onClick={() => setActiveTab("post")}
        >
          ✍️ Post a Blog
        </button>
        <button
          className={`w-full text-left py-2 px-4 rounded-lg transition ${
            activeTab === "list"
              ? "bg-orange-500"
              : "hover:bg-gray-700 bg-gray-800"
          }`}
          onClick={() => setActiveTab("list")}
        >
          📑 List of Blogs
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        {activeTab === "post" ? (
          <div className=" bg-white shadow-md rounded-xl p-6">
            <h2 className="text-2xl font-semibold mb-6">Create a New Blog</h2>
            <form onSubmit={submitHandler} className="flex flex-col gap-4">
              <input
                name="title"
                value={formData.title}
                onChange={onChangeHandler}
                type="text"
                placeholder="Enter blog title"
                className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-orange-400 outline-none"
              />
              <input
                name="category"
                value={formData.category}
                onChange={onChangeHandler}
                type="text"
                placeholder="Enter category"
                className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-orange-400 outline-none"
              />
              <textarea
                name="description"
                value={formData.description}
                onChange={onChangeHandler}
                placeholder="Write blog description..."
                className="border border-gray-300 rounded-lg p-3 h-28 resize-none focus:ring-2 focus:ring-orange-400 outline-none"
              />
              <div>
                <label className="block font-medium mb-1">Upload Image</label>
                <input
                  onChange={fileHandler}
                  type="file"
                  accept="image/*"
                  className="w-full border border-gray-300 rounded-lg p-2 cursor-pointer"
                />
              </div>
              <button className="bg-orange-500 hover:bg-orange-600 transition text-white rounded-lg py-2 font-semibold">
                🚀 Publish Blog
              </button>
            </form>
          </div>
        ) : (
          <div className="bg-white shadow-md rounded-xl p-6">
            <h2 className="text-2xl font-semibold mb-6">All Blogs</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-gray-100 text-gray-700">
                    <th className="border px-4 py-2">Title</th>
                    <th className="border px-4 py-2">Category</th>
                    <th className="border px-4 py-2">Image</th>
                    <th className="border px-4 py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {blogs.length > 0 ? (
                    blogs.map((blog) => (
                      <tr
                        key={blog._id}
                        className="text-center hover:bg-gray-50 transition"
                      >
                        <td className="border px-4 py-2">{blog.title}</td>
                        <td className="border px-4 py-2">{blog.category}</td>
                        <td className="border px-4 py-2">
                          <img
                            src={`http://localhost:4000/images/${blog.image}`}
                            alt={blog.title}
                            className="w-16 h-16 object-cover mx-auto rounded-md shadow"
                          />
                        </td>
                        <td className="border px-4 py-2">
                          <button
                            onClick={() => removeBlog(blog._id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition"
                          >
                            ❌ Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="4"
                        className="text-gray-500 py-4 text-center italic"
                      >
                        No blogs available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
