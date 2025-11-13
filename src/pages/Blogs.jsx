import Hero from "../components/Hero";
import BlogCard from "../components/BlogCard";
import { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import { Link } from "react-router-dom";

const Blogs = () => {
  const { blogData } = useContext(StoreContext);

  // Helper function to format dates
  const formatDate = (dateString) => {
    if (!dateString) return "Recently Published";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Recently Published";
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <Hero />

      {/* Heading Section */}
      <section className="text-center py-16 px-4 sm:px-6 lg:px-8 bg-white shadow-sm">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
          All Blogs
        </h1>
        <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
          Explore our collection of insightful blogs covering tech, creativity, and
          industry trends. From practical tips to innovative ideas, stay informed and inspired.
          <br />
          Dive into the latest posts below and join our journey of knowledge and discovery.
        </p>
      </section>

      {/* Blog Cards Grid */}
      <section className="grid my-16 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-4 sm:px-6 lg:px-12">
        {blogData.length > 0 ? (
          blogData.map((blog) => (
            <BlogCard
              key={blog._id}
              id={blog._id}
              title={blog.title}
              image={blog.image}
              category={blog.category}
              author_name={blog.author.name}
              author_image={blog.author.image}
              date={formatDate(blog.createdAt)} // native formatting
            />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No blogs available at the moment. Check back soon!
          </p>
        )}
      </section>

      {/* Call to Action */}
      <section className="text-center py-16 bg-blue-600 text-white rounded-t-3xl relative overflow-hidden">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Stay Updated!</h2>
          <p className="text-lg sm:text-xl mb-8">
            Subscribe to our newsletter and be the first to know about new blogs, tips, and insights from the world of tech and creativity.
          </p>

          <Link to="/" className="inline-block">
            <button className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-full shadow-lg hover:scale-105 hover:bg-gray-100 transition-transform duration-300">
              🔔 Visit Regularly
            </button>
          </Link>

          <p className="text-sm text-blue-200 mt-4">
            Your next favorite read is just a click away!
          </p>
        </div>

        {/* Decorative Shapes */}
        <div className="absolute top-0 left-0 w-48 h-48 bg-white opacity-10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-white opacity-10 rounded-full translate-x-1/2 translate-y-1/2"></div>
      </section>
    </div>
  );
};

export default Blogs;
