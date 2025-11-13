import { assets } from "../assets/assets";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Heading */}
      <h1 className="text-center text-4xl sm:text-5xl font-extrabold uppercase text-gray-900 mb-8">
        Contact Us
      </h1>

      {/* Intro Text */}
      <p className="text-gray-700 text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto mb-12 text-center">
        Welcome to{" "}
        <span className="text-blue-600 font-semibold">MyBlog</span>, your go-to
        platform for insightful articles on technology, lifestyle, and beyond.
        <br />
        Our mission is to share knowledge and inspire creativity through
        engaging and well-researched content. Whether you're a tech enthusiast,
        a passionate writer, or someone looking for inspiration, we've got
        something for you!
      </p>

      {/* Contact Image */}
      <div className="flex justify-center mb-12">
        <img
          src={assets.contact}
          alt="Contact Us"
          className="rounded-lg shadow-lg max-w-full h-auto"
        />
      </div>

      {/* Contact Info Section */}
      <section className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Get in Touch
        </h2>
        <p className="text-gray-700 text-center mb-8">
          Have questions, suggestions, or feedback? We'd love to hear from you!
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700 text-center">
          <div className="flex flex-col items-center">
            <span className="font-semibold text-blue-600">Email</span>
            <a href="mailto:contact@myblog.com" className="hover:underline mt-1">
              contact@myblog.com
            </a>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-semibold text-blue-600">Phone</span>
            <a href="tel:+911234567890" className="hover:underline mt-1">
              +91 12345 67890
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
