import React from 'react'
import { motion } from 'framer-motion'
import { Search, Calendar, CheckCircle, ArrowRight } from 'lucide-react'

const steps = [
    {
        title: 'Find Your Specialist',
        desc: 'Search from our extensive directory of world-class verified doctors.',
        icon: <Search className='text-blue-600' size={32} />,
        color: 'bg-blue-50'
    },
    {
        title: 'Choose a Schedule',
        desc: 'Select a time slot that conveniently fits your busy lifestyle.',
        icon: <Calendar className='text-indigo-600' size={32} />,
        color: 'bg-indigo-50'
    },
    {
        title: 'Confirm Booking',
        desc: 'Get instant confirmation and a simplified medical experience.',
        icon: <CheckCircle className='text-emerald-600' size={32} />,
        color: 'bg-emerald-50'
    }
]

const HowItWorks = () => {
    return (
        <section className='py-24 max-w-7xl mx-auto px-4'>
            <div className='flex flex-col items-center gap-4 mb-20 text-center'>
                <p className='text-primary font-bold text-xs uppercase tracking-[3px] bg-primary/5 px-4 py-2 rounded-full'>Process</p>
                <h2 className='text-4xl md:text-5xl font-black text-gray-950'>How it <span className='text-primary'>Works</span></h2>
                <p className='text-gray-500 font-medium max-w-xl'>We've simplified the medical consultation process into three effortless steps.</p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-12 relative'>
                {/* Horizontal Line for Desktop */}
                <div className='hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -z-10 transform -translate-y-1/2 overflow-hidden'>
                    <motion.div 
                        initial={{ x: '-100%' }}
                        whileInView={{ x: '100%' }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                        className='w-1/2 h-full bg-gradient-to-r from-transparent via-primary/30 to-transparent'
                    />
                </div>

                {steps.map((step, index) => (
                    <motion.div 
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2 }}
                        className='flex flex-col items-center text-center group'
                    >
                        <div className={`w-24 h-24 ${step.color} rounded-[2rem] flex items-center justify-center mb-8 shadow-sm group-hover:shadow-2xl group-hover:scale-110 transition-all duration-500 relative`}>
                            <div className='absolute -top-3 -left-3 w-10 h-10 bg-white rounded-2xl flex items-center justify-center font-black text-primary shadow-lg border border-gray-50'>
                                0{index + 1}
                            </div>
                            {step.icon}
                        </div>
                        <h3 className='text-2xl font-bold text-gray-900 mb-4'>{step.title}</h3>
                        <p className='text-gray-500 font-medium leading-relaxed'>{step.desc}</p>
                        
                        {index < 2 && (
                             <div className='md:hidden my-8 text-gray-200'>
                                <ArrowRight size={32} className='rotate-90' />
                             </div>
                        )}
                    </motion.div>
                ))}
            </div>
        </section>
    )
}

export default HowItWorks
