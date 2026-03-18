import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { User, Camera } from 'lucide-react'

const MyProfile = () => {

    const [isEdit, setIsEdit] = useState(false)
    const [image, setImage] = useState(false)

    const { token, backendUrl, userData, setUserData, loadUserProfileData } = useContext(AppContext)

    const updateUserProfileData = async () => {

        try {

            const formData = new FormData();

            formData.append('name', userData.name)
            formData.append('phone', userData.phone)
            formData.append('address', JSON.stringify(userData.address))
            formData.append('gender', userData.gender)
            formData.append('dob', userData.dob)

            image && formData.append('image', image)

            const { data } = await axios.post(backendUrl + '/api/user/update-profile', formData, { headers: { token } })

            if (data.success) {
                toast.success(data.message)
                await loadUserProfileData()
                setIsEdit(false)
                setImage(false)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }

    }

    return userData && (
        <div className='max-w-4xl mx-auto py-12 px-4'>
            <div className='flex flex-col gap-2 mb-8'>
                <h1 className='text-3xl font-bold text-gray-900 tracking-tight'>Account <span className='text-primary'>Settings</span></h1>
                <p className='text-gray-500 font-medium'>Manage your personal information and security preferences.</p>
            </div>

            <div className='glass-card p-10 rounded-[2.5rem] shadow-2xl border border-white/50 space-y-12'>
                {/* Profile Header Section */}
                <div className='flex flex-col md:flex-row items-center gap-8'>
                    <div className='relative group'>
                        {isEdit ? (
                            <label htmlFor="image" className='cursor-pointer'>
                                <div className='w-40 h-40 rounded-[2.5rem] overflow-hidden relative border-4 border-white shadow-xl'>
                                    <img className='w-full h-full object-cover transition-all group-hover:scale-110 opacity-75' src={image ? URL.createObjectURL(image) : (userData.image || 'https://img.freepik.com/free-vector/user-blue-gradient_78370-4692.jpg')} alt="" />
                                    <div className='absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'>
                                        <Camera className='text-white' size={32} />
                                    </div>
                                </div>
                                <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
                            </label>
                        ) : (
                            <div className='w-40 h-40 rounded-[2.5rem] overflow-hidden border-4 border-white shadow-xl bg-gray-50'>
                                <img className='w-full h-full object-cover' src={userData.image || 'https://img.freepik.com/free-vector/user-blue-gradient_78370-4692.jpg'} alt="" />
                            </div>
                        )}
                        <div className='absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-4 border-white shadow-lg'></div>
                    </div>

                    <div className='flex-1 text-center md:text-left space-y-4'>
                        {isEdit ? (
                            <input 
                                className='bg-white/50 border border-gray-200 text-4xl font-black text-gray-900 px-4 py-2 rounded-2xl w-full max-w-md focus:ring-4 focus:ring-primary/5 outline-none transition-all' 
                                type='text' 
                                onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))} 
                                value={userData.name} 
                            />
                        ) : (
                            <h2 className='text-4xl font-black text-gray-900 tracking-tight'>{userData.name}</h2>
                        )}
                        <div className='flex flex-wrap justify-center md:justify-start items-center gap-3'>
                            <span className='px-4 py-1.5 bg-primary/10 text-primary text-xs font-black uppercase tracking-widest rounded-full'>Verified Patient</span>
                            <span className='px-4 py-1.5 bg-gray-100 text-gray-500 text-xs font-bold rounded-full border border-gray-200'>{userData.email}</span>
                        </div>
                    </div>

                    <div className='md:ml-auto'>
                        {isEdit ? (
                            <button onClick={updateUserProfileData} className='btn-premium !rounded-2xl !py-4 px-10 shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 flex items-center gap-3 group'>
                                Save Changes
                            </button>
                        ) : (
                            <button onClick={() => setIsEdit(true)} className='bg-white text-gray-900 font-bold border border-gray-200 px-10 py-4 rounded-2xl shadow-sm hover:shadow-md hover:bg-gray-50 transition-all active:scale-95'>
                                Edit Profile
                            </button>
                        )}
                    </div>
                </div>

                {/* Information Sections */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
                    {/* Contact Info */}
                    <div className='space-y-6'>
                        <div className='flex items-center gap-3 border-b border-gray-100 pb-4'>
                            <div className='w-1 h-6 bg-primary rounded-full'></div>
                            <h3 className='text-lg font-black text-gray-900 uppercase tracking-widest'>Contact Details</h3>
                        </div>
                        
                        <div className='space-y-5'>
                            <div className='space-y-2'>
                                <label className='text-[10px] font-bold text-gray-400 uppercase tracking-tighter ml-1'>Phone Number</label>
                                {isEdit ? (
                                    <input className='w-full bg-white/50 border border-gray-200 rounded-2xl py-3 px-5 text-sm font-bold focus:ring-4 focus:ring-primary/5 transition-all' type='text' onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))} value={userData.phone} />
                                ) : (
                                    <p className='text-sm font-bold text-primary bg-primary/5 py-3 px-5 rounded-2xl border border-primary/10 w-fit'>{userData.phone || 'Not Provided'}</p>
                                )}
                            </div>

                            <div className='space-y-2'>
                                <label className='text-[10px] font-bold text-gray-400 uppercase tracking-tighter ml-1'>Postal Address</label>
                                {isEdit ? (
                                    <div className='space-y-2'>
                                        <input className='w-full bg-white/50 border border-gray-200 rounded-2xl py-3 px-5 text-sm font-medium focus:ring-4 focus:ring-primary/5 transition-all' type='text' onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={userData.address.line1} placeholder="Address Line 1" />
                                        <input className='w-full bg-white/50 border border-gray-200 rounded-2xl py-3 px-5 text-sm font-medium focus:ring-4 focus:ring-primary/5 transition-all' type='text' onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={userData.address.line2} placeholder="Address Line 2" />
                                    </div>
                                ) : (
                                    <div className='bg-gray-50/50 p-5 rounded-2xl border border-gray-100'>
                                        <p className='text-sm text-gray-700 font-bold'>{userData.address.line1}</p>
                                        <p className='text-xs text-gray-400 font-medium mt-1'>{userData.address.line2}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Basic Info */}
                    <div className='space-y-6'>
                        <div className='flex items-center gap-3 border-b border-gray-100 pb-4'>
                            <div className='w-1 h-6 bg-secondary rounded-full'></div>
                            <h3 className='text-lg font-black text-gray-900 uppercase tracking-widest'>Personal Bio</h3>
                        </div>

                        <div className='space-y-5'>
                            <div className='space-y-2'>
                                <label className='text-[10px] font-bold text-gray-400 uppercase tracking-tighter ml-1'>Gender Identity</label>
                                {isEdit ? (
                                    <select className='w-full bg-white/50 border border-gray-200 rounded-2xl py-3 px-5 text-sm font-bold focus:ring-4 focus:ring-primary/5 transition-all outline-none' onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))} value={userData.gender}>
                                        <option value="Not Selected">Not Selected</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                ) : (
                                    <p className='text-sm font-bold text-gray-700 bg-gray-50 py-3 px-5 rounded-2xl border border-gray-100 w-fit'>{userData.gender}</p>
                                )}
                            </div>

                            <div className='space-y-2'>
                                <label className='text-[10px] font-bold text-gray-400 uppercase tracking-tighter ml-1'>Date of Birth</label>
                                {isEdit ? (
                                    <input className='w-full bg-white/50 border border-gray-200 rounded-2xl py-3 px-5 text-sm font-bold focus:ring-4 focus:ring-primary/5 transition-all' type='date' onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))} value={userData.dob} />
                                ) : (
                                    <p className='text-sm font-bold text-gray-700 bg-gray-50 py-3 px-5 rounded-2xl border border-gray-100 w-fit'>{userData.dob || 'Not Provided'}</p>
                                )}
                            </div>

                            <div className='p-6 bg-indigo-50/50 rounded-3xl border border-indigo-100 border-dashed mt-4'>
                                <p className='text-xs text-indigo-400 font-bold uppercase tracking-widest mb-2'>Health Tip</p>
                                <p className='text-indigo-900/70 text-sm font-medium leading-relaxed italic'> Keep your profile up to date to help our specialists provide the most accurate medical guidance during your sessions.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyProfile
