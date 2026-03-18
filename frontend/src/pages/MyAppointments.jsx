import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { CreditCard, X } from 'lucide-react'

const MyAppointments = () => {

    const { backendUrl, token, getDoctorsData } = useContext(AppContext)
    const [appointments, setAppointments] = useState([])
    const navigate = useNavigate()

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const slotDateFormat = (slotDate) => {
        const dateArray = slotDate.split('_')
        return dateArray[0] + " " + months[Number(dateArray[1]) - 1] + " " + dateArray[2]
    }

    const getUserAppointments = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } })
            if (data.success) {
                setAppointments(data.appointments.reverse())
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment', { appointmentId }, { headers: { token } })

            if (data.success) {
                toast.success(data.message)
                getUserAppointments()
                getDoctorsData()
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (token) {
            getUserAppointments()
        }
    }, [token])

    return (
        <div className='max-w-5xl mx-auto py-12 px-4'>
            <div className='flex flex-col gap-2 mb-10'>
                <h1 className='text-3xl font-bold text-gray-900 tracking-tight'>Booking <span className='text-primary'>History</span></h1>
                <p className='text-gray-500 font-medium'>Manage your upcoming and past medical consultations.</p>
            </div>

            <div className='space-y-6'>
                {appointments.map((item, index) => (
                    <div key={index} className='glass-card rounded-[2.5rem] p-6 premium-shadow border border-white/50 flex flex-col md:flex-row items-center gap-8 group hover:-translate-y-1 transition-all duration-300'>
                        {/* Doctor Avatar */}
                        <div className='relative shrink-0'>
                            <div className='w-32 h-32 rounded-3xl overflow-hidden border-4 border-white shadow-lg bg-indigo-50'>
                                <img className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500' src={item.docData.image} alt="" />
                            </div>
                            <div className='absolute -top-2 -right-2 bg-white p-1.5 rounded-xl shadow-md'>
                                <div className={`w-3 h-3 rounded-full ${item.cancelled ? 'bg-red-400' : item.isCompleted ? 'bg-green-400' : 'bg-primary'}`}></div>
                            </div>
                        </div>

                        {/* Booking Details */}
                        <div className='flex-1 space-y-4 text-center md:text-left'>
                            <div>
                                <h3 className='text-xl font-black text-gray-900'>{item.docData.name}</h3>
                                <p className='text-primary text-xs font-bold uppercase tracking-widest mt-1'>{item.docData.specialization}</p>
                            </div>

                            <div className='flex flex-col md:flex-row items-center gap-6'>
                                <div className='space-y-1'>
                                    <p className='text-[10px] text-gray-400 font-bold uppercase tracking-widest'>Location</p>
                                    <p className='text-sm text-gray-600 font-medium'>{item.docData.address.line1}, {item.docData.address.line2}</p>
                                </div>
                                <div className='w-px h-8 bg-gray-100 hidden md:block'></div>
                                <div className='space-y-1'>
                                    <p className='text-[10px] text-gray-400 font-bold uppercase tracking-widest'>Schedule</p>
                                    <div className='flex items-center gap-2'>
                                        <span className='px-3 py-1 bg-white border border-gray-100 rounded-lg text-xs font-bold text-gray-700'>{slotDateFormat(item.slotDate)}</span>
                                        <span className='text-primary font-black text-xs'>{item.slotTime}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className='shrink-0 w-full md:w-auto flex flex-col gap-3'>
                            {!item.cancelled && !item.isCompleted && (
                                <>
                                    <button className='btn-premium !rounded-2xl !py-3 px-8 shadow-sm flex items-center justify-center gap-2 text-sm'>
                                        <CreditCard size={18} /> Pay Online
                                    </button>
                                    <button onClick={() => cancelAppointment(item._id)} className='bg-white text-gray-400 font-bold border border-gray-200 px-8 py-3 rounded-2xl hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all text-sm flex items-center justify-center gap-2'>
                                        <X size={18} /> Cancel
                                    </button>
                                </>
                            )}
                            {item.cancelled && !item.isCompleted && (
                                <div className='px-8 py-3 rounded-2xl bg-red-50 border border-red-100 text-red-500 text-xs font-black uppercase tracking-widest text-center'>
                                    Cancelled
                                </div>
                            )}
                            {item.isCompleted && (
                                <div className='px-8 py-3 rounded-2xl bg-green-50 border border-green-100 text-green-500 text-xs font-black uppercase tracking-widest text-center'>
                                    Session Completed
                                </div>
                            )}
                        </div>
                    </div>
                ))}

                {appointments.length === 0 && (
                    <div className='glass-card rounded-[2.5rem] p-20 text-center space-y-4'>
                        <div className='w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-300'>
                            <CreditCard size={40} />
                        </div>
                        <h3 className='text-2xl font-black text-gray-900'>No Bookings Found</h3>
                        <p className='text-gray-500 font-medium'>You haven't booked any medical sessions yet.</p>
                        <button onClick={() => navigate('/doctors')} className='btn-premium mt-6'>Explore Directory</button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default MyAppointments
