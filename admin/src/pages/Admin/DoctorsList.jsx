import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/AdminContext";

const DoctorsList = () => {

  const { doctors, aToken, getAllDoctors, changeAvailability } =
    useContext(AdminContext);

  const [search, setSearch] = useState("");

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);

  const filteredDoctors = doctors.filter((doc) =>
    doc.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6 w-full">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Doctors Management
        </h1>
        <p className="text-gray-500 mt-1">
          Manage doctor availability and profiles.
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search doctor by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-sm px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">

        {filteredDoctors.length === 0 ? (
          <p className="text-gray-500 col-span-full">
            No doctors found.
          </p>
        ) : (
          filteredDoctors.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden group"
            >

              {/* Image */}
              <div className="relative">
                <img
                  className="w-full h-48 object-cover group-hover:scale-105 transition duration-500"
                  src={item.image}
                  alt={item.name}
                />

                {/* Availability Badge */}
                <span
                  className={`absolute top-3 right-3 text-xs px-3 py-1 rounded-full font-medium ${
                    item.available
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {item.available ? "Available" : "Unavailable"}
                </span>
              </div>

              {/* Content */}
              <div className="p-5">
                <p className="text-lg font-semibold text-gray-800">
                  {item.name}
                </p>
                <p className="text-sm text-gray-500">
                  {item.speciality}
                </p>

                {/* Toggle Switch */}
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    Availability
                  </span>

                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={item.available}
                      onChange={() => changeAvailability(item._id)}
                    />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-indigo-600 transition"></div>
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition peer-checked:translate-x-5"></div>
                  </label>
                </div>
              </div>

            </div>
          ))
        )}

      </div>
    </div>
  );
};

export default DoctorsList;
