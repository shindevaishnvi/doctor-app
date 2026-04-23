import React, { useContext, useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { Menu, X, User, LogOut, ChevronDown, Bell, FileText, Activity, Sparkles, Thermometer, Scan, Droplet } from 'lucide-react'
import NotificationBell from './NotificationBell'

const Navbar = () => {
    const navigate = useNavigate()
    const [showMenu, setShowMenu] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const { token, setToken, userData } = useContext(AppContext)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const logout = () => {
        setToken(false)
        localStorage.removeItem('token')
        navigate('/login')
    }

    return (
        <div className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'glass-card py-3 rounded-2xl mx-4 sm:mx-[10%] mt-4' : 'py-5'}`}>
            <div className='flex items-center justify-between px-4'>
                <div onClick={() => navigate('/')} className='flex items-center gap-3 cursor-pointer group'>
                    <div className='bg-primary p-2.5 rounded-xl shadow-lg group-hover:rotate-6 transition-transform'>
                        <User className='text-white' size={22} />
                    </div>
                    <div>
                        <p className='text-xl font-bold tracking-tight text-gray-900'>Quick<span className='text-primary'>Care</span></p>
                        <p className='text-[10px] text-gray-500 font-medium uppercase tracking-[2px] mt-[-2px]'>Premium Health</p>
                    </div>
                </div>

                <ul className='hidden md:flex items-center gap-8 font-semibold text-gray-600'>
                    {['Home', 'Doctors', 'Smart AI', 'Symptoms', 'Blood Hub', 'About', 'Contact'].map((item) => (
                        <NavLink key={item} to={item === 'Home' ? '/' : item === 'Smart AI' ? '/smart-recommendation' : item === 'Symptoms' ? '/symptom-checker' : item === 'Blood Hub' ? '/blood-hub' : `/${item.toLowerCase().replace(' ', '-')}`} className='relative group'>
                            <li className='hover:text-primary flex items-center gap-1 transition-colors py-1'>
                                {item === 'Smart AI' && <Sparkles size={14} className="text-primary"/>}
                                {item === 'Symptoms' && <Thermometer size={14} className="text-gray-400 group-hover:text-primary"/>}
                                {item === 'Blood Hub' && <Droplet size={14} className="text-red-500"/>}
                                {item}
                            </li>
                            <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-[.active]:w-full'></span>
                        </NavLink>
                    ))}
                </ul>

                <div className='flex items-center gap-5'>
                    {
                        token && userData
                            ? <div className='flex items-center gap-4'>
                                <NotificationBell />
                                <div className='flex items-center gap-2 cursor-pointer group relative bg-gray-50 p-1 pr-3 rounded-full border border-gray-100 hover:border-primary/30 transition-all'>
                                    <img className='w-9 h-9 rounded-full object-cover border-2 border-white' src={userData.image || 'https://img.freepik.com/free-vector/user-blue-gradient_78370-4692.jpg'} alt="" />
                                    <p className='hidden sm:block text-sm font-semibold text-gray-700'>{userData.name?.split(' ')[0] || 'User'}</p>
                                    <ChevronDown size={14} className='text-gray-400' />
                                    
                                    <div className='absolute top-full right-0 pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0'>
                                        <div className='min-w-56 glass-card rounded-2xl p-2 shadow-2xl border border-white/50'>
                                            <div className='px-4 py-3 border-b border-gray-100/50 mb-1'>
                                                <p className='text-xs text-gray-400 font-medium'>Connected as</p>
                                                <p className='text-sm font-bold text-gray-800 truncate'>{userData.email}</p>
                                            </div>
                                            <p onClick={() => navigate('my-profile')} className='flex items-center gap-3 px-4 py-3 hover:bg-primary/5 hover:text-primary rounded-xl transition-all cursor-pointer font-medium text-sm text-gray-600'>
                                                <User size={18} /> My Profile
                                            </p>
                                            <p onClick={() => navigate('live-queue')} className='flex items-center gap-3 px-4 py-3 hover:bg-primary/5 hover:text-primary rounded-xl transition-all cursor-pointer font-medium text-sm text-gray-600'>
                                                <Activity size={18} /> Live Queue
                                            </p>
                                            <p onClick={() => navigate('medical-records')} className='flex items-center gap-3 px-4 py-3 hover:bg-primary/5 hover:text-primary rounded-xl transition-all cursor-pointer font-medium text-sm text-gray-600'>
                                                <FileText size={18} /> Medical Records
                                            </p>
                                            <p onClick={() => navigate('scan-prescription')} className='flex items-center gap-3 px-4 py-3 hover:bg-primary/5 hover:text-primary rounded-xl transition-all cursor-pointer font-medium text-sm text-gray-600'>
                                                <Scan size={18} /> Scan Script
                                            </p>
                                            <p onClick={() => navigate('my-appointments')} className='flex items-center gap-3 px-4 py-3 hover:bg-primary/5 hover:text-primary rounded-xl transition-all cursor-pointer font-medium text-sm text-gray-600'>
                                                <Bell size={18} /> My Appointments
                                            </p>
                                            <hr className='my-1 border-gray-100/50' />
                                            <p onClick={logout} className='flex items-center gap-3 px-4 py-3 hover:bg-red-50 hover:text-red-500 rounded-xl transition-all cursor-pointer font-medium text-sm text-red-400'>
                                                <LogOut size={18} /> Logout
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            : <button onClick={() => navigate('/login')} className='btn-premium hidden md:block'>Sign In</button>
                    }
                    <button onClick={() => setShowMenu(true)} className='p-2 md:hidden text-gray-600 hover:bg-gray-100 rounded-xl transition-all'>
                        <Menu size={24} />
                    </button>

                    {/* Mobile Menu */}
                    <div className={`${showMenu ? 'fixed inset-0 opacity-100 visible' : 'opacity-0 invisible'} z-[60] bg-black/40 backdrop-blur-sm transition-all duration-300 md:hidden`} onClick={() => setShowMenu(false)}>
                        <div className={`fixed right-0 top-0 bottom-0 w-80 bg-white shadow-2xl transition-transform duration-500 ${showMenu ? 'translate-x-0' : 'translate-x-full'}`} onClick={e => e.stopPropagation()}>
                            <div className='flex items-center justify-between px-6 py-6 border-b border-gray-50'>
                                <div className='flex items-center gap-3'>
                                    <div className='bg-primary p-2 rounded-xl'>
                                        <User className='text-white' size={20} />
                                    </div>
                                    <p className='text-lg font-bold'>QuickCare</p>
                                </div>
                                <button onClick={() => setShowMenu(false)} className='p-2 hover:bg-gray-50 rounded-lg'>
                                    <X size={24} />
                                </button>
                            </div>
                            <div className='flex flex-col p-6 gap-2'>
                                {['Home', 'Doctors', 'Smart AI', 'Symptoms', 'Blood Hub', 'About', 'Contact'].map((item) => (
                                    <NavLink key={item} onClick={() => setShowMenu(false)} to={item === 'Home' ? '/' : item === 'Smart AI' ? '/smart-recommendation' : item === 'Symptoms' ? '/symptom-checker' : item === 'Blood Hub' ? '/blood-hub' : `/${item.toLowerCase().replace(' ', '-')}`} className='px-6 py-4 rounded-2xl hover:bg-gray-50 font-semibold text-gray-600 hover:text-primary transition-all flex items-center gap-2'>
                                        {item === 'Smart AI' && <Sparkles size={16} className="text-primary"/>}
                                        {item === 'Symptoms' && <Thermometer size={16} className="text-gray-400 group-hover:text-primary"/>}
                                        {item === 'Blood Hub' && <Droplet size={16} className="text-red-500"/>}
                                        {item.toUpperCase()}
                                    </NavLink>
                                ))}
                                {!token && (
                                    <button onClick={() => { navigate('/login'); setShowMenu(false) }} className='btn-premium mt-4 mx-4 text-center'>Get Started</button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
