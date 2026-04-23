import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import { CheckCircle, Info } from 'lucide-react'

const Appointment = () => {

    const { docId } = useParams()
    const { doctors, currencySymbol, backendUrl, token, getDoctorsData } = useContext(AppContext)
    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

    const [docInfo, setDocInfo] = useState(false)
    const [docSlots, setDocSlots] = useState([])
    const [slotIndex, setSlotIndex] = useState(0)
    const [slotTime, setSlotTime] = useState('')

    const navigate = useNavigate()

    const fetchDocInfo = async () => {
        const docInfo = doctors.find(doc => doc._id === docId)
        setDocInfo(docInfo)
    }

    const getAvailableSlots = async () => {

        setDocSlots([])

        // getting current date
        let today = new Date()

        for (let i = 0; i < 7; i++) {

            // getting date with index 
            let currentDate = new Date(today)
            currentDate.setDate(today.getDate() + i)

            // setting end time of the date with index
            let endTime = new Date()
            endTime.setDate(today.getDate() + i)
            endTime.setHours(21, 0, 0, 0)

            // setting hours 
            if (today.getDate() === currentDate.getDate()) {
                currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
                currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
            } else {
                currentDate.setHours(10)
                currentDate.setMinutes(0)
            }

            let timeSlots = []

            while (currentDate < endTime) {
                let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

                let day = currentDate.getDate()
                let month = currentDate.getMonth() + 1
                let year = currentDate.getFullYear()

                const slotDate = day + "_" + month + "_" + year
                const slotTime = formattedTime

                const isSlotAvailable = docInfo.slots_booked?.[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime) ? false : true

                timeSlots.push({
                    datetime: new Date(currentDate),
                    time: formattedTime,
                    isAvailable: isSlotAvailable
                })

                // Increment current time by 30 minutes
                currentDate.setMinutes(currentDate.getMinutes() + 30)
            }

            setDocSlots(prev => ([...prev, timeSlots]))

        }

    }

    const bookAppointment = async () => {
        if (!token) {
            toast.warning('Login to book appointment')
            return navigate('/login')
        }

        if (!slotTime) {
            return toast.warning('Please select a time slot')
        }

        try {
            const date = docSlots[slotIndex][0].datetime

            let day = date.getDate()
            let month = date.getMonth() + 1
            let year = date.getFullYear()

            const slotDate = day + "_" + month + "_" + year

            const { data } = await axios.post(backendUrl + '/api/user/book-appointment', { docId, slotDate, slotTime }, { headers: { token } })
            if (data.success) {
                toast.success(data.message)
                getDoctorsData()
                navigate('/my-appointments')
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }

    }

    useEffect(() => {
        if (doctors.length > 0) {
            fetchDocInfo()
        }
    }, [doctors, docId])

    useEffect(() => {
        if (docInfo) {
            getAvailableSlots()
        }
    }, [docInfo])

    return docInfo ? (
        <div className='max-w-7xl mx-auto py-10 px-4'>
            {/* ---------- Doctor Details ----------- */}
            <div className='flex flex-col lg:flex-row gap-10'>
                {/* Left side image and availability card */}
                <div className='lg:w-1/3 space-y-6'>
                    <div className='glass-card rounded-[3rem] p-4 premium-shadow border border-white/50'>
                        <div className='relative overflow-hidden rounded-[2.5rem] bg-indigo-50 shadow-inner'>
                            <img className='w-full aspect-square object-cover hover:scale-105 transition-transform duration-700' src={docInfo.image} alt="" />
                        </div>
                        <div className='mt-8 px-4 pb-4 space-y-4'>
                           <div className='flex items-center justify-between'>
                              <p className='text-[10px] text-gray-400 font-black uppercase tracking-widest'>Current Status</p>
                              <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${docInfo.available ? 'bg-green-50 text-green-500' : 'bg-red-50 text-red-500'}`}>
                                {docInfo.available ? 'Available' : 'Busy Today'}
                              </span>
                           </div>
                           <div className='p-6 bg-gray-50/50 rounded-3xl border border-gray-100 italic text-gray-400 text-sm font-medium'>
                               "{docInfo.about.slice(0, 150)}..."
                           </div>
                        </div>
                    </div>
                </div>

                {/* Right side details and booking */}
                <div className='lg:w-2/3 space-y-8'>
                    <div className='glass-card rounded-[3rem] p-10 premium-shadow border border-white/50 space-y-8'>
                        <div className='space-y-4'>
                            <div className='flex items-center gap-3'>
                                <span className='px-4 py-1.5 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-full border border-primary/10'>Elite Specialist</span>
                                <div className='flex items-center gap-1 text-yellow-500 text-xs font-bold'>
                                    {[1,2,3,4,5].map(i => <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>)}
                                    <span className='ml-1 text-gray-700'>5.0 (2.5k reviews)</span>
                                </div>
                            </div>
                            
                            <div className='space-y-2'>
                                <h1 className='text-5xl font-black text-gray-950 tracking-tight flex items-center gap-4'>
                                    {docInfo.name}
                                    <CheckCircle size={32} className='text-primary' />
                                </h1>
                                <div className='flex items-center gap-3'>
                                    <p className='text-xl font-bold text-gray-500'>{docInfo.degree} - {docInfo.specialization}</p>
                                    <span className='w-1.5 h-1.5 bg-gray-200 rounded-full'></span>
                                    <p className='text-xl font-medium text-primary bg-primary/5 px-4 py-1 rounded-full border border-primary/10'>{docInfo.experience}</p>
                                </div>
                            </div>
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                            <div className='space-y-4'>
                                <h3 className='text-xs font-black text-gray-400 uppercase tracking-widest ml-1'>Why choose this specialist?</h3>
                                {[
                                    'Proven track record with 15+ years of surgery',
                                    'Pioneer in modern diagnostic techniques',
                                    'Board certified and award-winning practitioner'
                                ].map((item, i) => (
                                    <div key={i} className='flex items-center gap-3 text-sm font-bold text-gray-600'>
                                        <div className='w-2 h-2 rounded-full bg-primary'></div>
                                        {item}
                                    </div>
                                ))}
                            </div>
                            
                            <div className='glass-card p-6 rounded-[2rem] bg-gradient-to-br from-indigo-50/50 to-white flex items-center justify-between border border-indigo-100'>
                                <div className='space-y-1'>
                                    <p className='text-[10px] text-indigo-400 font-black uppercase tracking-widest'>Booking Fee</p>
                                    <p className='text-3xl font-black text-indigo-950'>{currencySymbol}{docInfo.fees}</p>
                                </div>
                                <div className='w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-indigo-500'>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/><path d="M7 15h.01"/><path d="M11 15h.01"/></svg>
                                </div>
                            </div>
                        </div>

                        <div className='pt-10 border-t border-gray-50 space-y-8'>
                             <div className='flex items-center justify-between'>
                                <h3 className='text-2xl font-black text-gray-900'>Select Time <span className='text-primary'>Slot</span></h3>
                                <p className='text-xs font-bold text-gray-400 bg-gray-50 px-3 py-1.5 rounded-xl uppercase tracking-widest'>Availability for next 7 days</p>
                             </div>

                             <div className='space-y-8'>
                                <div className='flex gap-4 items-center w-full overflow-x-auto pb-4 scrollbar-hide'>
                                    {docSlots.length > 0 && docSlots.map((item, index) => (
                                        <div 
                                            onClick={() => { setSlotIndex(index); setSlotTime('') }} 
                                            key={index} 
                                            className={`flex flex-col items-center justify-center min-w-[5.5rem] py-6 rounded-3xl cursor-pointer transition-all duration-300 ${slotIndex === index ? 'bg-primary text-white shadow-2xl shadow-primary/30 scale-105' : 'bg-white text-gray-400 hover:bg-gray-50 border border-gray-100'}`}
                                        >
                                            <p className='text-xs font-black uppercase tracking-widest opacity-60'>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                                            <p className='text-2xl font-black mt-1'>{item[0] && item[0].datetime.getDate()}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className='grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4'>
                                    {docSlots.length > 0 && docSlots[slotIndex].map((item, index) => (
                                        <div 
                                            onClick={() => item.isAvailable && setSlotTime(item.time)} 
                                            key={index} 
                                            className={`text-sm font-black py-4 rounded-2xl text-center transition-all duration-300 border ${
                                                !item.isAvailable
                                                ? 'bg-red-50 text-red-300 cursor-not-allowed border-transparent'
                                                : item.time === slotTime 
                                                    ? 'bg-indigo-950 text-white border-indigo-950 shadow-xl cursor-pointer' 
                                                    : 'bg-gray-50/50 text-gray-500 border-transparent hover:border-primary hover:text-primary hover:bg-white cursor-pointer'
                                            }`}
                                        >
                                            {item.time.toLowerCase()}
                                        </div>
                                    ))}
                                </div>
                             </div>
                        </div>

                        <div className='pt-10 flex flex-col sm:flex-row items-center justify-between gap-6'>
                            <div className='flex items-center gap-4 text-gray-400'>
                                <Info size={20} className='text-primary' />
                                <p className='text-sm font-medium'>Full refund available up to 24 hours before consultation.</p>
                            </div>
                            <button 
                                onClick={bookAppointment} 
                                disabled={!slotTime}
                                className={`btn-premium !rounded-2xl !py-5 px-16 text-lg hover:scale-105 active:scale-95 shadow-2xl shadow-primary/20 ${!slotTime ? 'opacity-30 cursor-not-allowed grayscale' : ''}`}
                            >
                                {slotTime ? `Book for ${slotTime}` : 'Select a Slot First'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : null
}

export default Appointment
