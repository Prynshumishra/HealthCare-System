import React from "react";
import { useNavigate } from "react-router-dom";
import { FaHandsHelping, FaEye, FaUsers, FaHeartbeat } from "react-icons/fa";

const Career = () => {
  const navigate = useNavigate();
  const slugifyRole = (value) =>
    value
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  return (
    <div>
      {/* Career Hero Section */}
      <div className="bg-gray-50 py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <div className="text-center lg:text-left">
              <h1 className="text-4xl sm:text-4xl lg:text-5xl font-semibold text-gray-800 leading-tight">
                CAREERS AT <span className="text-primary">PRESCRIPTO</span>
              </h1>

              <p className="text-gray-600 text-xl mt-5 max-w-xl mx-auto lg:mx-0 leading-7">
                Join our mission to make healthcare accessible, reliable, and
                convenient for everyone. Work with passionate people and build
                solutions that truly matter.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a
                  href="#open-roles"
                  className="bg-primary text-white px-8 py-3 rounded-lg hover:opacity-90 transition"
                >
                  View Open Roles
                </a>

                <a
                  href="mailto:prynshu@gmail.com"
                  className="border border-primary text-primary px-8 py-3 rounded-lg hover:bg-primary hover:text-white transition"
                >
                  Send Resume
                </a>
              </div>
            </div>

            {/* Right: Hero Image */}
            <div className="flex justify-center">
              <img
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1000&auto=format&fit=crop"
                alt="Careers at Prescripto"
                className="w-full max-w-lg rounded-3xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Why Work With Us */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-white">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-12">
          WHY WORK WITH <span className="text-primary">US</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Meaningful Impact",
              desc: "Work on products that genuinely improve people's healthcare experience.",
            },
            {
              title: "Growth & Learning",
              desc: "We support continuous learning, skill development, and career growth.",
            },
            {
              title: "Collaborative Culture",
              desc: "Be part of a supportive team that values ideas and innovation.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="border rounded-3xl p-8 text-gray-600 hover:bg-primary hover:text-white transition"
            >
              <h3 className="font-semibold text-lg mb-3">{item.title}</h3>
              <p className="text-sm leading-6">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Life at Prescripto */}
      <div
        className="bg-gradient-to-br from-gray-100 via-white to-gray-200
 px-4 sm:px-6 lg:px-8 py-20"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-gray-800 m-6">
              LIFE AT <span className="text-primary">PRESCRIPTO</span>
            </h2>

            <p className="text-gray-600 max-w-3xl mx-auto leading-7">
              At Prescripto, we believe in ownership, transparency, and
              collaboration. We encourage open communication, value diverse
              perspectives, and empower our team to build solutions that truly
              matter in healthcare.
            </p>
          </div>

          {/* Culture Values */}
          <div className=" bg-gray-250 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {/* Ownership */}
              <div className="border rounded-2xl p-6 text-center hover:bg-primary hover:text-white transition">
                <div className="flex justify-center mb-4">
                  <FaHandsHelping size={32} />
                </div>
                <h3 className="font-semibold text-lg mb-2">Ownership</h3>
                <p className="text-sm leading-6">
                  We take responsibility for our work and treat every challenge
                  as our own.
                </p>
              </div>

              {/* Transparency */}
              <div className="border rounded-2xl p-6 text-center hover:bg-primary hover:text-white transition">
                <div className="flex justify-center mb-4">
                  <FaEye size={32} />
                </div>
                <h3 className="font-semibold text-lg mb-2">Transparency</h3>
                <p className="text-sm leading-6">
                  Open communication and honest feedback are part of our
                  everyday culture.
                </p>
              </div>

              {/* Collaboration */}
              <div className="border rounded-2xl p-6 text-center hover:bg-primary hover:text-white transition">
                <div className="flex justify-center mb-4">
                  <FaUsers size={32} />
                </div>
                <h3 className="font-semibold text-lg mb-2">Collaboration</h3>
                <p className="text-sm leading-6">
                  We work as one team, sharing ideas and supporting each other’s
                  success.
                </p>
              </div>

              {/* Impact */}
              <div className="border rounded-2xl p-6 text-center hover:bg-primary hover:text-white transition">
                <div className="flex justify-center mb-4">
                  <FaHeartbeat size={32} />
                </div>
                <h3 className="font-semibold text-lg mb-2">Impact</h3>
                <p className="text-sm leading-6">
                  Our work directly improves how people access and experience
                  healthcare.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Culture Quote */}
      <div className="bg-gradient-to-r from-primary to-blue-400 text-white p-6 sm:p-12 max-w-7xl mx-auto">
        <p className="text-white italic leading-7 text-center">
          “At Prescripto, we don’t just build technology — we build trust,
          collaboration, and solutions that make a real difference in people’s
          lives.”
        </p>
      </div>

      {/* Teams Section */}
      <div className="bg-white px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-semibold text-gray-800 text-center mb-12">
            OUR <span className="text-primary">TEAMS</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {[
              "Engineering",
              "Design",
              "Marketing",
              "Operations",
              "Product",
              "Customer Support",
              "Data & Analytics",
              "HR & People",
            ].map((team, index) => (
              <div
                key={index}
                className="border rounded-xl py-6 font-medium text-gray-700 hover:bg-primary hover:text-white transition"
              >
                {team}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hiring Process */}
      <div className="bg-white px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-7xl mx-auto">
          {/* Heading */}
          <h2 className="text-3xl sm:text-3xl font-semibold text-gray-800 text-center mb-10 sm:mb-14">
            OUR <span className="text-primary">HIRING PROCESS</span>
          </h2>

          {/* Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-primary font-bold text-2xl mb-2">1</p>
              <p className="font-semibold text-gray-800 text-base sm:text-lg">
                Apply
              </p>
              <p className="text-sm sm:text-base text-gray-600 mt-2">
                Submit your application online or via email.
              </p>
            </div>

            <div>
              <p className="text-primary font-bold text-2xl mb-2">2</p>
              <p className="font-semibold text-gray-800 text-base sm:text-lg">
                Screening
              </p>
              <p className="text-sm sm:text-base text-gray-600 mt-2">
                Our team reviews your profile and experience.
              </p>
            </div>

            <div>
              <p className="text-primary font-bold text-2xl mb-2">3</p>
              <p className="font-semibold text-gray-800 text-base sm:text-lg">
                Interview
              </p>
              <p className="text-sm sm:text-base text-gray-600 mt-2">
                Technical and cultural fit interviews.
              </p>
            </div>

            <div>
              <p className="text-primary font-bold text-2xl mb-2">4</p>
              <p className="font-semibold text-gray-800 text-base sm:text-lg">
                Offer
              </p>
              <p className="text-sm sm:text-base text-gray-600 mt-2">
                Final discussion and onboarding.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Open Positions */}
      <div
        id="open-roles"
        className="bg-gradient-to-br from-gray-100 via-white to-gray-200
 px-4 sm:px-6 lg:px-8 py-20"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-semibold text-gray-800 text-center mb-10">
            OPEN <span className="text-primary">ROLES</span>
          </h2>

          <div className="space-y-6">
            {[
              {
                role: "Full Stack Developer",
                type: "Full Time",
                location: "Remote / Hybrid",
              },
              {
                role: "Software Engineer",
                type: "Full Time",
                location: "Remote",
              },
              {
                role: "Account Management & Finance Specialist",
                type: "Contract",
                location: "Hybrid",
              },
              {
                role: "Project Management Specialist",
                type: "Full Time",
                location: "Remote",
              },
            ].map((job, index) => (
              <div
                key={index}
                className="border rounded-xl p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
              >
                <div>
                  <h3 className="font-semibold text-gray-800">{job.role}</h3>
                  <p className="text-sm text-gray-600">
                    {job.type} · {job.location}
                  </p>
                </div>

                <button
                  onClick={() => {
                    navigate(`/apply/${slugifyRole(job.role)}`);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="border border-primary text-primary px-6 py-2 rounded-lg hover:bg-primary hover:text-white transition"
                >
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className=" max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8 py-20 bg-gray-100">
        <h2 className="text-3xl font-semibold text-gray-800">
          Didn’t find a suitable role?
        </h2>
        <p className="text-gray-600 mt-3 mb-6">
          Send us your resume and we’ll get back to you.
        </p>

        <a
          href="mailto:prynshu@gmail.com"
          className="inline-block bg-primary text-white px-8 py-3 rounded-lg hover:opacity-90 transition"
        >
          Send Resume
        </a>
      </div>
    </div>
  );
};

export default Career;
