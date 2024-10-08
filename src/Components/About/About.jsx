import React from 'react';

const AboutUs = () => {
  return (
    <section className="bg-white text-gray-800 py-16 px-6 md:px-12 lg:px-24">
      <div className="container mx-auto">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center mb-6">About Us</h2>
        <p className="text-center text-lg text-gray-600 max-w-2xl mx-auto mb-12">
          We are a trusted financial services provider, dedicated to helping individuals and businesses achieve their financial goals through expert advice, personalized solutions, and innovative technology.
        </p>

        {/* Team and Mission Section */}
        <div className="flex flex-col md:flex-row md:space-x-8 mb-16">
          {/* Mission */}
          <div className="flex-1 mb-8 md:mb-0">
            <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
            <p className="text-gray-600">
              Our mission is to empower our clients with financial security, growth, and peace of mind by offering high-quality, tailor-made solutions that meet their unique needs. We strive to build long-term relationships based on trust and transparency.
            </p>
          </div>

          {/* Vision */}
          <div className="flex-1">
            <h3 className="text-2xl font-semibold mb-4">Our Vision</h3>
            <p className="text-gray-600">
              We envision a future where financial success is attainable for everyone. Through our innovative and comprehensive financial services, we aim to make a meaningful impact in the lives of our clients and contribute positively to the community.
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center">
          <h3 className="text-2xl font-semibold mb-8">Meet Our Team</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <img
                src="https://via.placeholder.com/150"
                alt="Team Member"
                className="w-32 h-32 rounded-full mx-auto mb-4"
              />
              <h4 className="text-xl font-bold">John Doe</h4>
              <p className="text-gray-600">Chief Financial Officer</p>
            </div>
            {/* Team Member 2 */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <img
                src="https://via.placeholder.com/150"
                alt="Team Member"
                className="w-32 h-32 rounded-full mx-auto mb-4"
              />
              <h4 className="text-xl font-bold">Jane Smith</h4>
              <p className="text-gray-600">Senior Financial Advisor</p>
            </div>
            {/* Team Member 3 */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <img
                src="https://via.placeholder.com/150"
                alt="Team Member"
                className="w-32 h-32 rounded-full mx-auto mb-4"
              />
              <h4 className="text-xl font-bold">Michael Lee</h4>
              <p className="text-gray-600">Investment Specialist</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
