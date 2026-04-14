import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { CalendarCheck, DollarSign, UserCheck, XCircle, CheckCircle, Video } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const DoctorDashboard = () => {

  const navigate = useNavigate()
  const { dToken, dashData, getDashData, completeAppointment, cancelAppointment } = useContext(DoctorContext)
  const { slotDateFormat, currency } = useContext(AppContext)

  useEffect(() => {
    if (dToken) {
      getDashData()
    }
  }, [dToken, getDashData])

  return dashData && (
    <div className='m-8 space-y-10'>
      <div className='flex flex-col gap-2'>
        <h1 className='text-3xl font-bold text-gray-900 tracking-tight'>Specialist <span className='text-primary'>Intelligence</span></h1>
        <p className='text-gray-500 font-medium'>Overview of your medical practice and patient engagements.</p>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        <div className='stat-card group'>
          <div className='flex items-center justify-between'>
            <div className='bg-emerald-50 p-4 rounded-2xl group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300'>
              <DollarSign size={28} className='text-emerald-500 group-hover:text-white' />
            </div>
            <div className='text-right'>
              <p className='text-3xl font-black text-gray-900'>{currency} {dashData.earnings}</p>
              <p className='text-xs font-bold text-gray-400 uppercase tracking-widest mt-1'>Total Revenue</p>
            </div>
          </div>
        </div>

        <div className='stat-card group'>
          <div className='flex items-center justify-between'>
            <div className='bg-sky-50 p-4 rounded-2xl group-hover:bg-primary group-hover:text-white transition-all duration-300'>
              <CalendarCheck size={28} className='text-primary group-hover:text-white' />
            </div>
            <div className='text-right'>
              <p className='text-3xl font-black text-gray-900'>{dashData.appointments}</p>
              <p className='text-xs font-bold text-gray-400 uppercase tracking-widest mt-1'>Scheduled Visits</p>
            </div>
          </div>
        </div>

        <div className='stat-card group'>
          <div className='flex items-center justify-between'>
            <div className='bg-rose-50 p-4 rounded-2xl group-hover:bg-accent group-hover:text-white transition-all duration-300'>
              <UserCheck size={28} className='text-accent group-hover:text-white' />
            </div>
            <div className='text-right'>
              <p className='text-3xl font-black text-gray-900'>{dashData.patients}</p>
              <p className='text-xs font-bold text-gray-400 uppercase tracking-widest mt-1'>Unique Patients</p>
            </div>
          </div>
        </div>
      </div>

      <div className='glass-card rounded-[2.5rem] overflow-hidden premium-shadow'>
        <div className='px-8 py-6 bg-white/50 border-b border-gray-100 flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <div className='w-1.5 h-6 bg-primary rounded-full'></div>
            <h3 className='text-xl font-bold text-gray-900'>Recent Patient Requests</h3>
          </div>
          <button className='text-primary font-bold text-sm hover:underline underline-offset-4'>All Appointments</button>
        </div>

        <div className='divide-y divide-gray-50'>
          {
            dashData.latestAppointments.map((item, index) => (
              <div className='flex items-center px-8 py-5 gap-4 hover:bg-gray-50/50 transition-colors' key={index}>
                <img className='rounded-2xl w-14 h-14 object-cover border-2 border-white shadow-sm' src={item.userData.image} alt="" />
                <div className='flex-1'>
                  <p className='text-gray-900 font-bold text-base'>{item.userData.name}</p>
                  <p className='text-gray-400 font-medium text-xs mt-0.5'>{slotDateFormat(item.slotDate)}</p>
                </div>
                <div className='flex items-center gap-3'>
                  {
                    item.cancelled
                      ? <span className='px-4 py-1.5 rounded-full bg-red-50 text-red-500 text-xs font-bold uppercase tracking-widest'>Cancelled</span>
                      : item.isCompleted
                        ? <span className='px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-500 text-xs font-bold uppercase tracking-widest'>Completed</span>
                        : <div className='flex items-center gap-2'>
                          <div onClick={() => navigate(`/video-call/${item._id}`)} className='p-3 rounded-xl bg-green-50 text-green-500 hover:bg-green-500 hover:text-white cursor-pointer transition-all shadow-sm'>
                            <Video size={18} />
                          </div>
                          <div onClick={() => cancelAppointment(item._id)} className='p-3 rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white cursor-pointer transition-all shadow-sm'>
                            <XCircle size={18} />
                          </div>
                          <div onClick={() => completeAppointment(item._id)} className='p-3 rounded-xl bg-emerald-50 text-emerald-500 hover:bg-emerald-500 hover:text-white cursor-pointer transition-all shadow-sm'>
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

export default DoctorDashboard
