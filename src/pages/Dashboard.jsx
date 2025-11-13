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
      fetchBlogs(); // refresh list after creating a blog
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const fetchBlogs = async () => {
    try {
      const res = await axios.get("http://localhost:4000/blog/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBlogs(res.data.blogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      toast.error("Failed to fetch blogs");
    }
  };

  useEffect(() => {
    fetchBlogs();
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
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col p-6 shadow-lg">
        <h2 className="text-3xl font-bold mb-10 text-center border-b border-gray-700 pb-4">
          Dashboard
        </h2>
        <nav className="flex flex-col gap-3">
          <button
            className={`w-full text-left py-3 px-4 rounded-lg transition ${
              activeTab === "post"
                ? "bg-orange-500 shadow-lg"
                : "hover:bg-gray-800 bg-gray-800"
            }`}
            onClick={() => setActiveTab("post")}
          >
            ✍️ Post a Blog
          </button>
          <button
            className={`w-full text-left py-3 px-4 rounded-lg transition ${
              activeTab === "list"
                ? "bg-orange-500 shadow-lg"
                : "hover:bg-gray-800 bg-gray-800"
            }`}
            onClick={() => setActiveTab("list")}
          >
            📑 List of Blogs
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 overflow-y-auto">
        {activeTab === "post" ? (
          <div className="bg-white shadow-lg rounded-xl p-8 max-w-2xl mx-auto">
            <h2 className="text-3xl font-semibold mb-6 border-b pb-4">
              Create a New Blog
            </h2>
            <form onSubmit={submitHandler} className="flex flex-col gap-5">
              <input
                name="title"
                value={formData.title}
                onChange={onChangeHandler}
                type="text"
                placeholder="Enter blog title"
                className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-orange-400 outline-none shadow-sm"
              />
              <input
                name="category"
                value={formData.category}
                onChange={onChangeHandler}
                type="text"
                placeholder="Enter category"
                className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-orange-400 outline-none shadow-sm"
              />
              <textarea
                name="description"
                value={formData.description}
                onChange={onChangeHandler}
                placeholder="Write blog description..."
                className="border border-gray-300 rounded-lg p-3 h-32 resize-none focus:ring-2 focus:ring-orange-400 outline-none shadow-sm"
              />
              <div>
                <label className="block font-medium mb-2">Upload Image</label>
                <input
                  onChange={fileHandler}
                  type="file"
                  accept="image/*"
                  className="w-full border border-gray-300 rounded-lg p-2 cursor-pointer"
                />
              </div>
              <button className="bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold shadow-md transition">
                🚀 Publish Blog
              </button>
            </form>
          </div>
        ) : (
          <div className="bg-white shadow-lg rounded-xl p-8">
            <h2 className="text-3xl font-semibold mb-6 border-b pb-4">
              All Blogs
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                <thead className="bg-gray-50 text-gray-700">
                  <tr>
                    <th className="px-6 py-3 border-b text-left">Title</th>
                    <th className="px-6 py-3 border-b text-left">Category</th>
                    <th className="px-6 py-3 border-b text-center">Image</th>
                    <th className="px-6 py-3 border-b text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {blogs.length > 0 ? (
                    blogs.map((blog) => (
                      <tr
                        key={blog._id}
                        className="hover:bg-gray-50 transition"
                      >
                        <td className="px-6 py-3 border-b">{blog.title}</td>
                        <td className="px-6 py-3 border-b">{blog.category}</td>
                        <td className="px-6 py-3 border-b text-center">
                          <img
                            src={`http://localhost:4000/images/${blog.image}`}
                            alt={blog.title}
                            className="w-20 h-20 object-cover mx-auto rounded-md shadow"
                          />
                        </td>
                        <td className="px-6 py-3 border-b text-center">
                          <button
                            onClick={() => removeBlog(blog._id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md transition"
                          >
                            ❌ Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-gray-500 py-4 text-center italic">
                        No blogs available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
