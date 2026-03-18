import { Mail, Phone, MapPin, Briefcase, Clock, Sparkles } from 'lucide-react'

const Contact = () => {
  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20'>
      <div className='text-center space-y-4 mb-20'>
        <div className='inline-flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest bg-primary/5 px-4 py-2 rounded-full mb-2'>
            <Mail size={14} /> Contact Information
        </div>
        <h1 className='text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight'>Get In <span className='text-primary'>Touch</span></h1>
        <p className='text-gray-500 text-lg max-w-2xl mx-auto font-medium'>Have questions about our services or need help booking? Our team is available 24/7 to assist you.</p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 mb-20'>
        {/* Left: Contact Info Cards */}
        <div className='space-y-8'>
          <div className='glass-card p-8 rounded-[2.5rem] premium-shadow border border-white/50 space-y-6'>
            <h3 className='text-2xl font-black text-gray-900 flex items-center gap-3'>
                <MapPin className='text-primary' /> HeadQuarters
            </h3>
            <div className='space-y-4 text-gray-600 font-medium'>
              <p className='leading-relaxed'>
                00000 Willms Station <br /> 
                Suite 000, Silicon Valley <br />
                Washington, DC 20001, USA
              </p>
              <div className='flex items-center gap-3 pt-2 text-sm'>
                <Clock className='text-gray-400' size={18} />
                <span>Mon - Fri: 9:00 AM - 6:00 PM EST</span>
              </div>
            </div>
            
            <div className='pt-6 border-t border-gray-100 flex flex-col gap-4'>
              <div className='flex items-center gap-4 text-gray-900 font-bold'>
                 <div className='w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center text-primary'>
                    <Phone size={18} />
                 </div>
                 <p>(+1) 000-000-0000</p>
              </div>
              <div className='flex items-center gap-4 text-gray-900 font-bold'>
                 <div className='w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center text-primary'>
                    <Mail size={18} />
                 </div>
                 <p>support@quickcare.com</p>
              </div>
            </div>
          </div>

          <div className='glass-card p-8 rounded-[2.5rem] premium-shadow border border-white/50 space-y-6'>
            <h3 className='text-2xl font-black text-gray-900 flex items-center gap-3'>
                <Briefcase className='text-primary' /> Career Opportunities
            </h3>
            <p className='text-gray-500 font-medium leading-relaxed'>
              We're always looking for talented medical professionals and developers to join our growing global team. Become part of the health revolution.
            </p>
            <button className='btn-premium !rounded-2xl !py-4 px-10 shadow-lg shadow-primary/20 group'>
              View Current Openings
              <Sparkles size={18} className='ml-3 group-hover:rotate-12 transition-transform' />
            </button>
          </div>
        </div>

        {/* Right: Modern Placeholder / Image */}
        <div className='relative group'>
          <div className='absolute -inset-4 bg-primary/10 rounded-[3rem] blur-2xl group-hover:bg-primary/20 transition-all duration-700'></div>
          <div className='relative h-full min-h-[400px] bg-gradient-to-br from-indigo-500 to-primary rounded-[3rem] overflow-hidden flex flex-col items-center justify-center text-white p-12 text-center space-y-6'>
             <div className='w-24 h-24 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center animate-pulse'>
                <Mail size={40} />
             </div>
             <div className='space-y-2'>
                <p className='text-3xl font-black'>Drop us a message</p>
                <p className='text-white/70 font-medium'>Our patient care team typically responds within 2 business hours.</p>
             </div>
             <div className='pt-8 grid grid-cols-2 gap-4 w-full'>
                <div className='bg-white/10 p-4 rounded-2xl'>
                    <p className='text-xl font-bold'>99.9%</p>
                    <p className='text-[10px] uppercase font-bold tracking-tighter'>Support Satisfaction</p>
                </div>
                <div className='bg-white/10 p-4 rounded-2xl'>
                    <p className='text-xl font-bold'>&lt; 2hr</p>
                    <p className='text-[10px] uppercase font-bold tracking-tighter'>Response Time</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
