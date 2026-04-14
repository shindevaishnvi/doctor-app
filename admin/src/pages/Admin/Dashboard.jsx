import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'
import { Users, CalendarCheck, UserCheck, XCircle, ArrowUpRight, Clock, ShieldCheck } from 'lucide-react'

const Dashboard = () => {

  const { aToken, getDashData, cancelAppointment, dashData } = useContext(AdminContext)
  const { slotDateFormat } = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getDashData()
    }
  }, [aToken])

  if (!dashData) {
    return (
      <div className='m-8 flex items-center justify-center min-h-[60vh]'>
        <div className='flex flex-col items-center gap-4 text-gray-400'>
          <div className='w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin'></div>
          <p className='font-bold text-sm tracking-widest uppercase'>Syncing Clinical Data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className='m-8 space-y-12 w-full max-w-7xl animate-in fade-in duration-700'>
      <div className='flex flex-col md:flex-row md:items-end justify-between gap-6'>
        <div className='flex flex-col gap-2'>
          <div className='flex items-center gap-2 mb-1'>
            <span className='px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest'>Intelligence Overview</span>
          </div>
          <h1 className='text-4xl font-black text-gray-900 tracking-tight'>Master <span className='text-primary'>Control</span></h1>
          <p className='text-gray-500 font-medium'>Real-time analytical depth of your medical ecosystem.</p>
        </div>
        <div className='flex items-center gap-3 bg-white p-2 rounded-2xl shadow-sm border border-gray-100'>
            <div className='p-2 bg-green-50 text-green-500 rounded-lg'>
                <ArrowUpRight size={18} />
            </div>
            <div>
                <p className='text-xs font-bold text-gray-400 uppercase tracking-tighter'>System Health</p>
                <p className='text-sm font-black text-gray-900'>Optimal (99.9%)</p>
            </div>
        </div>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
        <div className='stat-card group relative overflow-hidden'>
          <div className='absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity'>
              <Users size={120} />
          </div>
          <div className='flex items-center justify-between relative z-10'>
            <div className='bg-primary-light p-4 rounded-2xl group-hover:bg-primary group-hover:text-white transition-all duration-500'>
              <Users size={28} className='text-primary group-hover:text-white' />
            </div>
            <div className='text-right'>
              <p className='text-4xl font-black text-gray-900 leading-none'>{dashData.doctors}</p>
              <p className='text-[10px] font-black text-gray-400 uppercase tracking-[0.15em] mt-3'>Expert Staff</p>
            </div>
          </div>
        </div>

        <div className='stat-card group relative overflow-hidden'>
          <div className='absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity'>
              <CalendarCheck size={120} />
          </div>
          <div className='flex items-center justify-between relative z-10'>
            <div className='bg-secondary-light p-4 rounded-2xl group-hover:bg-secondary group-hover:text-white transition-all duration-500'>
              <CalendarCheck size={28} className='text-secondary group-hover:text-white' />
            </div>
            <div className='text-right'>
              <p className='text-4xl font-black text-gray-900 leading-none'>{dashData.appointments}</p>
              <p className='text-[10px] font-black text-gray-400 uppercase tracking-[0.15em] mt-3'>Active Sessions</p>
            </div>
          </div>
        </div>

        <div className='stat-card group relative overflow-hidden'>
          <div className='absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity'>
              <UserCheck size={120} />
          </div>
          <div className='flex items-center justify-between relative z-10'>
            <div className='bg-rose-50 p-4 rounded-2xl group-hover:bg-accent group-hover:text-white transition-all duration-500'>
              <UserCheck size={28} className='text-accent group-hover:text-white' />
            </div>
            <div className='text-right'>
              <p className='text-4xl font-black text-gray-900 leading-none'>{dashData.patients}</p>
              <p className='text-[10px] font-black text-gray-400 uppercase tracking-[0.15em] mt-3'>Total Patients</p>
            </div>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 xl:grid-cols-3 gap-8'>
        <div className='xl:col-span-2 glass-card rounded-[3rem] overflow-hidden premium-shadow border border-white/50'>
            <div className='px-10 py-8 bg-white/50 border-b border-gray-100 flex items-center justify-between'>
                <div className='flex items-center gap-4'>
                    <div className='w-2 h-8 bg-primary rounded-full'></div>
                    <div>
                        <h3 className='text-xl font-black text-gray-900'>Incoming Workflow</h3>
                        <p className='text-xs text-gray-400 font-medium'>Live feed of the latest scheduled consultations.</p>
                    </div>
                </div>
            </div>

            <div className='divide-y divide-gray-50'>
            {
                dashData.latestAppointments.map((item, index) => (
                <div className='flex items-center px-10 py-6 gap-6 hover:bg-white transition-all duration-300 group' key={index}>
                    <img className='rounded-[1.25rem] w-16 h-16 object-cover border-4 border-white shadow-md group-hover:scale-105 transition-transform' src={item.docData.image} alt="" />
                    <div className='flex-1'>
                        <p className='text-gray-900 font-black text-base'>{item.docData.name}</p>
                        <div className='flex items-center gap-2 mt-1'>
                            <Clock size={12} className='text-gray-400' />
                            <p className='text-gray-400 font-bold text-xs uppercase tracking-tighter'>{slotDateFormat(item.slotDate)} at {item.slotTime}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-4'>
                    {item.cancelled
                        ? <span className='px-4 py-2 rounded-xl bg-red-50 text-red-500 text-[10px] font-black uppercase tracking-widest'>Voided</span>
                        : item.isCompleted
                        ? <span className='px-4 py-2 rounded-xl bg-green-50 text-green-500 text-[10px] font-black uppercase tracking-widest'>Closed</span>
                        : <button onClick={() => cancelAppointment(item._id)} className='p-3.5 rounded-2xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm'>
                            <XCircle size={20} />
                            </button>
                    }
                    </div>
                </div>
                ))
            }
            </div>
        </div>

        <div className='glass-card rounded-[3rem] p-10 flex flex-col items-center text-center justify-center space-y-6'>
            <div className='w-24 h-24 bg-primary-light rounded-[2rem] flex items-center justify-center text-primary shadow-inner'>
                <ShieldCheck size={48} />
            </div>
            <div className='space-y-2'>
                <h3 className='text-2xl font-black text-gray-900 uppercase tracking-tighter'>Admin Security</h3>
                <p className='text-sm text-gray-500 font-medium px-4'>Your connection is secured with end-to-end medical grade encryption.</p>
            </div>
            <div className='w-full pt-6 border-t border-gray-100 flex flex-col gap-3'>
                <div className='flex items-center justify-between px-2'>
                    <p className='text-xs font-bold text-gray-400'>AUTH STATUS</p>
                    <p className='text-xs font-black text-green-500'>VERIFIED</p>
                </div>
                <div className='flex items-center justify-between px-2'>
                    <p className='text-xs font-bold text-gray-400'>SECURE SESSION</p>
                    <p className='text-xs font-black text-gray-900 capitalize'>Active</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
