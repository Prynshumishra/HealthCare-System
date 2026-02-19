import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const RelatedDoctors = ({ speciality, docId }) => {
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();

  const [relDoc, setRelDocs] = useState([]);

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const doctorsData = doctors.filter(
        (doc) => doc.speciality === speciality && doc._id !== docId,
      );
      setRelDocs(doctorsData);
    }
  }, [doctors, speciality, docId]);

  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
      <h2 className="text-3xl font-semibold text-gray-800">
        Top <span className="text-primary">Doctors to Book</span>
      </h2>

      <p className=" text-center text-sm">
        Simply browse through our extensive list of trusted doctors.
      </p>

      {/* Doctor Grid */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6 pt-5 px-3 sm:px-0">
        {relDoc.slice(0, 5).map((item) => (
          <div
            key={item._id}
            onClick={() => {
              navigate(`/appointment/${item._id}`);
              window.scrollTo(0, 0);
            }}
            className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-[10px] transition-all duration-500 bg-white shadow-sm"
          >
            <img
              className="bg-blue-50 w-full h-48 object-cover"
              src={item.image}
              alt={item.name}
            />

            <div className="p-4">
              <div className="flex items-center gap-2 text-sm text-green-600">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <p>Available</p>
              </div>

              <p className="mt-2 font-semibold text-gray-800">{item.name}</p>
              <p className="text-sm text-gray-500">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        className="bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10 hover:bg-blue-100 transition"
        onClick={() => {
          navigate("/doctors");
          window.scrollTo(0, 0);
        }}
      >
        More
      </button>
    </div>
  );
};

export default RelatedDoctors;
