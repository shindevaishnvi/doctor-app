import React from 'react'
import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

const testimonials = [
    {
        name: 'Sarah Johnson',
        role: 'Patient',
        text: 'The easiest way to book a doctor appointment. I found a specialist and booked a slot in less than 2 minutes!',
        image: 'https://i.pravatar.cc/150?u=sarah'
    },
    {
        name: 'Mark Thompson',
        role: 'Patient',
        text: 'I love how I can see all the doctor details and reviews before booking. Very professional platform.',
        image: 'https://i.pravatar.cc/150?u=mark'
    },
    {
        name: 'Emily Davis',
        role: 'Patient',
        text: '24/7 support helped me with my booking queries. Highly recommended for anyone looking for quality care.',
        image: 'https://i.pravatar.cc/150?u=emily'
    }
]

const Testimonials = () => {
    return (
        <section className='py-24 bg-gray-50/50 relative overflow-hidden'>
             <div className='absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent'></div>
             <div className='absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent'></div>

             <div className='max-w-7xl mx-auto px-4'>
                <div className='text-center mb-16 space-y-4'>
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className='inline-flex items-center gap-2 bg-primary/5 px-4 py-2 rounded-full text-primary text-xs font-black uppercase tracking-widest'
                    >
                        <Star size={14} className='fill-primary' /> Testimonials
                    </motion.div>
                    <h2 className='text-4xl font-black text-gray-950'>What Our <span className='text-primary'>Patients Say</span></h2>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                    {testimonials.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            className='glass-card p-8 rounded-[2.5rem] border border-white relative group'
                        >
                            <Quote className='absolute top-8 right-8 text-primary/10 group-hover:text-primary/20 transition-colors' size={48} />
                            <div className='flex items-center gap-4 mb-6'>
                                <img src={item.image} alt="" className='w-14 h-14 rounded-2xl object-cover border-2 border-white shadow-md' />
                                <div>
                                    <h4 className='text-lg font-bold text-gray-900'>{item.name}</h4>
                                    <p className='text-xs font-bold text-gray-400 uppercase tracking-widest'>{item.role}</p>
                                </div>
                            </div>
                            <div className='flex gap-1 mb-4'>
                                {[1,2,3,4,5].map(i => <Star key={i} size={14} className='fill-yellow-400 text-yellow-400' />)}
                            </div>
                            <p className='text-gray-500 font-medium leading-relaxed italic border-l-2 border-primary/20 pl-4'>"{item.text}"</p>
                        </motion.div>
                    ))}
                </div>
             </div>
        </section>
    )
}

export default Testimonials
