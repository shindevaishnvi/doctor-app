import React from 'react'
import { ArrowRight, Star, ShieldCheck, Clock } from 'lucide-react'
import heroImg from '../assets/hero-doctor.png'

const Header = () => {
    return (
        <div className='flex flex-col md:flex-row flex-wrap bg-gradient-to-br from-indigo-600 via-primary to-indigo-700 rounded-[2.5rem] px-8 md:px-12 lg:px-24 overflow-hidden relative group min-h-[500px] mb-20'>
            {/* Background Decorative Elements */}
            <div className='absolute top-[-10%] left-[-5%] w-64 h-64 bg-white/10 rounded-full blur-3xl'></div>
            <div className='absolute bottom-[-10%] right-[-5%] w-96 h-96 bg-secondary/20 rounded-full blur-3xl'></div>

            {/* --------- Left Side --------- */}
            <div className='md:w-1/2 flex flex-col items-start justify-center gap-6 py-16 md:py-24 z-10'>
                <div className='inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-white text-xs font-bold uppercase tracking-widest'>
                    <Star size={14} className='fill-yellow-400 text-yellow-400' /> Trusted by 50,000+ Patients
                </div>
                
                <h1 className='text-4xl md:text-5xl lg:text-7xl text-white font-bold leading-[1.1]'>
                    Your Health, <br />
                    <span className='text-secondary'>Our Priority.</span>
                </h1>
                
                <p className='text-white/80 text-lg md:text-xl font-medium max-w-lg leading-relaxed'>
                    Connect with world-class specialists and book your consultation in seconds. Expert care, right when you need it.
                </p>

                <div className='flex flex-wrap items-center gap-6 mt-4'>
                    <a href="#speciality" className='btn-premium bg-white text-primary text-base px-10 py-4 shadow-2xl hover:scale-105 transition-all flex items-center gap-3'>
                        Book Now <ArrowRight size={20} />
                    </a>
                    
                    <div className='flex items-center gap-4 text-white/90'>
                        <div className='flex -space-x-3'>
                            {[1,2,3,4].map(i => (
                                <div key={i} className='w-10 h-10 rounded-full border-2 border-primary bg-gray-200 overflow-hidden'>
                                    <img src={`https://i.pravatar.cc/150?u=${i}`} alt="" />
                                </div>
                            ))}
                        </div>
                        <p className='text-sm font-semibold'>Join 5k+ members</p>
                    </div>
                </div>

                <div className='grid grid-cols-2 lg:grid-cols-3 gap-6 mt-8 pt-8 border-t border-white/10 w-full'>
                    <div className='flex items-center gap-3 text-white/80'>
                        <ShieldCheck size={20} className='text-secondary' />
                        <span className='text-sm font-medium'>Verified Doctors</span>
                    </div>
                    <div className='flex items-center gap-3 text-white/80'>
                        <Clock size={20} className='text-secondary' />
                        <span className='text-sm font-medium'>24/7 Support</span>
                    </div>
                </div>
            </div>

            {/* --------- Right Side --------- */}
            <div className='md:w-1/2 relative flex items-end justify-center pt-10 md:pt-0'>
                <div className='relative animate-float'>
                    <div className='absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent rounded-full blur-3xl -z-10 h-[80%] bottom-0'></div>
                    <img className='w-full max-w-lg lg:max-w-xl z-20 drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)]' src={heroImg} alt="Professional Doctor" />
                </div>
                
                {/* Floating Card */}
                <div className='absolute bottom-20 right-0 lg:right-10 glass-card p-4 rounded-2xl flex items-center gap-4 animate-float' style={{animationDelay: '1s'}}>
                    <div className='bg-green-100 p-2 rounded-xl'>
                        <ShieldCheck className='text-green-600' />
                    </div>
                    <div>
                        <p className='text-xs text-gray-400 font-bold uppercase'>Online Now</p>
                        <p className='text-sm font-bold text-gray-800'>Available Experts</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
