import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
import { LayoutDashboard, CalendarDays, UserPlus, Users, ListTodo, UserCircle } from 'lucide-react'
import { DoctorContext } from '../context/DoctorContext'

const Sidebar = () => {
  const { aToken } = useContext(AdminContext)
  const { dToken } = useContext(DoctorContext)

  return (
    <div className='min-h-screen bg-white border-r border-gray-100 flex flex-col gap-4 py-6'>
      <div className='px-6 mb-2'>
        <p className='text-[10px] font-bold text-gray-400 uppercase tracking-widest'>Main Menu</p>
      </div>
      {
        aToken && <ul className='text-gray-600 flex flex-col gap-1 px-3'>
          <NavLink className={({ isActive }) => `flex items-center gap-3 py-3 px-6 rounded-2xl cursor-pointer transition-all duration-300 ${isActive ? 'bg-primary/5 text-primary shadow-sm' : 'hover:bg-gray-50'}`} to={'/admin-dashboard'}>
            <LayoutDashboard size={18} />
            <p className='hidden md:block font-semibold text-sm'>General Dashboard</p>
          </NavLink>
          <NavLink className={({ isActive }) => `flex items-center gap-3 py-3 px-6 rounded-2xl cursor-pointer transition-all duration-300 ${isActive ? 'bg-primary/5 text-primary shadow-sm' : 'hover:bg-gray-50'}`} to={'/all-appointments'}>
            <CalendarDays size={18} />
            <p className='hidden md:block font-semibold text-sm'>All Appointments</p>
          </NavLink>
          <NavLink className={({ isActive }) => `flex items-center gap-3 py-3 px-6 rounded-2xl cursor-pointer transition-all duration-300 ${isActive ? 'bg-primary/5 text-primary shadow-sm' : 'hover:bg-gray-50'}`} to={'/add-doctor'}>
            <UserPlus size={18} />
            <p className='hidden md:block font-semibold text-sm'>Add New Doctor</p>
          </NavLink>
          <NavLink className={({ isActive }) => `flex items-center gap-3 py-3 px-6 rounded-2xl cursor-pointer transition-all duration-300 ${isActive ? 'bg-primary/5 text-primary shadow-sm' : 'hover:bg-gray-50'}`} to={'/doctor-list'}>
            <Users size={18} />
            <p className='hidden md:block font-semibold text-sm'>Expert Directory</p>
          </NavLink>
        </ul>
      }
      {
        dToken && <ul className='text-gray-600 flex flex-col gap-1 px-3'>
          <NavLink className={({ isActive }) => `flex items-center gap-3 py-3 px-6 rounded-2xl cursor-pointer transition-all duration-300 ${isActive ? 'bg-primary/5 text-primary shadow-sm' : 'hover:bg-gray-50'}`} to={'/doctor-dashboard'}>
            <LayoutDashboard size={18} />
            <p className='hidden md:block font-semibold text-sm'>My Dashboard</p>
          </NavLink>
          <NavLink className={({ isActive }) => `flex items-center gap-3 py-3 px-6 rounded-2xl cursor-pointer transition-all duration-300 ${isActive ? 'bg-primary/5 text-primary shadow-sm' : 'hover:bg-gray-50'}`} to={'/doctor-appointments'}>
            <CalendarDays size={18} />
            <p className='hidden md:block font-semibold text-sm'>My Schedule</p>
          </NavLink>
          <NavLink className={({ isActive }) => `flex items-center gap-3 py-3 px-6 rounded-2xl cursor-pointer transition-all duration-300 ${isActive ? 'bg-primary/5 text-primary shadow-sm' : 'hover:bg-gray-50'}`} to={'/doctor-profile'}>
            <UserCircle size={18} />
            <p className='hidden md:block font-semibold text-sm'>My Profile</p>
          </NavLink>
        </ul>
      }
    </div>
  )
}

export default Sidebar
