import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const DoctorsList = () => {

  const { doctors, aToken, getAllDoctors, changeAvailability } = useContext(AdminContext)

  useEffect(() => {
    if (aToken) {
      getAllDoctors()
    }
  }, [aToken])

  return (
    <div className='m-8 max-h-[90vh] overflow-y-scroll pr-4'>
      <div className='flex flex-col gap-2 mb-8'>
        <h1 className='text-3xl font-bold text-gray-900 tracking-tight'>Expert <span className='text-primary'>Directory</span></h1>
        <p className='text-gray-500 font-medium'>Manage and monitor all medical staff availability and profiles.</p>
      </div>

      <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-10'>
        {
          doctors.map((item, index) => (
            <div className='glass-card rounded-[2rem] overflow-hidden group hover:translate-y-[-8px] transition-all duration-500 premium-shadow border border-white/50' key={index}>
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
