import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { User, Mail, Lock, ArrowRight, Sparkles } from 'lucide-react'

const Login = () => {
    const [state, setState] = useState('Sign Up')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()
    const { backendUrl, token, setToken } = useContext(AppContext)

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        setLoading(true)

        try {
            if (state === 'Sign Up') {
                const { data } = await axios.post(backendUrl + '/api/user/register', { name, email, password })
                if (data.success) {
                    localStorage.setItem('token', data.token)
                    setToken(data.token)
                    toast.success('Account created successfully!')
                } else {
                    toast.error(data.message)
                }
            } else {
                const { data } = await axios.post(backendUrl + '/api/user/login', { email, password })
                if (data.success) {
                    localStorage.setItem('token', data.token)
                    setToken(data.token)
                    toast.success('Welcome back!')
                } else {
                    toast.error(data.message)
                }
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message || error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (token) {
            navigate('/')
        }
    }, [token])

    return (
        <div className='min-h-[80vh] flex items-center justify-center px-4 py-20'>
            <div className='relative w-full max-w-md'>
                {/* Decorative Background */}
                <div className='absolute -top-20 -left-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl animate-pulse'></div>
                <div className='absolute -bottom-20 -right-20 w-40 h-40 bg-secondary/20 rounded-full blur-3xl animate-pulse' style={{animationDelay: '1s'}}></div>

                <form onSubmit={onSubmitHandler} className='glass-card p-10 rounded-[2.5rem] shadow-2xl relative z-10 border border-white/50 space-y-8'>
                    <div className='text-center space-y-2'>
                        <div className='inline-flex items-center gap-2 bg-primary/5 text-primary text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-4'>
                            <Sparkles size={12} /> {state === 'Sign Up' ? 'Join our community' : 'Welcome back'}
                        </div>
                        <h2 className='text-3xl font-bold text-gray-900'>{state === 'Sign Up' ? 'Create Account' : 'Login Now'}</h2>
                        <p className='text-gray-500 font-medium'>Experience premium healthcare access.</p>
                    </div>

                    <div className='space-y-5'>
                        {state === 'Sign Up' && (
                            <div className='space-y-2'>
                                <label className='text-xs font-bold text-gray-400 uppercase tracking-widest ml-1'>Full Name</label>
                                <div className='relative group'>
                                    <User className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors' size={18} />
                                    <input 
                                        onChange={(e) => setName(e.target.value)} 
                                        value={name} 
                                        className='w-full bg-gray-50/50 border border-gray-100 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-primary/30 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all font-medium' 
                                        type="text" 
                                        placeholder="Enter your name"
                                        required 
                                    />
                                </div>
                            </div>
                        )}

                        <div className='space-y-2'>
                            <label className='text-xs font-bold text-gray-400 uppercase tracking-widest ml-1'>Email Address</label>
                            <div className='relative group'>
                                <Mail className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors' size={18} />
                                <input 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    value={email} 
                                    className='w-full bg-gray-50/50 border border-gray-100 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-primary/30 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all font-medium' 
                                    type="email" 
                                    placeholder="your@email.com"
                                    required 
                                />
                            </div>
                        </div>

                        <div className='space-y-2'>
                            <label className='text-xs font-bold text-gray-400 uppercase tracking-widest ml-1'>Password</label>
                            <div className='relative group'>
                                <Lock className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors' size={18} />
                                <input 
                                    onChange={(e) => setPassword(e.target.value)} 
                                    value={password} 
                                    className='w-full bg-gray-50/50 border border-gray-100 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-primary/30 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all font-medium' 
                                    type="password" 
                                    placeholder="••••••••"
                                    required 
                                />
                            </div>
                        </div>
                    </div>

                    <button 
                        disabled={loading}
                        className='w-full btn-premium py-4 rounded-2xl flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50 disabled:active:scale-100 transition-all font-bold text-lg'
                    >
                        {loading ? 'Processing...' : (state === 'Sign Up' ? 'Create Account' : 'Login')}
                        {!loading && <ArrowRight size={20} />}
                    </button>

                    <div className='text-center pt-4'>
                        {state === 'Sign Up'
                            ? <p className='text-gray-500 font-medium'>Already have an account? <span onClick={() => { setState('Login'); setName(''); setEmail(''); setPassword(''); }} className='text-primary font-bold cursor-pointer hover:underline'>Login here</span></p>
                            : <p className='text-gray-500 font-medium'>New to QuickCare? <span onClick={() => { setState('Sign Up'); setName(''); setEmail(''); setPassword(''); }} className='text-primary font-bold cursor-pointer hover:underline'>Register here</span></p>
                        }
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
