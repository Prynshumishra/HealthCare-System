import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'

const DoctorProfile = () => {
  const { dToken, profileData, getProfileData, backendUrl } = useContext(DoctorContext)
  const { currency } = useContext(AppContext)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState(null)

  const submitProfileUpdate = async () => {
    try {
      const payload = {
        fees: formData.fees,
        address: {
          line1: formData.line1,
          line2: formData.line2
        },
        available: formData.available
      }

      const { data } = await axios.post(
        `${backendUrl}/api/doctor/update-profile`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${dToken}`
          }
        }
      )

      if (data.success) {
        toast.success(data.message)
        getProfileData()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.error('Error updating profile:', error)
      toast.error(error.response?.data?.message || error.message)
    }
  }




  useEffect(() => {
    if (dToken) {
      getProfileData()
    }
  }, [dToken])

  useEffect(() => {
    if (profileData) {
      setFormData({
        fees: profileData.fees || 0,
        line1: profileData.address?.line1 || '',
        line2: profileData.address?.line2 || '',
        available: Boolean(profileData.available)
      })
    }
  }, [profileData])

  const handleChange = ({ target }) => {
    const { name, value, type, checked } = target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!isEditing) return
    submitProfileUpdate()
    setIsEditing(false)
  }

  if (!profileData || !formData) {
    return (
      <div className='m-5 p-6 bg-white border rounded-2xl shadow-sm text-gray-500'>
        Loading profile…
      </div>
    )
  }

  return (
    <div className='m-5 space-y-6 w-full max-w-5xl'>
      <div className='bg-white border rounded-2xl p-6 shadow-sm flex flex-col md:flex-row gap-8'>
        <div className='flex-shrink-0'>
          <img
            src={`${backendUrl}/images/${profileData.image}`}
            alt={profileData.name}
            className='w-40 h-40 object-cover rounded-2xl border'
          />
          <p className='text-sm text-gray-500 mt-3'>Doctor ID: {profileData._id}</p>
        </div>
        <div className='flex-1 space-y-4'>
          <div>
            <p className='text-2xl font-semibold text-gray-800'>{profileData.name}</p>
            <div className='flex flex-wrap items-center gap-3 mt-2 text-sm text-gray-600'>
              <p>{profileData.degree} · {profileData.speciality}</p>
              <span className='px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold'>
                {profileData.experience || '0'} of exp.
              </span>
            </div>
          </div>
          <div>
            <p className='text-sm font-semibold text-gray-500 mb-1'>About</p>
            <p className='text-sm text-gray-600 leading-6'>{profileData.about || 'No description added yet.'}</p>
          </div>
          <div className='flex flex-wrap gap-6 text-sm text-gray-600'>
            <p>
              Appointment Fees: <span className='font-semibold text-gray-900'>{currency}{profileData.fees}</span>
            </p>
            <div className='w-full md:w-auto border-t md:border-t-0 md:border-l pt-4 md:pt-0 md:px-4'>
              <p className='font-semibold text-gray-500 text-xs uppercase tracking-wide'>Consultation Address:</p>
              <p>{profileData.address?.line1 || '-'}</p>
              <p>{profileData.address?.line2 || ''}</p>
            </div>
          </div>
          <div className='flex items-center gap-3'>
            <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${profileData.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
              <span className={`w-2 h-2 rounded-full ${profileData.available ? 'bg-green-500' : 'bg-red-500'}`} />
              {profileData.available ? 'Available for bookings' : 'Not accepting slots'}
            </span>
            <button
              onClick={() => setIsEditing((prev) => !prev)}
              className='text-primary text-sm font-medium hover:underline'
            >
              {isEditing ? 'Cancel' : 'Edit Details'}
            </button>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className='bg-white border rounded-2xl p-6 shadow-sm space-y-4'>
        <div className='flex items-center justify-between'>
          <p className='text-lg font-semibold text-gray-800'>Profile Controls</p>
          <button
            type='submit'
            disabled={!isEditing}
            className='px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed'
          >
            Save Changes
          </button>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 text-sm'>
          <label className='space-y-2'>
            <span className='font-semibold text-gray-600'>Consultation fees ({currency})</span>
            <input
              type='number'
              name='fees'
              disabled={!isEditing}
              value={formData.fees}
              onChange={handleChange}
              className='w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50'
            />
          </label>
          <label className='space-y-2'>
            <span className='font-semibold text-gray-600'>Clinic line 1</span>
            <input
              type='text'
              name='line1'
              disabled={!isEditing}
              value={formData.line1}
              onChange={handleChange}
              className='w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50'
            />
          </label>
          <label className='space-y-2'>
            <span className='font-semibold text-gray-600'>Clinic line 2</span>
            <input
              type='text'
              name='line2'
              disabled={!isEditing}
              value={formData.line2}
              onChange={handleChange}
              className='w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50'
            />
          </label>
          <label className='space-y-2 flex items-center gap-3'>
            <input
              type='checkbox'
              name='available'
              disabled={!isEditing}
              checked={formData.available}
              onChange={handleChange}
              className='w-4 h-4'
            />
            <span className='font-semibold text-gray-600'>Available for new appointments</span>
          </label>
        </div>
      </form>
    </div>
  )
}

export default DoctorProfile
