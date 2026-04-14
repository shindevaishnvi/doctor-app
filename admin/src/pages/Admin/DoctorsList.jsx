import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const DoctorsList = () => {

  const { doctors, aToken, getAllDoctors, changeAvailability, removeDoctor, updateDoctorCredentials } = useContext(AdminContext)

  useEffect(() => {
    if (aToken) {
      getAllDoctors()
    }
  }, [aToken])

  const handleEditCredentials = (item) => {
    const newEmail = window.prompt("Enter new email (leave blank to keep current):", item.email);
    const newPassword = window.prompt("Enter new password (leave blank to keep current):");
    
    if (newEmail !== null || newPassword !== null) {
      if (newEmail === item.email && !newPassword) return;
      updateDoctorCredentials(item._id, newEmail || item.email, newPassword || null);
    }
  }

  return (
    <div className='m-8 max-h-[90vh] overflow-y-scroll pr-4'>
      <div className='flex flex-col gap-2 mb-8'>
        <h1 className='text-3xl font-bold text-gray-900 tracking-tight'>Expert <span className='text-primary'>Directory</span></h1>
        <p className='text-gray-500 font-medium'>Manage and monitor all medical staff availability and profiles.</p>
      </div>

      <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-10'>
        {
          doctors.map((item, index) => (
            <div className='glass-card rounded-[2rem] overflow-hidden group hover:translate-y-[-8px] transition-all duration-500 premium-shadow border border-white/50 relative' key={index}>
              <div className='absolute top-4 right-4 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300'>
                <div 
                  onClick={() => handleEditCredentials(item)} 
                  className='p-2 bg-blue-100 hover:bg-blue-500 text-blue-500 hover:text-white rounded-full cursor-pointer shadow-md'
                  title="Edit Credentials"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <div 
                  onClick={() => { if(window.confirm('Are you sure you want to remove this doctor?')) removeDoctor(item._id) }} 
                  className='p-2 bg-red-100 hover:bg-red-500 text-red-500 hover:text-white rounded-full cursor-pointer shadow-md'
                  title="Remove Doctor"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </div>
              </div>
              
              <div className='relative overflow-hidden'>
                <img className='w-full h-48 object-cover bg-indigo-50 group-hover:scale-110 transition-transform duration-700' src={item.image} alt="" />
                <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-5'>
                   <p className='text-white text-xs font-bold uppercase tracking-widest'>View Full Profile</p>
                </div>
              </div>
              
              <div className='p-6 space-y-3'>
                <div>
                  <p className='text-gray-900 text-lg font-black leading-tight'>{item.name}</p>
                  <p className='text-primary text-xs font-bold uppercase tracking-widest mt-1'>{item.specialization}</p>
                  <p className='text-gray-500 text-[10px] font-medium mt-1 uppercase tracking-wider'>{item.email}</p>
                </div>
                
                <div className='pt-3 border-t border-gray-50 flex items-center justify-between'>
                  <div className='flex flex-col'>
                    <p className='text-[10px] text-gray-400 font-bold uppercase tracking-widest'>Availability</p>
                    <p className={`text-sm font-bold ${item.available ? 'text-green-500' : 'text-red-400'}`}>
                      {item.available ? 'On Duty' : 'Off Duty'}
                    </p>
                  </div>
                  
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer"
                      checked={item.available}
                      onChange={() => changeAvailability(item._id)}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary shadow-sm"></div>
                  </label>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default DoctorsList
