import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const DoctorProfile = () => {

  const { dToken, profileData, setProfileData, getProfileData, backendUrl } = useContext(DoctorContext)
  const { currency } = useContext(AppContext)

  const [isEdit, setIsEdit] = useState(false)

  const updateProfile = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available
      }

      const { data } = await axios.post(backendUrl + '/api/doctor/update-profile', updateData, { headers: { dToken } })

      if (data.success) {
        toast.success(data.message)
        setIsEdit(false)
        getProfileData()
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
      console.log(error)
    }
  }

  useEffect(() => {
    if (dToken) {
      getProfileData()
    }
  }, [dToken])

  return profileData && (
    <div className='m-8 max-w-5xl'>
      <div className='flex flex-col gap-2 mb-8'>
        <h1 className='text-3xl font-bold text-gray-900 tracking-tight'>Professional <span className='text-primary'>Profile</span></h1>
        <p className='text-gray-500 font-medium'>Manage your public information and clinical settings.</p>
      </div>

      <div className='flex flex-col lg:flex-row gap-8'>
        <div className='lg:w-1/3'>
          <div className='glass-card rounded-[2.5rem] p-4 premium-shadow border border-white/50'>
            <img className='w-full aspect-square object-cover rounded-[2rem] shadow-inner bg-primary/10' src={profileData.image} alt="" />
            <div className='mt-6 px-4 pb-4 space-y-4'>
               <div className='flex items-center justify-between'>
                  <p className='text-[10px] text-gray-400 font-bold uppercase tracking-widest'>Current Status</p>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${profileData.available ? 'bg-green-50 text-green-500' : 'bg-red-50 text-red-500'}`}>
                    {profileData.available ? 'Active & Ready' : 'On Break'}
                  </span>
               </div>
               
               <div className='flex items-center gap-2 pt-2'>
                  <input 
                    type="checkbox" 
                    id="availability"
                    className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary focus:ring-2"
                    onChange={() => isEdit && setProfileData(prev => ({ ...prev, available: !prev.available }))} 
                    checked={profileData.available}
                    disabled={!isEdit}
                  />
                  <label htmlFor="availability" className='text-sm font-bold text-gray-600 cursor-pointer'>Accept New Patients</label>
               </div>
            </div>
          </div>
        </div>

        <div className='lg:w-2/3'>
          <div className='glass-card rounded-[2.5rem] p-10 premium-shadow border border-white/50 space-y-8'>
            <div className='space-y-2'>
              <h2 className='text-4xl font-black text-gray-900'>{profileData.name}</h2>
              <div className='flex items-center gap-3'>
                <p className='text-lg font-bold text-primary'>{profileData.degree}</p>
                <span className='w-1.5 h-1.5 bg-gray-200 rounded-full'></span>
                <p className='text-lg font-medium text-gray-500'>{profileData.specialization}</p>
                <span className='px-4 py-1 bg-gray-50 text-gray-400 text-xs font-bold rounded-full border border-gray-100'>{profileData.experience} Level</span>
              </div>
            </div>

            <div className='space-y-2'>
              <label className='text-xs font-bold text-gray-400 uppercase tracking-widest ml-1'>Medical Philosophy & Bio</label>
              <p className='text-gray-600 leading-relaxed font-medium bg-gray-50/50 p-6 rounded-2xl border border-gray-100 italic'>
                "{profileData.about}"
              </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
              <div className='space-y-4'>
                <div className='space-y-2'>
                  <label className='text-xs font-bold text-gray-400 uppercase tracking-widest ml-1'>Clinic Address</label>
                  {isEdit ? (
                    <div className='space-y-2'>
                      <input type='text' className='w-full bg-white border border-gray-200 rounded-xl py-3 px-4 text-sm font-medium' onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={profileData.address.line1} />
                      <input type='text' className='w-full bg-white border border-gray-200 rounded-xl py-3 px-4 text-sm font-medium' onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={profileData.address.line2} />
                    </div>
                  ) : (
                    <div className='p-4 bg-gray-50/50 rounded-2xl border border-gray-100'>
                      <p className='text-gray-700 font-bold text-sm'>{profileData.address.line1}</p>
                      <p className='text-gray-500 font-medium text-xs mt-0.5'>{profileData.address.line2}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className='space-y-4'>
                <div className='space-y-2'>
                  <label className='text-xs font-bold text-gray-400 uppercase tracking-widest ml-1'>Consultation Net Fee</label>
                  {isEdit ? (
                    <div className='relative'>
                      <span className='absolute left-4 top-1/2 -translate-y-1/2 text-primary font-bold'>{currency}</span>
                      <input type='number' className='w-full bg-white border border-gray-200 rounded-xl py-3 pl-8 pr-4 text-sm font-bold' onChange={(e) => setProfileData(prev => ({ ...prev, fees: e.target.value }))} value={profileData.fees} />
                    </div>
                  ) : (
                    <div className='p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100 flex items-center gap-2'>
                      <p className='text-2xl font-black text-primary'>{currency} {profileData.fees}</p>
                      <p className='text-[10px] text-indigo-400 font-bold uppercase tracking-widest'>Per Session</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className='pt-8 border-t border-gray-50 flex justify-end'>
              {
                isEdit
                  ? <button onClick={updateProfile} className='btn-premium !rounded-2xl !py-3.5 px-10 shadow-lg shadow-primary/20'>Save Changes</button>
                  : <button onClick={() => setIsEdit(true)} className='btn-premium !rounded-2xl !py-3.5 px-10 shadow-lg shadow-primary/20'>Modify Profile</button>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DoctorProfile
