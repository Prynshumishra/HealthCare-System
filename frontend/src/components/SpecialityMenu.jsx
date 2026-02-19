import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
  return (
    <div 
      id="speciality" 
      className="flex flex-col items-center justify-center gap-4 py-16 text-gray-600"
    >
      <h2 className="text-3xl font-semibold text-gray-800">Find by <span className="text-primary">Speciality</span> </h2>

      <p className="sm:w-1/3 text-center text-sm">
        Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.
      </p>

      <div className="flex sm:justify-center gap-4 pt-5 w-full overflow-scroll">
        {specialityData.map((item, index) => (
          <Link
            key={index}
            onClick={() => scrollTo(0, 0)}
            className="flex flex-col items-center text-xs cursor-pointer flex-shrink-0 
                       hover:-translate-y-2 transition-all duration-500 top-2"
            to={`/doctors?speciality=${item.speciality}`}
          >
            <img 
              src={item.image} 
              alt={item.speciality} 
              className="w-16 sm:w-24 mb-2" 
            />
            <p>{item.speciality}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default SpecialityMenu
