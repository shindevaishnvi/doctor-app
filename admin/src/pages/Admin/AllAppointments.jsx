import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'
import { XCircle, CheckCircle } from 'lucide-react'

const AllAppointments = () => {

  const { aToken, appointments, getAllAppointments, cancelAppointment, completeAppointment } = useContext(AdminContext)
  const { slotDateFormat, calculateAge, currency } = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getAllAppointments()
    }
  }, [aToken, getAllAppointments])

  return (
    <div className='m-8 w-full max-w-7xl'>
      <div className='flex flex-col gap-2 mb-8'>
        <h1 className='text-3xl font-bold text-gray-900 tracking-tight'>Master <span className='text-primary'>Schedule</span></h1>
        <p className='text-gray-500 font-medium'>Full overview and management of all patient bookings across the platform.</p>
      </div>

      <div className='glass-card rounded-[2.5rem] overflow-hidden premium-shadow min-h-[60vh] border border-white/50'>
        <div className='hidden sm:grid grid-cols-[0.5fr_2.5fr_1fr_2.5fr_2.5fr_1fr_1fr] bg-white/50 py-5 px-8 border-b border-gray-100 text-xs font-black uppercase tracking-widest text-gray-400'>
          <p>ID</p>
          <p>Patient / Client</p>
          <p>Age</p>
          <p>Schedule</p>
          <p>Medical Specialist</p>
          <p>Amount</p>
          <p className='text-right'>Status</p>
        </div>

        <div className='divide-y divide-gray-50'>
          {appointments.map((item, index) => (
            <div className='flex flex-wrap sm:grid grid-cols-[0.5fr_2.5fr_1fr_2.5fr_2.5fr_1fr_1fr] items-center text-gray-600 py-5 px-8 hover:bg-white transition-colors duration-300' key={index}>
              <p className='text-xs font-bold text-gray-300 max-sm:hidden'>#{index + 1}</p>
              
              <div className='flex items-center gap-3'>
                <img className='w-10 h-10 rounded-xl object-cover border-2 border-white shadow-sm' src={item.userData.image || 'https://img.freepik.com/free-vector/user-blue-gradient_78370-4692.jpg'} alt="" /> 
                <div>
                  <p className='text-gray-900 font-bold text-sm'>{item.userData.name}</p>
                  <p className='text-[10px] text-gray-400 font-medium uppercase tracking-tighter sm:hidden'>Age: {calculateAge(item.userData.dob)}</p>
                </div>
              </div>

              <p className='text-sm font-semibold text-gray-500 max-sm:hidden'>{calculateAge(item.userData.dob)}</p>
              
              <div>
                <p className='text-gray-900 font-bold text-sm'>{slotDateFormat(item.slotDate)}</p>
                <p className='text-primary font-bold text-xs'>{item.slotTime}</p>
              </div>

              <div className='flex items-center gap-3'>
                <img className='w-10 h-10 rounded-xl object-cover bg-gray-50 border-2 border-white shadow-sm' src={item.docData.image} alt="" /> 
                <p className='text-gray-900 font-bold text-sm'>{item.docData.name}</p>
              </div>

              <p className='text-gray-900 font-black text-sm'>{currency}{item.amount}</p>
              
              <div className='flex justify-end gap-2'>
                {item.cancelled
                  ? <span className='px-3 py-1 rounded-lg bg-red-50 text-red-500 text-[10px] font-black uppercase tracking-widest'>Cancelled</span>
                  : item.isCompleted
                    ? <span className='px-3 py-1 rounded-lg bg-green-50 text-green-500 text-[10px] font-black uppercase tracking-widest'>Completed</span>
                    : <div className='flex items-center gap-2'>
                        <div onClick={() => cancelAppointment(item._id)} className='group p-2.5 rounded-xl bg-gray-50 hover:bg-red-500 text-gray-400 hover:text-white cursor-pointer transition-all'>
                            <XCircle size={18} className='group-hover:rotate-90 transition-transform duration-300' />
                        </div>
                        <div onClick={() => completeAppointment(item._id)} className='group p-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-500 text-emerald-500 hover:text-white cursor-pointer transition-all'>
                            <CheckCircle size={18} />
                        </div>
                      </div>
                }
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AllAppointments
