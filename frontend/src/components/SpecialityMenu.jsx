import React from 'react'
import { Link } from 'react-router-dom'
import { Stethoscope, UserCog, Beaker, Baby, Brain, Microscope, Sparkles } from 'lucide-react'

// Professional curated data for specialties
const specialityData = [
    { speciality: 'General physician', icon: <Stethoscope size={32} />, color: 'bg-blue-50 text-blue-600' },
    { speciality: 'Gynecologist', icon: <UserCog size={32} />, color: 'bg-rose-50 text-rose-600' },
    { speciality: 'Dermatologist', icon: <Microscope size={32} />, color: 'bg-indigo-50 text-indigo-600' },
    { speciality: 'Pediatricians', icon: <Baby size={32} />, color: 'bg-amber-50 text-amber-600' },
    { speciality: 'Neurologist', icon: <Brain size={32} />, color: 'bg-purple-50 text-purple-600' },
    { speciality: 'Gastroenterologist', icon: <Beaker size={32} />, color: 'bg-emerald-50 text-emerald-600' },
]

const SpecialityMenu = () => {
    return (
        <div className='flex flex-col items-center gap-8 py-24 px-4' id='speciality'>
            <div className='text-center space-y-3 max-w-xl'>
                <div className='inline-flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest bg-primary/5 px-4 py-2 rounded-full mb-2'>
                    <Sparkles size={14} /> Medical Expertise
                </div>
                <h2 className='text-4xl md:text-5xl font-bold text-gray-900 tracking-tight'>Find by <span className='text-primary'>Speciality</span></h2>
                <p className='text-gray-500 font-medium'>Access our diverse network of specialized healthcare providers tailored to your specific needs.</p>
            </div>

            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 w-full max-w-7xl mt-8'>
                {specialityData.map((item, index) => (
                    <Link 
                        onClick={() => window.scrollTo(0, 0)} 
                        className='group flex flex-col items-center p-8 rounded-[2rem] bg-white border border-gray-100 hover:border-primary/20 hover:bg-primary/5 transition-all duration-500 shadow-sm hover:shadow-xl hover:-translate-y-2' 
                        key={index} 
                        to={`/doctors/${item.speciality}`}
                    >
                        <div className={`w-20 h-20 flex items-center justify-center rounded-2xl mb-4 transition-transform duration-500 group-hover:rotate-12 ${item.color}`}>
                            {item.icon}
                        </div>
                        <p className='text-gray-900 font-bold text-sm text-center line-clamp-1'>{item.speciality}</p>
                        <div className='w-0 group-hover:w-8 h-1 bg-primary rounded-full mt-3 transition-all duration-500'></div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default SpecialityMenu
