import React from 'react'
import { User, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, ArrowUp } from 'lucide-react'

const Footer = () => {
    return (
        <footer className='mt-32 pb-12 px-4'>
            <div className='max-w-7xl mx-auto'>
                {/* Newsletter Section */}
                <div className='glass-card p-10 md:p-16 rounded-[3rem] mb-20 flex flex-col lg:flex-row items-center justify-between gap-10 premium-shadow border border-white/50 relative overflow-hidden'>
                    <div className='absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32'></div>
                    <div className='relative z-10 space-y-4 text-center lg:text-left'>
                        <h3 className='text-3xl font-black text-gray-950'>Health Tips to your <span className='text-primary'>Inbox</span></h3>
                        <p className='text-gray-500 font-medium max-w-md'>Stay updated with the latest medical advice and platform updates. Join 10k+ subscribers.</p>
                    </div>
                    <div className='relative z-10 w-full lg:w-auto min-w-[350px]'>
                         <div className='bg-white p-2 rounded-2xl shadow-xl flex items-center border border-gray-100'>
                            <input className='flex-1 bg-transparent px-4 py-3 text-sm font-medium outline-none' type="email" placeholder="Enter your email" />
                            <button className='btn-premium !rounded-xl !py-3 px-6 shadow-sm'>Subscribe</button>
                         </div>
                    </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16'>
                    {/* Brand Section */}
                    <div className='space-y-6'>
                        <div className='flex items-center gap-3'>
                            <div className='bg-primary p-2.5 rounded-xl shadow-lg'>
                                <User className='text-white' size={22} />
                            </div>
                            <div>
                                <p className='text-2xl font-black tracking-tight text-gray-900'>Quick<span className='text-primary'>Care</span></p>
                                <p className='text-[10px] text-gray-500 font-bold uppercase tracking-[2px] mt-[-3px]'>Premium Health</p>
                            </div>
                        </div>
                        <p className='text-gray-500 font-medium leading-relaxed text-sm'>
                            Redefining the standard of digital medical assistance. We prioritize your health by connecting you with the world's most trusted doctors.
                        </p>
                        <div className='flex items-center gap-4 pt-2'>
                            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                                <a key={i} href="#" className='w-11 h-11 flex items-center justify-center rounded-2xl bg-white border border-gray-100 text-gray-400 hover:text-primary hover:border-primary/30 hover:shadow-xl transition-all'>
                                    <Icon size={20} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className='lg:pl-8'>
                        <h4 className='text-gray-900 font-black mb-8 uppercase tracking-widest text-[10px]'>Medical Services</h4>
                        <ul className='space-y-4 font-bold text-gray-500 text-sm'>
                            {['General Care', 'Dental Clinic', 'Neurology', 'Pediatric', 'Cardiology'].map(item => (
                                <li key={item} className='hover:text-primary cursor-pointer transition-colors flex items-center gap-3 group'>
                                    <span className='w-1.5 h-1.5 rounded-full bg-gray-200 group-hover:bg-primary transition-all group-hover:scale-150'></span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className='text-gray-900 font-black mb-8 uppercase tracking-widest text-[10px]'>Support Network</h4>
                        <ul className='space-y-4 font-bold text-gray-500 text-sm'>
                            {['Clinic Locator', 'Privacy Ethics', 'Session Guidelines', 'Booking Guide', 'FAQs'].map(item => (
                                <li key={item} className='hover:text-primary cursor-pointer transition-colors flex items-center gap-3 group'>
                                    <span className='w-1.5 h-1.5 rounded-full bg-gray-200 group-hover:bg-primary transition-all group-hover:scale-150'></span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className='glass-card p-8 rounded-[2.5rem] bg-gray-50/50 border border-white/50 space-y-6'>
                        <h4 className='text-gray-900 font-black uppercase tracking-widest text-[10px]'>Get In Touch</h4>
                        <ul className='space-y-6 font-bold text-gray-600 text-xs'>
                            <li className='flex items-start gap-4'>
                                <div className='w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center text-primary shrink-0'><MapPin size={16} /></div>
                                <span className='leading-relaxed'>123 Medical Plaza, Health District, NY 10001</span>
                            </li>
                            <li className='flex items-center gap-4'>
                                <div className='w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center text-primary shrink-0'><Phone size={16} /></div>
                                <span>+1 (555) 123-4567</span>
                            </li>
                            <li className='flex items-center gap-4'>
                                <div className='w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center text-primary shrink-0'><Mail size={16} /></div>
                                <span>hello@quickcare.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className='pt-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6'>
                    <p className='text-gray-400 text-xs font-bold uppercase tracking-widest'>
                        © {new Date().getFullYear()} QuickCare Group. Health Simplified.
                    </p>
                    <button 
                        onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
                        className='group flex items-center gap-3 text-gray-400 hover:text-primary transition-colors font-black uppercase tracking-widest text-[10px]'
                    >
                        Back to top
                        <div className='w-11 h-11 flex items-center justify-center rounded-2xl bg-gray-50 group-hover:bg-primary group-hover:text-white transition-all shadow-md'>
                            <ArrowUp size={18} />
                        </div>
                    </button>
                </div>
            </div>
        </footer>
    )
}

export default Footer
