import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const TopDoctors = () => {
  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)   // from context

  // Optional: handle case where doctors is not loaded yet
  if (!doctors || doctors.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
        <h2 className="text-3xl font-semibold text-gray-800">
        Top <span className="text-primary">Doctors to Book</span>
      </h2>
        <p className="sm:w-1/3 text-center text-sm">
          Simply browse through our extensive list of trusted doctors.
        </p>
        <p className="text-sm text-gray-500 mt-4">Loading doctors...</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
      <h1 className="text-3xl font-medium">Top Doctors to Book</h1>
      <p className="sm:w-1/3 text-center text-sm">
        Simply browse through our extensive list of trusted doctors.
      </p>

      {/* Doctor Grid */}
      <div className="w-full grid grid-cols-col-auto gap-4 gap-y-6 pt-5 px-3 sm:px-0">
        {doctors.slice(0, 10).map((item, index) => (
          <div key={item._id} onClick={() => navigate(`/appointment/${item._id}`)}
            className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer 
                       hover:-translate-y-[10px] transition-all duration-500 bg-white shadow-sm"
          >
            <img className="bg-blue-50 w-full" src={item.image} alt={item.name} />

            <div className="p-4">
              <div className="flex items-center gap-2 text-sm text-green-600">
                <p className="w-2 h-2 bg-green-500 rounded-full" ></p>
                <p>Available</p>
              </div>

              <p className="mt-2 font-semibold text-gray-800">{item.name}</p>
              <p className="text-sm text-gray-500">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        className="bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10"
        onClick={() => {navigate('/doctors'); scrollTo(0, 0)}}
      >
        More
      </button>
    </div>
  )
}

export default TopDoctors
