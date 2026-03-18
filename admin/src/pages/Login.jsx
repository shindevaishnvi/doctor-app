import React, { useContext, useState } from 'react'
import { AdminContext } from '../context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { DoctorContext } from '../context/DoctorContext'
import { UserCheck, Mail, Lock, ArrowRight } from 'lucide-react'

const Login = () => {
  const [state, setState] = useState('Admin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { setAToken, backendUrl } = useContext(AdminContext)
  const { setDToken } = useContext(DoctorContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    try {
      if (state === 'Admin') {
        const { data } = await axios.post(backendUrl + '/api/admin/login', { email, password })
        if (data.success) {
          localStorage.setItem('aToken', data.token)
          setAToken(data.token)
        } else {
          toast.error(data.message)
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/doctor/login', { email, password })
        if (data.success) {
          localStorage.setItem('dToken', data.token)
          setDToken(data.token)
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-[#F8F9FD] p-6'>
      {/* Decorative background elements */}
      <div className='absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none'>
        <div className='absolute top-[10%] left-[5%] w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-float'></div>
        <div className='absolute bottom-[10%] right-[5%] w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-float' style={{ animationDelay: '2s' }}></div>
      </div>

      <div className='w-full max-w-md relative'>
        <form onSubmit={onSubmitHandler} className='glass-card p-10 rounded-[2.5rem] shadow-2xl border border-white/50 space-y-8 animate-in fade-in zoom-in duration-700'>
          <div className='text-center space-y-2'>
            <div className='inline-flex p-4 rounded-ful bg-primary/10 text-primary mb-2'>
                <UserCheck size={32} />
            </div>
            <h1 className='text-3xl font-black text-gray-900 tracking-tight'>{state} <span className='text-primary'>Portal</span></h1>
            <p className='text-gray-400 font-medium text-sm uppercase tracking-widest'>Secure Access Required</p>
          </div>

          <div className='space-y-5'>
            <div className='space-y-2'>
              <label className='text-xs font-bold text-gray-400 uppercase tracking-widest ml-1'>Corporate Email</label>
              <div className='relative group'>
                <Mail className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-primary transition-colors' size={20} />
                <input 
                  onChange={(e) => setEmail(e.target.value)} 
                  value={email} 
                  className='w-full bg-gray-50/50 border border-gray-100 rounded-2xl py-4 pl-12 pr-6 outline-none focus:border-primary/30 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all font-medium' 
                  type="email" 
                  placeholder="name@quickcare.com"
                  required 
                />
              </div>
            </div>

            <div className='space-y-2'>
              <label className='text-xs font-bold text-gray-400 uppercase tracking-widest ml-1'>Password</label>
              <div className='relative group'>
                <Lock className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-primary transition-colors' size={20} />
                <input 
                  onChange={(e) => setPassword(e.target.value)} 
                  value={password} 
                  className='w-full bg-gray-50/50 border border-gray-100 rounded-2xl py-4 pl-12 pr-6 outline-none focus:border-primary/30 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all font-medium' 
                  type="password" 
                  placeholder="••••••••"
                  required 
                />
              </div>
            </div>
          </div>

          <button className='w-full btn-premium py-4 rounded-2xl flex items-center justify-center gap-3 active:scale-95 transition-all font-bold text-lg shadow-xl shadow-primary/20'>
            Authorize {state} Login
            <ArrowRight size={20} />
          </button>

          <div className='text-center pt-2'>
            {state === 'Admin'
              ? <p className='text-gray-500 font-medium'>Are you a specialist? <span onClick={() => setState('Doctor')} className='text-primary font-bold cursor-pointer hover:underline decoration-2 underline-offset-4'>Doctor Access</span></p>
              : <p className='text-gray-500 font-medium'>System administrator? <span onClick={() => setState('Admin')} className='text-primary font-bold cursor-pointer hover:underline decoration-2 underline-offset-4'>Admin Access</span></p>
            }
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
