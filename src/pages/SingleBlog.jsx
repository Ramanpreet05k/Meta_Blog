import { useContext } from "react";
import { useParams } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";

const SingleBlog = () => {
  const { id } = useParams();
  const { blogData } = useContext(StoreContext);

  const blog = blogData.find((b) => String(b._id) === String(id));

  if (!blog) {
    return <p className="text-center text-red-500 mt-10 text-lg">Blog not found</p>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Blog Image */}
      <div className="overflow-hidden rounded-xl shadow-md">
        <img
          className="w-full h-[400px] object-cover transition-transform duration-500 hover:scale-105"
          src={`http://localhost:4000/images/${blog.image}`}
          alt={blog.title}
        />
      </div>

      {/* Blog Meta */}
      <div className="mt-6 flex flex-col gap-3 text-center">
        <p className="text-blue-600 font-semibold uppercase tracking-wide text-sm">
          {blog.category}
        </p>
        <h1 className="text-3xl font-bold text-gray-900">{blog.title}</h1>
        <p className="text-gray-500 text-sm">
          {new Date(blog.createdAt).toLocaleDateString("en-US", {
            month: "long",
            day: "2-digit",
            year: "numeric",
          })}
        </p>
      </div>

      {/* Author Info */}
      <div className="mt-6 flex items-center justify-center gap-3">
        <img
          className="w-12 h-12 rounded-full border object-cover"
          src={`http://localhost:4000/images/${blog.author.image}`}
          alt={blog.author.name}
        />
        <p className="text-lg font-semibold text-gray-700">
          {blog.author.name}
        </p>
      </div>

      {/* Blog Description */}
      <div className="mt-8 text-gray-700 leading-relaxed text-justify space-y-4">
        <p>{blog.description}</p>
      </div>
    </div>
  );
};

export default SingleBlog;
