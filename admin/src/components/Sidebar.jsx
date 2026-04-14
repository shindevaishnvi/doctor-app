import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
import { LayoutDashboard, CalendarDays, UserPlus, Users, ListTodo, UserCircle, ShieldCheck } from 'lucide-react'
import { DoctorContext } from '../context/DoctorContext'

const Sidebar = () => {
  const { aToken } = useContext(AdminContext)
  const { dToken } = useContext(DoctorContext)

  return (
    <div className='min-h-screen w-18 md:w-72 bg-white border-r border-gray-100 flex flex-col gap-8 py-10 transition-all duration-300'>
      
      <div className='px-8 mb-4 hidden md:block'>
        <div className='flex items-center gap-2 mb-2'>
            <ShieldCheck className='text-primary' size={18} />
            <p className='text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]'>Medical Control</p>
        </div>
      </div>

      {
        aToken && <ul className='text-gray-500 flex flex-col gap-2 px-4'>
          <NavLink 
            className={({ isActive }) => `flex items-center gap-4 py-4 px-6 rounded-[1.25rem] cursor-pointer transition-all duration-300 group ${isActive ? 'bg-primary text-white shadow-xl shadow-primary/20' : 'hover:bg-gray-50 hover:text-gray-900'}`} 
            to={'/admin-dashboard'}
          >
            <LayoutDashboard size={20} className='shrink-0' />
            <p className='hidden md:block font-bold text-sm tracking-tight'>Dashboard</p>
          </NavLink>

          <NavLink 
            className={({ isActive }) => `flex items-center gap-4 py-4 px-6 rounded-[1.25rem] cursor-pointer transition-all duration-300 group ${isActive ? 'bg-primary text-white shadow-xl shadow-primary/20' : 'hover:bg-gray-50 hover:text-gray-900'}`} 
            to={'/all-appointments'}
          >
            <CalendarDays size={20} className='shrink-0' />
            <p className='hidden md:block font-bold text-sm tracking-tight'>All Bookings</p>
          </NavLink>

          <NavLink 
            className={({ isActive }) => `flex items-center gap-4 py-4 px-6 rounded-[1.25rem] cursor-pointer transition-all duration-300 group ${isActive ? 'bg-primary text-white shadow-xl shadow-primary/20' : 'hover:bg-gray-50 hover:text-gray-900'}`} 
            to={'/add-doctor'}
          >
            <UserPlus size={20} className='shrink-0' />
            <p className='hidden md:block font-bold text-sm tracking-tight'>Onboard Doctor</p>
          </NavLink>

          <NavLink 
            className={({ isActive }) => `flex items-center gap-4 py-4 px-6 rounded-[1.25rem] cursor-pointer transition-all duration-300 group ${isActive ? 'bg-primary text-white shadow-xl shadow-primary/20' : 'hover:bg-gray-50 hover:text-gray-900'}`} 
            to={'/doctor-list'}
          >
            <Users size={20} className='shrink-0' />
            <p className='hidden md:block font-bold text-sm tracking-tight'>Directory</p>
          </NavLink>
        </ul>
      }

      {
        dToken && <ul className='text-gray-500 flex flex-col gap-2 px-4'>
          <NavLink 
            className={({ isActive }) => `flex items-center gap-4 py-4 px-6 rounded-[1.25rem] cursor-pointer transition-all duration-300 group ${isActive ? 'bg-primary text-white shadow-xl shadow-primary/20' : 'hover:bg-gray-50 hover:text-gray-900'}`} 
            to={'/doctor-dashboard'}
          >
            <LayoutDashboard size={20} className='shrink-0' />
            <p className='hidden md:block font-bold text-sm tracking-tight'>Pulse Dashboard</p>
          </NavLink>

          <NavLink 
            className={({ isActive }) => `flex items-center gap-4 py-4 px-6 rounded-[1.25rem] cursor-pointer transition-all duration-300 group ${isActive ? 'bg-primary text-white shadow-xl shadow-primary/20' : 'hover:bg-gray-50 hover:text-gray-900'}`} 
            to={'/doctor-appointments'}
          >
            <CalendarDays size={20} className='shrink-0' />
            <p className='hidden md:block font-bold text-sm tracking-tight'>My Sessions</p>
          </NavLink>

          <NavLink 
            className={({ isActive }) => `flex items-center gap-4 py-4 px-6 rounded-[1.25rem] cursor-pointer transition-all duration-300 group ${isActive ? 'bg-primary text-white shadow-xl shadow-primary/20' : 'hover:bg-gray-50 hover:text-gray-900'}`} 
            to={'/doctor-profile'}
          >
            <UserCircle size={20} className='shrink-0' />
            <p className='hidden md:block font-bold text-sm tracking-tight'>Availability Profile</p>
          </NavLink>
        </ul>
      }

      <div className='mt-auto px-10 pb-10 hidden md:block'>
        <div className='bg-primary/5 p-6 rounded-3xl border border-primary/10'>
            <p className='text-xs font-bold text-primary mb-1'>Pro Access</p>
            <p className='text-[10px] text-gray-500 font-medium'>Full system privileges active.</p>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
