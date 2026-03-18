import React, { useContext, useState } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { toast } from 'react-toastify'
import axios from 'axios'
import { Upload } from 'lucide-react'

const AddDoctor = () => {
    const [docImg, setDocImg] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [experience, setExperience] = useState('1 Year')
    const [fees, setFees] = useState('')
    const [about, setAbout] = useState('')
    const [specialization, setSpecialization] = useState('General physician')
    const [degree, setDegree] = useState('')
    const [address1, setAddress1] = useState('')
    const [address2, setAddress2] = useState('')

    const { backendUrl, aToken } = useContext(AdminContext)

    const onSubmitHandler = async (event) => {
        event.preventDefault()

        try {
            if (!docImg) {
                return toast.error('Image Not Selected')
            }

            const formData = new FormData()
            formData.append('image', docImg)
            formData.append('name', name)
            formData.append('email', email)
            formData.append('password', password)
            formData.append('experience', experience)
            formData.append('fees', Number(fees))
            formData.append('about', about)
            formData.append('specialization', specialization)
            formData.append('degree', degree)
            formData.append('address', JSON.stringify({ line1: address1, line2: address2 }))

            const { data } = await axios.post(backendUrl + '/api/admin/add-doctor', formData, { headers: { aToken } })

            if (data.success) {
                toast.success(data.message)
                setName('')
                setEmail('')
                setPassword('')
                setDocImg(false)
                setAbout('')
                setDegree('')
                setFees('')
                setAddress1('')
                setAddress2('')
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <form onSubmit={onSubmitHandler} className='m-8 w-full max-w-5xl'>
            <div className='flex flex-col gap-2 mb-8'>
                <h1 className='text-3xl font-bold text-gray-900 tracking-tight'>Enroll <span className='text-primary'>New Specialist</span></h1>
                <p className='text-gray-500 font-medium'>Add a new medical professional to the QuickCare directory.</p>
            </div>

            <div className='glass-card p-10 rounded-[2.5rem] shadow-2xl relative border border-white/50'>
                <div className='flex items-center gap-6 mb-10'>
                    <label htmlFor="doc-img" className='relative group cursor-pointer'>
                        <div className='w-24 h-24 bg-gray-50 rounded-3xl flex items-center justify-center border-2 border-dashed border-gray-200 group-hover:border-primary group-hover:bg-primary/5 transition-all overflow-hidden shadow-inner'>
                            {docImg ? <img className='w-full h-full object-cover' src={URL.createObjectURL(docImg)} alt="" /> : <Upload className='text-gray-400 group-hover:text-primary transition-colors' size={32} />}
                        </div>
                        <div className='absolute -bottom-2 -right-2 bg-primary text-white p-1.5 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity'>
                            <Upload size={14} />
                        </div>
                    </label>
                    <input onChange={(e) => setDocImg(e.target.files[0])} type="file" id="doc-img" hidden />
                    <div>
                        <p className='text-lg font-bold text-gray-900'>Profile Photo</p>
                        <p className='text-sm text-gray-400 font-medium'>Recommended: 400x400px, PNG or JPG</p>
                    </div>
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8'>
                    <div className='space-y-6'>
                        <div className='space-y-2'>
                            <label className='text-xs font-bold text-gray-400 uppercase tracking-widest ml-1'>Doctor Full Name</label>
                            <input onChange={(e) => setName(e.target.value)} value={name} className='w-full bg-gray-50/50 border border-gray-100 rounded-2xl py-4 px-6 outline-none focus:border-primary/30 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all font-medium placeholder:text-gray-300' type="text" placeholder='Dr. Alexander Pierce' required />
                        </div>
                        
                        <div className='space-y-2'>
                            <label className='text-xs font-bold text-gray-400 uppercase tracking-widest ml-1'>Contact Email</label>
                            <input onChange={(e) => setEmail(e.target.value)} value={email} className='w-full bg-gray-50/50 border border-gray-100 rounded-2xl py-4 px-6 outline-none focus:border-primary/30 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all font-medium placeholder:text-gray-300' type="email" placeholder='doctor@quickcare.com' required />
                        </div>

                        <div className='space-y-2'>
                            <label className='text-xs font-bold text-gray-400 uppercase tracking-widest ml-1'>System Password</label>
                            <input onChange={(e) => setPassword(e.target.value)} value={password} className='w-full bg-gray-50/50 border border-gray-100 rounded-2xl py-4 px-6 outline-none focus:border-primary/30 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all font-medium placeholder:text-gray-300' type="password" placeholder='Minimum 8 characters' required />
                        </div>

                        <div className='grid grid-cols-2 gap-4'>
                            <div className='space-y-2'>
                                <label className='text-xs font-bold text-gray-400 uppercase tracking-widest ml-1'>Experience</label>
                                <select onChange={(e) => setExperience(e.target.value)} value={experience} className='w-full bg-gray-50/50 border border-gray-100 rounded-2xl py-4 px-6 outline-none focus:border-primary/30 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all font-medium'>
                                    {[...Array(10)].map((_, i) => (
                                        <option key={i} value={`${i + 1} Year`}>{i + 1} Year{i > 0 && 's'}</option>
                                    ))}
                                    <option value="15+ Years">15+ Years</option>
                                </select>
                            </div>
                            <div className='space-y-2'>
                                <label className='text-xs font-bold text-gray-400 uppercase tracking-widest ml-1'>Consultation Fee</label>
                                <div className='relative'>
                                    <span className='absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 font-bold'>$</span>
                                    <input onChange={(e) => setFees(e.target.value)} value={fees} className='w-full bg-gray-50/50 border border-gray-100 rounded-2xl py-4 pl-10 pr-6 outline-none focus:border-primary/30 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all font-medium placeholder:text-gray-300' type="number" placeholder='50' required />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='space-y-6'>
                        <div className='space-y-2'>
                            <label className='text-xs font-bold text-gray-400 uppercase tracking-widest ml-1'>Medical Specialization</label>
                            <select onChange={(e) => setSpecialization(e.target.value)} value={specialization} className='w-full bg-gray-50/50 border border-gray-100 rounded-2xl py-4 px-6 outline-none focus:border-primary/30 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all font-medium'>
                                <option value="General physician">General physician</option>
                                <option value="Gynecologist">Gynecologist</option>
                                <option value="Dermatologist">Dermatologist</option>
                                <option value="Pediatricians">Pediatricians</option>
                                <option value="Neurologist">Neurologist</option>
                                <option value="Gastroenterologist">Gastroenterologist</option>
                            </select>
                        </div>

                        <div className='space-y-2'>
                            <label className='text-xs font-bold text-gray-400 uppercase tracking-widest ml-1'>Academic Degree</label>
                            <input onChange={(e) => setDegree(e.target.value)} value={degree} className='w-full bg-gray-50/50 border border-gray-100 rounded-2xl py-4 px-6 outline-none focus:border-primary/30 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all font-medium placeholder:text-gray-300' type="text" placeholder='MBBS, MD, PhD' required />
                        </div>

                        <div className='space-y-3'>
                            <label className='text-xs font-bold text-gray-400 uppercase tracking-widest ml-1'>Clinic Address</label>
                            <input onChange={(e) => setAddress1(e.target.value)} value={address1} className='w-full bg-gray-50/50 border border-gray-100 rounded-2xl py-4 px-6 outline-none focus:border-primary/30 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all font-medium placeholder:text-gray-300' type="text" placeholder='Street Address / Floor' required />
                            <input onChange={(e) => setAddress2(e.target.value)} value={address2} className='w-full bg-gray-50/50 border border-gray-100 rounded-2xl py-4 px-6 outline-none focus:border-primary/30 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all font-medium placeholder:text-gray-300' type="text" placeholder='City, State, Zip' required />
                        </div>
                    </div>
                </div>

                <div className='mt-8 space-y-2'>
                    <label className='text-xs font-bold text-gray-400 uppercase tracking-widest ml-1'>Professional Biography</label>
                    <textarea onChange={(e) => setAbout(e.target.value)} value={about} className='w-full bg-gray-50/50 border border-gray-100 rounded-[2rem] py-5 px-8 outline-none focus:border-primary/30 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all font-medium placeholder:text-gray-300 resize-none' placeholder='Brief introduction about doctor...' rows={5} required />
                </div>

                <div className='mt-10 pt-8 border-t border-gray-50 flex items-center justify-end'>
                    <button type='submit' className='btn-premium !rounded-2xl !py-4 px-12 group shadow-xl shadow-primary/10'>
                        Confirm Enrollment
                        <Upload size={18} className='ml-3 group-hover:-translate-y-1 transition-transform' />
                    </button>
                </div>
            </div>
        </form>
    )
}

export default AddDoctor
