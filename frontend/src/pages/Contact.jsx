import React, { useState } from "react";
import { assets } from "../assets/assets";
import { NavLink } from "react-router-dom";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    countryCode: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:4000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      alert("Message Sent Successfully ✅");

      setFormData({
        name: "",
        email: "",
        countryCode: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Page Title */}
      <div className="text-center pt-14">
        <h1 className="text-3xl font-semibold text-gray-700">
          CONTACT <span className="text-primary">US</span>
        </h1>
        <p className="text-sm text-gray-500 mt-2">We’d love to hear from you</p>
      </div>

      {/* Contact Info Section */}
      <div className="max-w-5xl mx-auto my-16 px-4 sm:px-6 lg:px-8 gap-16 ">
        <div className="flex flex-col md:flex-row gap-12 items-center md:items-start justify-center">
          {/* Image */}
          <img
            className="w-full md:max-w-[380px] rounded-2xl"
            src={assets.contact_image}
            alt="Contact Prescripto"
          />

          {/* Info */}
          <div className="flex flex-col gap-5 text-sm text-gray-600">
            <h2 className="text-xl font-semibold text-gray-700">OUR OFFICE</h2>

            <p>
              11A/3 MG Road <br />
              Civil Lines, Delhi, India
            </p>

            <p>
              Tel:{" "}
              <a
                href="tel:+91-7317251295"
                className="text-primary hover:underline"
              >
                +91-7317251295
              </a>
            </p>

            <p>
              Email:{" "}
              <a
                href="mailto:year22to26@gmail.com"
                className="text-primary hover:underline"
              >
                year22to26@gmail.com
              </a>
            </p>

            <p className="text-gray-500 text-m">
              <strong>Office Hours:</strong>
              <br />
              Monday – Friday: 9:00 AM – 6:00 PM
              <br />
              Saturday: 10:00 AM – 2:00 PM
            </p>

            <div className="pt-4">
              <h3 className="font-semibold text-xl text-gray-700">
                Careers at PRESCRIPTO
              </h3>
              <p className="text-gray-500 mt-1">
                Learn more about our teams and current job openings.
              </p>

              <NavLink
                to="/careers"
                className="inline-block mt-4 border border-primary text-primary
                           px-6 py-3 rounded-lg hover:bg-primary hover:text-white
                           transition"
              >
                Explore Jobs
              </NavLink>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form – Reference Style */}
      <div className="bg-gray-50 py-20 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-sm p-8 sm:p-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-semibold text-gray-700">
            SEND US A <span className="text-primary">MESSAGE</span>
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            We’ll get back to you as soon as possible
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your email"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Country Code */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Country Code
            </label>
            <select
              name="countryCode"
              value={formData.countryCode}
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

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Your phone number"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Subject */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Enter your subject"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Message */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Any Message for us?
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              placeholder="Feel free to share your queries"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 flex justify-center mt-6">
            <button
              type="submit"
              disabled={loading}
              className="bg-primary text-white px-10 py-3 rounded-lg text-sm font-medium hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </div>
        </form>
      </div>
    </div>

      {/* FAQ Section */}
      <div className="bg-gray-50 py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-gray-700">
              FREQUENTLY ASKED <span className="text-primary">QUESTIONS</span>
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              Find answers to common questions about appointments and payments
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                q: "How can I book an appointment?",
                a: "You can book an appointment by selecting a doctor and choosing a suitable time slot on our platform.",
              },
              {
                q: "Do you offer online consultations?",
                a: "Yes, we provide secure and reliable online consultations with experienced doctors.",
              },
              {
                q: "What payment methods are accepted?",
                a: "We accept UPI, credit/debit cards, net banking, and wallet payments.",
              },
              {
                q: "Can I cancel or reschedule my appointment?",
                a: "Yes, appointments can be cancelled or rescheduled from your dashboard before the scheduled time.",
              },
            ].map((item, index) => (
              <div key={index} className="border-b pb-4">
                <h3 className="font-medium text-xl text-gray-700">{item.q}</h3>
                <p className="text-sm text-gray-500 mt-2">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
