import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { CheckCircle2, Star, ArrowRight } from 'lucide-react'

const TopDoctors = () => {
    const navigate = useNavigate()
    const { doctors, currencySymbol } = useContext(AppContext)

    return (
        <div className='flex flex-col items-center gap-6 my-24 px-4'>
            <div className='text-center space-y-4 max-w-2xl'>
                <h1 className='text-4xl md:text-5xl font-bold text-gray-900 tracking-tight'>Top Rated <span className='text-primary'>Specialists</span></h1>
                <p className='text-gray-500 text-lg font-medium'>Our elite team of verified medical professionals is ready to provide you with the best care possible.</p>
            </div>

            <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8 mt-12'>
                {doctors.slice(0, 10).map((item, index) => (
                    <div 
                        onClick={() => { navigate(`/appointment/${item._id}`); window.scrollTo(0, 0) }} 
                        className='group bg-white rounded-3xl overflow-hidden cursor-pointer premium-shadow border border-gray-100 flex flex-col h-full'
                        key={index}
                    >
                        <div className='relative overflow-hidden aspect-[4/5] bg-slate-50'>
                            <img className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-700' src={item.image} alt={item.name} />
                            
                            {/* Availability Badge */}
                            <div className='absolute top-4 left-4'>
                                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-md border ${item.available ? 'bg-green-500/10 border-green-500/20 text-green-600' : 'bg-red-500/10 border-red-500/20 text-red-600'} text-[10px] font-bold uppercase tracking-wider`}>
                                    <span className={`w-1.5 h-1.5 rounded-full ${item.available ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
                                    {item.available ? 'Available' : 'Booked'}
                                </div>
                            </div>

                            {/* Hover Overlay */}
                            <div className='absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center'>
                                <div className='bg-white text-primary p-3 rounded-2xl shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform'>
                                    <ArrowRight size={24} />
                                </div>
                            </div>
                        </div>

                        <div className='p-6 flex flex-col flex-1'>
                            <div className='flex items-center justify-between mb-3'>
                                <p className='text-primary font-bold text-xs uppercase tracking-widest'>{item.speciality || item.specialization}</p>
                                <div className='flex items-center gap-1 text-yellow-500'>
                                    <Star size={12} className='fill-yellow-500' />
                                    <span className='text-xs font-bold text-gray-700'>4.9</span>
                                </div>
                            </div>
                            
                            <h3 className='text-gray-900 text-xl font-bold flex items-center gap-2 mb-1'>
                                {item.name}
                                <CheckCircle2 size={18} className='text-blue-500' />
                            </h3>
                            
                            <p className='text-gray-400 text-sm font-medium mb-4 italic line-clamp-1'>"Expert in {(item.speciality || item.specialization || '').toLowerCase()} with 10+ years exp."</p>
                            
                            <div className='mt-auto flex items-center justify-between pt-4 border-t border-gray-50'>
                                <div>
                                    <p className='text-[10px] text-gray-400 font-bold uppercase'>Consultation</p>
                                    <p className='text-lg font-bold text-gray-900'>{currencySymbol}{item.fees}</p>
                                </div>
                                <button className='bg-primary/5 hover:bg-primary hover:text-white text-primary p-3 rounded-xl transition-all'>
                                    <CheckCircle2 size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <button 
                onClick={() => { navigate('/doctors'); window.scrollTo(0, 0) }} 
                className='mt-16 btn-premium px-12 py-4 flex items-center gap-3 active:scale-95 group'
            >
                View Full Medical Directory
                <ArrowRight size={20} className='group-hover:translate-x-1 transition-transform' />
            </button>
        </div>
    )
}

export default TopDoctors
