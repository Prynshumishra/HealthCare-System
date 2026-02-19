import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Apply = () => {
  const { role } = useParams();
  const formattedRole = role?.split("-").join(" ") || "";
  const highlightCards = [
    {
      title: "Impactful Mission",
      desc: "Build experiences that make healthcare access smoother for thousands of patients every month.",
    },
    {
      title: "Flexible Culture",
      desc: "Hybrid schedules, supportive mentors, and modern tooling to keep your flow state intact.",
    },
    {
      title: "Growth Mindset",
      desc: "Quarterly learning stipends and clear advancement paths for every discipline.",
    },
  ];
  const requirements = [
    "Minimum 1-2 years of relevant industry or internship experience",
    "Comfortable collaborating across design, product, and engineering squads",
    "Strong communication and documentation habits",
    "Passion for solving healthcare access challenges",
  ];
  const processSteps = [
    "Intro call with the talent partner",
    "Portfolio or code walkthrough with the hiring manager",
    "Collaborative task or systems conversation with the core team",
    "Final meet-the-leadership conversation and offer",
  ];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    countryCode: "",
    mobile: "",
    batch: "",
    resume: null,
  });

  const handleChange = (e) => {
    if (e.target.name === "resume") {
      setFormData({ ...formData, resume: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("role", role);

    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    await axios.post("http://localhost:4000/api/apply", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    alert("Application Submitted Successfully!");
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-16 px-4 overflow-hidden">
      <div className="absolute -top-32 -right-24 w-80 h-80 bg-white/60 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-10 w-96 h-96 bg-indigo-100/70 rounded-full blur-3xl" />
      <div className="relative max-w-5xl mx-auto bg-white bg-opacity-90 backdrop-blur rounded-3xl shadow-lg p-8 sm:p-12 border border-white/50">
        <div className="text-center mb-10 space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-primary/70">
            Open position
          </p>
          <h2 className="text-3xl font-semibold text-gray-800">
            Apply for{" "}
            <span className="text-primary capitalize">{formattedRole}</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Tell us why you are excited about Prescripto, share the work you are
            most proud of, and help us understand how you would elevate the{" "}
            {formattedRole || "team"} function.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {highlightCards.map((item) => (
            <div
              key={item.title}
              className="p-5 rounded-2xl border border-gray-100 bg-gradient-to-b from-white to-gray-50"
            >
              <p className="text-sm text-primary font-semibold mb-2">
                {item.title}
              </p>
              <p className="text-gray-600 text-sm leading-6">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="p-6 rounded-2xl bg-white/80 border border-gray-100 shadow-[0_10px_40px_-30px_rgba(15,23,42,0.6)]">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              What we look for
            </h3>
            <ul className="space-y-2 text-gray-600 text-sm">
              {requirements.map((item, idx) => (
                <li key={idx} className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="p-6 rounded-2xl bg-white/80 border border-gray-100 shadow-[0_10px_40px_-30px_rgba(15,23,42,0.6)]">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Recruitment flow
            </h3>
            <ol className="space-y-3 text-gray-600 text-sm list-decimal list-inside">
              {processSteps.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
            <p className="text-xs text-gray-500 mt-4">
              Average timeline: 10-14 days, depending on team availability.
            </p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Your name"
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Your email"
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Country Code
              </label>
              <select
                name="countryCode"
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">-- Select Code --</option>
                <option value="+91">+91 (India)</option>
                <option value="+1">+1 (USA)</option>
                <option value="+44">+44 (UK)</option>
                <option value="+61">+61 (Australia)</option>
                <option value="+81">+81 (Japan)</option>
                <option value="+49">+49 (Germany)</option>
                <option value="+33">+33 (France)</option>
                <option value="+86">+86 (China)</option>
                <option value="+55">+55 (Brazil)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mobile Number
              </label>
              <input
                type="tel"
                name="mobile"
                placeholder="Your mobile number"
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* Batch */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Batch Passout Year
            </label>
            <input
              type="number"
              name="batch"
              placeholder="Enter batch year"
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Resume */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Resume
            </label>
            <input
              type="file"
              name="resume"
              accept=".pdf,.doc,.docx"
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Submit */}
          <div className="text-center pt-6">
            <button
              type="submit"
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-10 py-3 rounded-lg transition duration-300"
            >
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Apply;
