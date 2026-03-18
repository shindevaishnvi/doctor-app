import React from 'react'

import { ShieldCheck, Target, Heart, Zap, Globe, Users, Sparkles } from 'lucide-react'

const About = () => {
    return (
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20'>
            {/* --- Hero Section --- */}
            <div className='text-center space-y-4 mb-20'>
                <div className='inline-flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest bg-primary/5 px-4 py-2 rounded-full mb-2'>
                    <Sparkles size={14} /> Our Mission
                </div>
                <h1 className='text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight'>Transforming <span className='text-primary'>Digital Healthcare</span></h1>
                <p className='text-gray-500 text-lg max-w-2xl mx-auto font-medium'>Empowering patients and providers through innovative technology and compassionate care systems.</p>
            </div>

            {/* --- Content Grid --- */}
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32'>
                <div className='relative group'>
                    <div className='absolute -inset-4 bg-primary/10 rounded-[3rem] blur-2xl group-hover:bg-primary/20 transition-all duration-700'></div>
                    <div className='relative aspect-square lg:aspect-video rounded-[3rem] bg-gradient-to-br from-indigo-600 to-primary overflow-hidden flex flex-col items-center justify-center p-12 text-center text-white space-y-6 shadow-2xl'>
                        <div className='w-20 h-20 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center'>
                           <ShieldCheck size={40} />
                        </div>
                        <h3 className='text-3xl font-black'>The Gold Standard in Care</h3>
                        <p className='text-white/80 font-medium leading-relaxed'>Dedicated to providing a seamless bridge between your symptoms and the world's best specialists.</p>
                    </div>
                </div>

                <div className='space-y-8'>
                    <div className='space-y-4'>
                        <h2 className='text-3xl font-black text-gray-900 leading-tight'>Your Trusted Partner in Modern Healthcare</h2>
                        <p className='text-gray-600 font-medium leading-relaxed'>At QuickCare, we understand that finding the right doctor shouldn't be a source of stress. We've built a platform that puts the power of choice and convenience back into the hands of patients.</p>
                        <p className='text-gray-600 font-medium leading-relaxed'>Our ecosystem is designed for speed, security, and personalized attention. Whether you need a routine check-up or specialized surgery consultation, we're here to make the process effortless.</p>
                    </div>

                    <div className='p-8 glass-card rounded-3xl border-l-4 border-primary'>
                        <h3 className='text-xl font-black text-gray-900 flex items-center gap-3'>
                            <Target className='text-primary' /> Our Collective Vision
                        </h3>
                        <p className='text-gray-500 font-medium mt-3 leading-relaxed'>
                            To democratize access to elite healthcare globally, ensuring that every individual, regardless of location, can connect with top-tier medical expertise in minutes.
                        </p>
                    </div>
                </div>
            </div>

            {/* --- Stats / Why Choose Us --- */}
            <div className='relative space-y-12'>
                <div className='flex flex-col md:flex-row items-end justify-between gap-6'>
                    <div className='space-y-2'>
                        <h2 className='text-3xl font-black text-gray-900'>Why Choose <span className='text-primary'>QuickCare?</span></h2>
                        <p className='text-gray-500 font-medium'>We distinguish ourselves through three core pillars of excellence.</p>
                    </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-20'>
                    {[
                        { 
                            title: 'Maximum Efficiency', 
                            desc: 'Our proprietary algorithm matches you with available doctors instantly, reducing wait times by 80%.',
                            icon: <Zap size={24} />,
                            color: 'bg-amber-50 text-amber-600'
                        },
                        { 
                            title: 'Absolute Convenience', 
                            desc: 'Manage your appointments, history, and prescriptions from any device, anywhere in the world.',
                            icon: <Globe size={24} />,
                            color: 'bg-emerald-50 text-emerald-600'
                        },
                        { 
                            title: 'Human-First Approach', 
                            desc: 'We prioritize the patient-doctor relationship above all, ensuring compassionate interactions every time.',
                            icon: <Heart size={24} />,
                            color: 'bg-rose-50 text-rose-600'
                        }
                    ].map((item, index) => (
                        <div key={index} className='glass-card p-10 rounded-[2.5rem] premium-shadow border border-white/50 hover:-translate-y-2 transition-all duration-500 group'>
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${item.color}`}>
                                {item.icon}
                            </div>
                            <h4 className='text-xl font-black text-gray-900 mb-3'>{item.title}</h4>
                            <p className='text-gray-500 font-medium leading-relaxed'>{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default About
