import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate, useParams } from 'react-router-dom'

const Doctors = () => {

  const { speciality } = useParams()

  const [filterDoc, setFilterDoc] = useState([])
  const [showFilter, setShowFilter] = useState(false)
  const navigate = useNavigate()

  const { doctors } = useContext(AppContext)

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => (doc.speciality || doc.specialization) === speciality))
    } else {
      setFilterDoc(doctors)
    }
  }

  useEffect(() => {
    applyFilter()
  }, [doctors, speciality])

  return (
    <div className='py-8'>
      <div className='flex flex-col gap-2 mb-10'>
          <h1 className='text-3xl font-bold text-gray-900 tracking-tight'>Medical <span className='text-primary'>Directory</span></h1>
          <p className='text-gray-500 font-medium'>Browse through our world-class specialists by department.</p>
      </div>

      <div className='flex flex-col lg:flex-row items-start gap-10 mt-5'>
        {/* Filters Sidebar */}
        <div className='w-full lg:w-72 shrink-0 space-y-4'>
           <div className='flex items-center justify-between lg:mb-6'>
              <h3 className='text-xs font-black text-gray-400 uppercase tracking-widest'>Department filters</h3>
              <button 
                onClick={() => setShowFilter(!showFilter)} 
                className={`lg:hidden px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs font-bold transition-all ${showFilter ? 'bg-primary text-white border-primary' : 'text-gray-600'}`}
              >
                {showFilter ? 'Close Filters' : 'Show Filters'}
              </button>
           </div>
           
           <div className={`space-y-3 transition-all duration-300 ${showFilter ? 'block' : 'hidden lg:block'}`}>
              {[
                'General physician', 'Gynecologist', 'Dermatologist', 
                'Pediatricians', 'Neurologist', 'Gastroenterologist'
              ].map((spec) => (
                <div 
                  key={spec}
                  onClick={() => speciality === spec ? navigate('/doctors') : navigate(`/doctors/${spec}`)}
                  className={`px-6 py-4 rounded-2xl border cursor-pointer transition-all duration-300 font-bold text-sm flex items-center justify-between group ${speciality === spec ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' : 'bg-white text-gray-600 border-gray-100 hover:border-primary/30 hover:bg-primary/5'}`}
                >
                  {spec}
                  <div className={`w-1.5 h-1.5 rounded-full transition-all ${speciality === spec ? 'bg-white scale-150' : 'bg-gray-200 group-hover:bg-primary'}`}></div>
                </div>
              ))}
              {speciality && (
                <button 
                  onClick={() => navigate('/doctors')}
                  className='w-full py-4 text-xs font-black text-primary uppercase tracking-widest hover:underline'
                >
                  Clear All Filters
                </button>
              )}
           </div>
        </div>

        {/* Doctors Grid */}
        <div className='flex-1 w-full'>
          <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8'>
            {filterDoc.map((item, index) => (
              <div 
                key={index}
                onClick={() => { navigate(`/appointment/${item._id}`); window.scrollTo(0, 0) }} 
                className='glass-card rounded-[2.5rem] overflow-hidden cursor-pointer group hover:-translate-y-2 transition-all duration-500 premium-shadow border border-white/50 flex flex-col h-full'
              >
                <div className='relative overflow-hidden aspect-[4/5] bg-indigo-50'>
                  <img className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-700' src={item.image} alt={item.name} />
                  <div className='absolute top-4 left-4'>
                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl backdrop-blur-md border ${item.available ? 'bg-green-500/10 border-green-500/20 text-green-600' : 'bg-red-500/10 border-red-500/20 text-red-600'} text-[10px] font-black uppercase tracking-wider`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${item.available ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
                        {item.available ? 'Accepting Patients' : 'Fully Booked'}
                    </div>
                  </div>
                </div>

                <div className='p-8 flex flex-col flex-1'>
                  <p className='text-primary font-bold text-xs uppercase tracking-widest mb-2'>{item.speciality || item.specialization}</p>
                  <h3 className='text-gray-900 text-xl font-black mb-4 group-hover:text-primary transition-colors'>{item.name}</h3>
                  
                  <div className='mt-auto pt-6 border-t border-gray-50 flex items-center justify-between'>
                    <div className='bg-gray-50 px-4 py-2 rounded-xl'>
                       <p className='text-[10px] text-gray-400 font-bold uppercase'>Consultation</p>
                       <p className='text-sm font-black text-gray-950'>$ {item.fees}</p>
                    </div>
                    <div className='w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0'>
                       <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filterDoc.length === 0 && (
            <div className='glass-card rounded-[3rem] p-20 text-center space-y-6'>
                <div className='w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-300'>
                   <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                </div>
                <div className='space-y-2'>
                  <h3 className='text-2xl font-black text-gray-900'>No Specialists Found</h3>
                  <p className='text-gray-500 font-medium max-w-sm mx-auto'>We couldn't find any doctors matching the selected department at this moment.</p>
                </div>
                <button onClick={() => navigate('/doctors')} className='btn-premium'>Browse All Experts</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Doctors
