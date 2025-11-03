import { Link } from "react-router-dom";

const BlogCard = ({
  id,
  title,
  category,
  image,
  author_name,
  author_image,
  date,
}) => {
  return (
    <div className="border border-gray-200 shadow-md rounded-xl overflow-hidden hover:shadow-xl transition duration-300 bg-white">
      {/* Blog Image */}
      <Link to={`/blog/${id}`}>
        <img
          src={`http://localhost:4000/images/${image}`}
          alt={title}
          className="w-full h-52 object-cover cursor-pointer transform transition duration-300 hover:scale-105"
        />
      </Link>

      {/* Blog Content */}
      <div className="p-4">
        <p className="text-sm text-blue-600 font-semibold uppercase tracking-wide mb-2">
          {category}
        </p>

        <h1 className="text-lg font-bold text-gray-800 hover:text-blue-600 transition duration-200 line-clamp-2">
          {title}
        </h1>

        {/* Author + Date */}
        <div className="flex items-center gap-3 mt-4">
          <img
            className="w-10 h-10 rounded-full border object-cover"
            src={`http://localhost:4000/images/${author_image}`}
            alt={author_name}
          />
          <div className="flex flex-col">
            <p className="text-sm font-semibold text-gray-700">{author_name}</p>
            <p className="text-xs text-gray-500">
              {new Date(date).toLocaleDateString("en-US", {
                month: "short",
                day: "2-digit",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
