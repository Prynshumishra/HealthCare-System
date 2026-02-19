import React from "react";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div>
      <h1 className="text-center font-semibold text-3xl pt-10 text-gray-800">
        ABOUT <span className="text-primary">US</span>
      </h1>

      <div className="my-10 flex flex-col md:flex-row gap-12 items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 justify-center">
        <img
          className="w-full md:max-w-[360px]"
          src={assets.about_image}
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-1/2 text-m text-gray-600">
          <p>
            Welcome to Prescripto, your trusted partner in managing your
            healthcare needs conveniently and efficiently. At Prescripto, we
            understand the challenges individuals face when it comes to
            scheduling doctor appointments and managing their health records.
          </p>
          <p>
            Prescripto is committed to excellence in healthcare technology. We
            continuously strive to enhance our platform, integrating the latest
            advancements to improve user experience and deliver superior
            service. Whether you're booking your first appointment or managing
            ongoing care, Prescripto is here to support you every step of the
            way.
          </p>
        </div>
      </div>

      {/* WHY CHOOSE US */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-14 pt-16">
          <p className="text-2xl sm:text-3xl font-semibold text-gray-800">
            WHY <span className="text-primary">CHOOSE US</span>
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          <div
            className="bg-white border rounded-2xl shadow-sm hover:shadow-lg
 px-6 sm:px-8 lg:px-10 py-8 sm:py-12 lg:py-16
                    flex flex-col gap-4 text-sm sm:text-[15px]
                    text-gray-600 hover:bg-primary hover:text-white
                    transition-all duration-300 cursor-pointer"
          >
            <b className="text-base sm:text-lg">Efficiency</b>
            <p>
              Streamlined appointment scheduling that fits into your busy
              lifestyle.
            </p>
          </div>

          <div
            className="bg-white border rounded-2xl shadow-sm hover:shadow-lg
 px-6 sm:px-8 lg:px-10 py-8 sm:py-12 lg:py-16
                    flex flex-col gap-4 text-sm sm:text-[15px]
                    text-gray-600 hover:bg-primary hover:text-white
                    transition-all duration-300 cursor-pointer"
          >
            <b className="text-base sm:text-lg">Convenience</b>
            <p>
              Access to a network of trusted healthcare professionals in your
              area.
            </p>
          </div>

          <div
            className="bg-white border rounded-2xl shadow-sm hover:shadow-lg
 px-6 sm:px-8 lg:px-10 py-8 sm:py-12 lg:py-16
                    flex flex-col gap-4 text-sm sm:text-[15px]
                    text-gray-600 hover:bg-primary hover:text-white
                    transition-all duration-300 cursor-pointer"
          >
            <b className="text-base sm:text-lg">Personalization</b>
            <p>
              Tailored recommendations and reminders to help you stay on top of
              your health.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gray-50 py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-8 text-center">
            <div>
              <p className="font-bold text-primary text-3xl sm:text-4xl lg:text-5xl">
                10K+
              </p>
              <p className="mt-2 text-gray-600 text-sm sm:text-base">
                Happy Patients
              </p>
            </div>

            <div>
              <p className="font-bold text-primary text-3xl sm:text-4xl lg:text-5xl">
                500+
              </p>
              <p className="mt-2 text-gray-600 text-sm sm:text-base">
                Verified Doctors
              </p>
            </div>

            <div>
              <p className="font-bold text-primary text-3xl sm:text-4xl lg:text-5xl">
                24/7
              </p>
              <p className="mt-2 text-gray-600 text-sm sm:text-base">
                Support Available
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mission & Values */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-14 pt-6">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">
            OUR <span className="text-primary">MISSION & VALUES</span>
          </h2>
          <p className="text-gray-500 mt-3 text-sm sm:text-base">
            What drives us every day at Prescripto
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          <div
            className="bg-white border rounded-2xl shadow-sm hover:shadow-lg
 px-6 sm:px-8 lg:px-10 py-8 sm:py-12 lg:py-16 
                    flex flex-col gap-4 text-sm sm:text-[15px] 
                    text-gray-600 hover:bg-primary hover:text-white 
                    transition-all duration-300 cursor-pointer"
          >
            <b className="text-base sm:text-lg">Patient First</b>
            <p>
              Every decision we make is guided by what’s best for patients and
              their healthcare journey.
            </p>
          </div>
          <div
            className="border rounded-2xl px-6 sm:px-8 lg:px-10 py-8 sm:py-12 lg:py-16 
                    flex flex-col gap-4 text-sm sm:text-[15px] 
                    text-gray-600 hover:bg-primary hover:text-white 
                    transition-all duration-300 cursor-pointer"
          >
            <b className="text-base sm:text-lg">Transparency</b>
            <p>
              We believe in honest communication, clear pricing, and trustworthy
              healthcare services.
            </p>
          </div>

          <div
            className="bg-white border rounded-2xl shadow-sm hover:shadow-lg px-6 sm:px-8 lg:px-10 py-8 sm:py-12 lg:py-16 
                    flex flex-col gap-4 text-sm sm:text-[15px] 
                    text-gray-600 hover:bg-primary hover:text-white 
                    transition-all duration-300 cursor-pointer"
          >
            <b className="text-base sm:text-lg">Innovation</b>
            <p>
              We continuously innovate to simplify healthcare using modern
              technology and user-focused design.
            </p>
          </div>
        </div>
      </div>

      {/* Our Journey Section */}
      <div className="max-w-6xl mx-auto px-6 mb-28">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-semibold text-gray-800">
            OUR <span className="text-primary">JOURNEY</span>
          </h2>
          <p className="text-gray-600 mt-3">
            Milestones that shaped Prescripto
          </p>
        </div>

        <div className="relative border-l-2 border-primary pl-8 space-y-12 ">
          <div>
            <span className="absolute -left-[10px] w-5 h-5 bg-primary rounded-full"></span>
            <h3 className="font-semibold text-gray-800">
              2022 – Idea & Research
            </h3>
            <p className="text-gray-600 text-sm mt-2">
              Prescripto was born from the idea of simplifying healthcare access
              through digital innovation.
            </p>
          </div>

          <div>
            <span className="absolute -left-[10px] w-5 h-5 bg-primary rounded-full"></span>
            <h3 className="font-semibold text-gray-800">
              2023 – Platform Launch
            </h3>
            <p className="text-gray-600 text-sm mt-2">
              We launched our platform with appointment booking and online
              consultations.
            </p>
          </div>

          <div>
            <span className="absolute -left-[10px] w-5 h-5 bg-primary rounded-full"></span>
            <h3 className="font-semibold text-gray-800">
              2024 – Growth & Expansion
            </h3>
            <p className="text-gray-600 text-sm mt-2">
              Expanded our doctor network and introduced personalized healthcare
              features.
            </p>
          </div>

          <div>
            <span className="absolute -left-[10px] w-5 h-5 bg-primary rounded-full"></span>
            <h3 className="font-semibold text-gray-800">
              2025 – Trusted Healthcare Partner
            </h3>
            <p className="text-gray-600 text-sm mt-2">
              Serving thousands of users with reliable, secure, and accessible
              healthcare solutions.
            </p>
          </div>
        </div>
      </div>




{/* Our Founder & Contributors */}
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
  {/* Heading */}
  <div className="text-center mb-14">
    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">
      OUR <span className="text-primary">CONTRIBUTORS</span>
    </h2>
    <p className="text-gray-500 mt-3 text-sm sm:text-base">
      The passionate minds behind Prescripto
    </p>
  </div>

  {/* Cards */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

    {/* Founder */}
    <div className="bg-white border rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col">
      
      <img
        src="https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&w=800&q=80"
        alt="Priyanshu Mishra"
        className="w-full h-56 object-cover"
      />

      <div className="p-6 text-center flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-800">
          Priyanshu Mishra
        </h3>
        <p className="text-primary text-sm mt-1">Head of Operations</p>
        <p className="text-gray-600 text-sm mt-4 flex-grow">
          Visionary leader passionate about transforming healthcare through
          digital innovation and patient-centric solutions.
        </p>
      </div>
    </div>

    {/* CTO */}
    <div className="bg-white border rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col">
      
      <img
        src="https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&w=800&q=80"
        alt="Sudhanshu Kumar Singh"
        className="w-full h-56 object-cover"
      />

      <div className="p-6 text-center flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-800">
          Sudhanshu Kumar Singh
        </h3>
        <p className="text-primary text-sm mt-1">Chief Technology Officer</p>
        <p className="text-gray-600 text-sm mt-4 flex-grow">
          Leads the technology vision, ensuring Prescripto remains innovative,
          secure, and user-focused.
        </p>
      </div>
    </div>

    {/* Operations Head */}
    <div className="bg-white border rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col">
      
      <img
        src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=800&q=80"
        alt="Anshul Singh"
        className="w-full h-56 object-cover"
      />

      <div className="p-6 text-center flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-800">
          Anshul Singh
        </h3>
        <p className="text-primary text-sm mt-1">Head of Operations</p>
        <p className="text-gray-600 text-sm mt-4 flex-grow">
          Ensures seamless operations and enhances patient experience across
          the platform.
        </p>
      </div>
    </div>

  </div>
</div>


  



      {/* Testimonials */}
      <div className="bg-gray-50 py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <div className="text-center mb-12 sm:mb-14">
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">
              WHAT OUR <span className="text-primary">USERS SAY</span>
            </h2>
            <p className="text-gray-600 mt-3 text-sm sm:text-base">
              Real experiences from people who trust Prescripto
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-6">
            <div
              className="bg-white border rounded-2xl shadow-sm hover:shadow-lg
 px-6 py-6 sm:py-8
                      flex flex-col gap-3 text-sm
                      text-gray-600 hover:bg-primary hover:text-white
                      transition-all duration-300 cursor-pointer"
            >
              <p className="leading-6">
                “Prescripto has completely changed how I manage my healthcare.
                Booking appointments is fast and stress-free.”
              </p>
              <p className="font-semibold text-gray-800 group-hover:text-white">
                Rohit Sharma
              </p>
              <p className="text-xs text-gray-500 group-hover:text-white">
                Patient
              </p>
            </div>

            <div
              className="bg-white border rounded-2xl shadow-sm hover:shadow-lg
 px-6 py-6 sm:py-8
                      flex flex-col gap-3 text-sm
                      text-gray-600 hover:bg-primary hover:text-white
                      transition-all duration-300 cursor-pointer"
            >
              <p className="leading-6">
                “The platform is incredibly easy to use. I can consult doctors online without long waiting times, and manage my appointments with just a few clicks.”
              </p>
              <p className="font-semibold text-gray-800">Ananya Verma</p>
              <p className="text-xs text-gray-500">Working Professional</p>
            </div>

            <div
              className="bg-white border rounded-2xl shadow-sm hover:shadow-lg
 px-6 py-6 sm:py-8
                      flex flex-col gap-3 text-sm
                      text-gray-600 hover:bg-primary hover:text-white
                      transition-all duration-300 cursor-pointer"
            >
              <p className="leading-6">
                “As a doctor, Prescripto helps me connect with patients more
                efficiently while maintaining quality care.”
              </p>
              <p className="font-semibold text-gray-800">Dr. Ryan Martinez</p>
              <p className="text-xs text-gray-500"> Gynecologist</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
