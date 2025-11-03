import Hero from "../components/Hero";
import BlogCard from "../components/BlogCard";
import { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import { Link } from "react-router-dom";

const Blogs = () => {
  const { blogData } = useContext(StoreContext);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Heading */}
      <section className="text-center py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
          All Blogs
        </h1>
        <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
          Welcome to our collection of insightful blogs where we share knowledge,
          experiences, and stories from across the tech and creative world.
          <br />
          Whether you’re here to explore cutting-edge topics like Artificial Intelligence
          and Web Development, gain practical tips for everyday challenges, or simply
          enjoy fresh perspectives, we’ve got something for you.
          <br />
          Dive into the latest posts below and join us on this journey of learning,
          discovery, and innovation!
        </p>
      </section>

      {/* Blog Cards Grid */}
      <section className="grid my-12 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 sm:px-6 lg:px-8">
        {blogData.map((blog, index) => (
          <BlogCard
            key={index}
            id={blog._id}   // ✅ Use MongoDB _id
            title={blog.title}
            image={blog.image}
            category={blog.category}
            author_name={blog.author.name}
            author_image={blog.author.image}
            date={blog.date} // ✅ Better to use createdAt if available
          />
        ))}
      </section>

      {/* Call to Action */}
     {/* Call to Action */}


{/* Call to Action */}
<section className="text-center py-12 bg-blue-600 text-white rounded-t-3xl">
  <h2 className="text-3xl sm:text-4xl font-bold mb-4">Stay Tuned!</h2>
  <p className="text-lg sm:text-xl mb-6">
    Exciting content and new blogs are coming your way. Keep visiting our website to stay updated with the latest stories, tips, and insights from the world of tech, creativity, and beyond.
  </p>
  
  <Link to="/" className="inline-block">
    <button className="bg-white text-blue-600 font-bold px-6 py-3 rounded-full shadow-lg hover:scale-105 hover:bg-gray-100 transition-transform duration-300">
      🔔 Visit Regularly
    </button>
  </Link>

  <p className="text-sm text-blue-200 mt-4">
    Your next favorite read is just a click away!
  </p>
</section>


    </div>
  );
};

export default Blogs;
