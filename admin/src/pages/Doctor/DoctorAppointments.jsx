import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { CheckCircle, XCircle } from 'lucide-react'

const DoctorAppointments = () => {

  const { dToken, appointments, getAppointments, completeAppointment, cancelAppointment } = useContext(DoctorContext)
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext)

  useEffect(() => {
    if (dToken) {
      getAppointments()
    }
  }, [dToken])

  return (
    <div className='m-8 w-full max-w-7xl'>
      <div className='flex flex-col gap-2 mb-8'>
        <h1 className='text-3xl font-bold text-gray-900 tracking-tight'>Patient <span className='text-primary'>Consultations</span></h1>
        <p className='text-gray-500 font-medium'>Detailed breakdown of your medical appointments and status tracking.</p>
      </div>

      <div className='glass-card rounded-[2.5rem] overflow-hidden premium-shadow min-h-[60vh] border border-white/50'>
        <div className='hidden sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_2.5fr_1fr_1.5fr] bg-white/50 py-5 px-8 border-b border-gray-100 text-xs font-black uppercase tracking-widest text-gray-400'>
          <p>ID</p>
          <p>Patient Details</p>
          <p>Billing</p>
          <p>Age</p>
          <p>Visit Schedule</p>
          <p>Net Fee</p>
          <p className='text-right'>Operations</p>
        </div>

        <div className='divide-y divide-gray-50'>
          {
            [...appointments].reverse().map((item, index) => (
              <div className='flex flex-wrap sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_2.5fr_1fr_1.5fr] items-center text-gray-600 py-5 px-8 hover:bg-white transition-colors duration-300' key={index}>
                <p className='text-xs font-bold text-gray-300 max-sm:hidden'>#{index + 1}</p>
                
                <div className='flex items-center gap-3'>
                  <img className='w-10 h-10 rounded-xl object-cover border-2 border-white shadow-sm' src={item.userData.image || 'https://img.freepik.com/free-vector/user-blue-gradient_78370-4692.jpg'} alt="" /> 
                  <p className='text-gray-900 font-bold text-sm'>{item.userData.name}</p>
                </div>

                <div className='max-sm:hidden'>
                  <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${item.payment ? 'bg-emerald-50 text-emerald-500' : 'bg-amber-50 text-amber-500'} border border-black/5`}>
                    {item.payment ? 'Online' : 'Cash'}
                  </span>
                </div>

                <p className='text-sm font-semibold text-gray-500 max-sm:hidden'>{calculateAge(item.userData.dob)}</p>
                
                <div>
                  <p className='text-gray-900 font-bold text-sm'>{slotDateFormat(item.slotDate)}</p>
                  <p className='text-primary font-bold text-xs'>{item.slotTime}</p>
                </div>

                <p className='text-gray-900 font-black text-sm'>{currency}{item.amount}</p>
                
                <div className='flex justify-end gap-2'>
                  {
                    item.cancelled
                      ? <span className='px-3 py-1 rounded-lg bg-red-50 text-red-500 text-[10px] font-black uppercase tracking-widest'>Cancelled</span>
                      : item.isCompleted
                        ? <span className='px-3 py-1 rounded-lg bg-emerald-50 text-emerald-500 text-[10px] font-black uppercase tracking-widest'>Completed</span>
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
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default DoctorAppointments
