import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Sparkles, ArrowRight, CalendarCheck } from 'lucide-react'

const Banner = () => {
    const navigate = useNavigate()

    return (
        <div className='relative mb-24 overflow-hidden'>
            <div className='bg-primary px-8 py-16 md:px-16 md:py-24 rounded-[3rem] shadow-2xl overflow-hidden relative group'>
                {/* Decorative Elements */}
                <div className='absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl'></div>
                <div className='absolute -bottom-24 -left-24 w-64 h-64 bg-secondary/10 rounded-full blur-3xl'></div>

                <div className='flex flex-col md:flex-row items-center justify-between gap-12 relative z-10'>
                    {/* ------- Left Side ------- */}
                    <div className='flex-1 space-y-6 text-center md:text-left'>
                        <div className='inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-white text-xs font-bold uppercase tracking-widest'>
                            <Sparkles size={14} className='text-yellow-300' /> Limited Availability
                        </div>
                        
                        <h2 className='text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight'>
                            Ready to take <br className='hidden lg:block' />
                            <span className='text-secondary'>control of your health?</span>
                        </h2>
                        
                        <p className='text-white/80 text-lg font-medium max-w-xl'>
                            Join thousands of happy patients who have found their perfect doctor. Schedule your first appointment today.
                        </p>

                        <div className='flex flex-wrap justify-center md:justify-start gap-4 pt-4'>
                            <button 
                                onClick={() => { navigate('/login'); window.scrollTo(0, 0) }} 
                                className='btn-premium bg-white text-primary px-10 py-4 flex items-center gap-3 shadow-xl hover:scale-105 active:scale-95 transition-all text-base'
                            >
                                Get Started Free <ArrowRight size={20} />
                            </button>
                        </div>
                    </div>

                    {/* ------- Right Side ------- */}
                    <div className='hidden lg:flex items-center justify-center p-8 bg-white/10 backdrop-blur-md rounded-[2.5rem] border border-white/20 shadow-2xl relative'>
                        <div className='absolute -top-6 -left-6 bg-secondary p-4 rounded-2xl shadow-xl animate-bounce'>
                            <CalendarCheck className='text-white' size={32} />
                        </div>
                        <div className='space-y-4 text-center'>
                            <p className='text-5xl font-black text-white'>100+</p>
                            <p className='text-sm font-bold text-white/70 uppercase tracking-[2px]'>Specialized Doctors</p>
                            <div className='flex justify-center gap-1'>
                                {[1,2,3,4,5].map(i => <Sparkles key={i} size={14} className='text-yellow-400 fill-yellow-400' />)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Banner
