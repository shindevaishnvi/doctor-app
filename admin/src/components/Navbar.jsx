import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { DoctorContext } from '../context/DoctorContext'
import { useNavigate } from 'react-router-dom'
import { LayoutDashboard, Users, UserPlus, ListTodo, LogOut } from 'lucide-react'

const Navbar = () => {
    const { aToken, setAToken } = useContext(AdminContext)
    const { dToken, setDToken } = useContext(DoctorContext)
    const navigate = useNavigate()

    const logout = () => {
        navigate('/')
        aToken && setAToken('')
        aToken && localStorage.removeItem('aToken')
        dToken && setDToken('')
        dToken && localStorage.removeItem('dToken')
    }

    return (
        <div className='sticky top-0 z-50 px-4 sm:px-10 py-4 bg-white/80 backdrop-blur-md border-b border-gray-100 flex justify-between items-center'>
            <div className='flex items-center gap-3 cursor-pointer group' onClick={() => navigate('/')}>
                <div className='bg-primary p-2.5 rounded-xl shadow-lg group-hover:rotate-6 transition-transform'>
                    <Users className='text-white' size={22} />
                </div>
                <div>
                    <p className='text-xl font-bold tracking-tight text-gray-900 leading-tight'>Quick<span className='text-primary'>Care</span></p>
                    <div className='flex items-center gap-2'>
                        <span className='w-1 h-1 bg-primary rounded-full'></span>
                        <p className='text-[10px] text-gray-500 font-bold uppercase tracking-widest'>{aToken ? 'Control Center' : 'Medical Board'}</p>
                    </div>
                </div>
            </div>
            
            <button 
                onClick={logout} 
                className='btn-premium !py-2.5 !px-6 !rounded-xl !text-sm flex items-center gap-2 shadow-lg hover:shadow-primary/20'
            >
                <LogOut size={16} /> Logout
            </button>
        </div>
    )
}

export default Navbar
