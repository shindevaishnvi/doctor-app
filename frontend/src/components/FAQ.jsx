import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HelpCircle, ChevronDown, Sparkles } from 'lucide-react'

const faqs = [
    {
        question: 'How do I book an appointment?',
        answer: 'You can simply find a doctor through our speciality menu or the full directory, select a time slot that fits your schedule, and confirm your booking instantly.'
    },
    {
        question: 'Are all doctors verified?',
        answer: 'Yes, 100% of our medical professionals undergo a rigorous verification process including license checks and background verification to ensure you receive the best care.'
    },
    {
        question: 'Can I cancel or reschedule my appointment?',
        answer: 'Absolutely. You can manage all your bookings through the "My Appointments" section in your profile dashboard. Cancellations are free up to 24 hours before the slot.'
    },
    {
        question: 'Is my medical data secure?',
        answer: 'We use enterprise-grade encryption to protect all your personal and medical information. Your privacy is our top priority.'
    }
]

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null)

    return (
        <section className='py-24 max-w-4xl mx-auto px-4'>
            <div className='text-center mb-16 space-y-4'>
                <div className='inline-flex items-center gap-2 bg-indigo-50 px-4 py-2 rounded-full text-indigo-600 text-xs font-black uppercase tracking-widest'>
                    <HelpCircle size={14} /> Support Center
                </div>
                <h2 className='text-4xl font-black text-gray-950'>Frequently Asked <span className='text-primary'>Questions</span></h2>
            </div>

            <div className='space-y-4'>
                {faqs.map((faq, index) => (
                    <motion.div 
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className={`rounded-3xl border transition-all duration-300 overflow-hidden ${activeIndex === index ? 'border-primary ring-4 ring-primary/5 bg-white shadow-xl' : 'border-gray-100 bg-gray-50/50 hover:bg-white'}`}
                    >
                        <button 
                            onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                            className='w-full px-8 py-6 flex items-center justify-between text-left group'
                        >
                            <span className={`text-lg font-bold transition-colors ${activeIndex === index ? 'text-primary' : 'text-gray-700 group-hover:text-primary'}`}>{faq.question}</span>
                            <ChevronDown className={`text-gray-400 transition-transform duration-500 ${activeIndex === index ? 'rotate-180 text-primary' : 'group-hover:text-primary'}`} size={20} />
                        </button>
                        
                        <AnimatePresence>
                            {activeIndex === index && (
                                <motion.div 
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className='px-8 pb-8 text-gray-500 font-medium leading-relaxed'>
                                        <div className='w-full h-px bg-gray-100 mb-6'></div>
                                        {faq.answer}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>

            <motion.div 
                whileHover={{ scale: 1.02 }}
                className='mt-16 p-8 rounded-[2.5rem] bg-gradient-to-br from-gray-900 to-gray-800 text-white flex flex-col md:flex-row items-center justify-between gap-8'
            >
                <div>
                    <h3 className='text-2xl font-bold flex items-center gap-3'><Sparkles className='text-yellow-400' /> Still have questions?</h3>
                    <p className='text-gray-400 mt-1 font-medium'>Our support team is online 24/7 to help you with anything.</p>
                </div>
                <button className='bg-primary hover:bg-indigo-500 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-lg active:scale-95'>Contact Support</button>
            </motion.div>
        </section>
    )
}

export default FAQ
