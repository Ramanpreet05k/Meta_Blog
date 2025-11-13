import { useContext } from "react";
import BlogCard from "./BlogCard";
import { StoreContext } from "../context/StoreContext";

const LatestBlogs = () => {
  const { blogData } = useContext(StoreContext);

  // Get the latest 6 blogs safely (defensive copy)
  const latestBlogs = Array.isArray(blogData) ? blogData.slice(-6).reverse() : [];

  // Robust date parser that handles strings, numbers, Date objects, and some Mongo shapes
  const parseDate = (input) => {
    if (!input) return null;

    // If already a Date
    if (input instanceof Date && !isNaN(input.getTime())) return input;

    // If a number (unix ms)
    if (typeof input === "number" && !isNaN(input)) return new Date(input);

    // If a string: try direct parse then numeric fallback
    if (typeof input === "string") {
      const d = new Date(input);
      if (!isNaN(d.getTime())) return d;
      const n = Number(input);
      if (!isNaN(n)) return new Date(n);
      return null;
    }

    // If an object (e.g. Mongo returns {$date: "..."} or { $date: { $numberLong: "..." } })
    if (typeof input === "object") {
      // Common Mongo representation
      if (input.$date) return parseDate(input.$date);
      if (input.$numberLong) return parseDate(Number(input.$numberLong));
      // Firestore-like seconds/nanos
      if (input.seconds && !isNaN(input.seconds)) return new Date(input.seconds * 1000);
      // Try toString fallback
      try {
        const s = String(input);
        const d = new Date(s);
        if (!isNaN(d.getTime())) return d;
      } catch (e) {
        return null;
      }
    }

    return null;
  };

  const formatDate = (input) => {
    const d = parseDate(input);
    if (!d) return "Recently Published";
    return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
  };

  // Debugging helper — uncomment to inspect values in the browser console
  // latestBlogs.forEach(b => console.log("createdAt raw:", b._id, b.createdAt));

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-8 text-center sm:text-left">
          Latest Blogs
        </h2>

        {latestBlogs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {latestBlogs.map((blog) => (
              <BlogCard
                key={blog._id}
                id={blog._id}
                title={blog.title}
                image={blog.image}
                category={blog.category}
                author_name={blog.author?.name || "Unknown Author"}
                author_image={blog.author?.image}
                date={formatDate(blog.createdAt)}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 italic">No blogs available at the moment. Stay tuned!</p>
        )}
      </div>
    </section>
  );
};

export default LatestBlogs;
