import React from 'react';

const Contact = () => {
  return (
    <section className="bg-white text-gray-800 py-16 px-6 md:px-12 lg:px-24">
      <div className="container mx-auto">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center mb-6">Contact Us</h2>
        <p className="text-center text-lg text-gray-600 max-w-2xl mx-auto mb-12">
          We'd love to hear from you! Feel free to reach out to us with any questions, inquiries, or feedback.
        </p>

        {/* Contact Info and Form Container */}
        <div className="flex flex-col md:flex-row justify-between md:space-x-8">
          {/* Contact Info */}
          <div className="flex-1 mb-8 md:mb-0">
            <h3 className="text-2xl font-semibold mb-4">Our Contact Information</h3>
            <p className="text-gray-600 mb-4">
              If you have any questions or concerns, feel free to reach us through any of the methods below. We’re here to assist you!
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <span className="material-icons text-blue-500 mr-4">phone</span>
                <p className="text-gray-600">+1 234 567 890</p>
              </div>
              <div className="flex items-center">
                <span className="material-icons text-blue-500 mr-4">email</span>
                <p className="text-gray-600">contact@financecompany.com</p>
              </div>
              <div className="flex items-center">
                <span className="material-icons text-blue-500 mr-4">location_on</span>
                <p className="text-gray-600">123 Finance Street, Business City, USA</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="flex-1">
            <h3 className="text-2xl font-semibold mb-4">Get in Touch</h3>
            <form className="space-y-6">
              <div>
                <label className="block text-gray-600 mb-2" htmlFor="name">Name</label>
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="text"
                  id="name"
                  placeholder="Your Name"
                />
              </div>

              <div>
                <label className="block text-gray-600 mb-2" htmlFor="email">Email</label>
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="email"
                  id="email"
                  placeholder="Your Email"
                />
              </div>

              <div>
                <label className="block text-gray-600 mb-2" htmlFor="message">Message</label>
                <textarea
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  id="message"
                  placeholder="Your Message"
                  rows="5"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
