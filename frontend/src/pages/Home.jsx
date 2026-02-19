import React from "react";
import Header from "../components/Header.jsx";
import SpecialityMenu from "../components/SpecialityMenu.jsx";
import TopDoctors from "../components/TopDoctors.jsx";
import Banner from "../components/Banner.jsx";

const Home = () => {
  return (
    <main className="overflow-hidden">

      {/* 1. HERO */}
      <Header />

      {/* 2. SPECIALITY */}
      <section className="py-20">
        <SpecialityMenu />
      </section>


      {/* 4. FEATURE HIGHLIGHTS */}
      <section className="mt-10">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-12">
            BUILT FOR <span className="text-primary">MODERN HEALTHCARE</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { title: "Instant Booking", desc: "Book doctor appointments instantly without delays." },
              { title: "Online Consultations", desc: "Consult doctors securely from anywhere." },
              { title: "Smart Reminders", desc: "Never miss appointments with smart notifications." },
              { title: "Digital Records", desc: "Access prescriptions and records anytime." },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white border rounded-2xl shadow-sm hover:shadow-lg
 px-6 sm:px-8 lg:px-10 py-8 sm:py-12 lg:py-16
                    flex flex-col gap-4 text-sm sm:text-[15px]
                    text-gray-600 hover:bg-primary hover:text-white
                    transition-all duration-300 cursor-pointer"
              >
                <h3 className="font-semibold text-lg text-gray-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 leading-6">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS */}
      <section className="bg-gray-50 py-20 mt-10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-12">
            HOW IT <span className="text-primary">WORKS</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
            {[
              { step: "1", title: "Choose a Doctor", desc: "Browse doctors by specialty and experience." },
              { step: "2", title: "Book Appointment", desc: "Select a time slot that fits your schedule." },
              { step: "3", title: "Consult Online", desc: "Consult securely from anywhere, anytime." },
            ].map((item, index) => (
              <div key={index}>
                <div className="text-primary text-3xl font-bold mb-3">
                  {item.step}
                </div>
                <h4 className="font-semibold mb-2">{item.title}</h4>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. TOP DOCTORS */}
      <section className=" py-20 mt-10">
        <TopDoctors />
      </section>


      {/* 7. FAQ */}
      <section className="py-5">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-12">
            FREQUENTLY ASKED <span className="text-primary">QUESTIONS</span>
          </h2>

          <div className="space-y-6 sm:space-y-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-8 text-gray-600 hover:text-gray-800 transition">
            {[
              { q: "Is online consultation safe?", a: "Yes, consultations are secure with verified doctors." },
              { q: "Can I book anytime?", a: "Appointments can be booked 24/7." },
              { q: "Are doctors verified?", a: "All doctors are thoroughly verified." },
            ].map((item, index) => (
              <div key={index} className="bg-white border rounded-2xl shadow-sm hover:shadow-lg
 px-6 sm:px-8 lg:px-10 py-8 sm:py-12 lg:py-16
                    flex flex-col gap-4 text-sm sm:text-[15px]
                    text-gray-600 hover:bg-primary hover:text-white
                    transition-all duration-300 cursor-pointer">
                <p className="font-medium text-gray-800 ">{item.q}</p>
                <p className="text-sm text-gray-600 mt-2">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FINAL CTA */}
      <Banner />

    </main>
  );
};

export default Home;
