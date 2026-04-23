import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Droplet, Search, ShieldCheck, MapPin, Phone, Heart } from 'lucide-react';

const BloodHub = () => {
    const { token, backendUrl, userData } = useContext(AppContext);
    
    const [activeTab, setActiveTab] = useState('find'); // 'find' or 'donate'
    const [donors, setDonors] = useState([]);
    const [loading, setLoading] = useState(false);
    
    // Search filters
    const [searchBlood, setSearchBlood] = useState('');
    const [searchCity, setSearchCity] = useState('');
    
    // Donor form
    const [donorName, setDonorName] = useState(userData?.name || '');
    const [donorBlood, setDonorBlood] = useState('A+');
    const [donorCity, setDonorCity] = useState('');
    const [donorPhone, setDonorPhone] = useState(userData?.phone || '');
    const [myStatus, setMyStatus] = useState(null);

    const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

    useEffect(() => {
        if (userData) {
            setDonorName(userData.name);
            setDonorPhone(userData.phone);
        }
    }, [userData]);

    useEffect(() => {
        fetchDonors();
        if (token) checkMyStatus();
    }, [token]);

    const fetchDonors = async () => {
        try {
            setLoading(true);
            let url = `${backendUrl}/api/user/blood-donors?`;
            if (searchBlood) url += `bloodGroup=${encodeURIComponent(searchBlood)}&`;
            if (searchCity) url += `city=${encodeURIComponent(searchCity)}`;
            
            const { data } = await axios.get(url);
            if (data.success) {
                setDonors(data.donors);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const checkMyStatus = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/user/my-donor-status', { headers: { token } });
            if (data.success && data.donor) {
                setMyStatus(data.donor);
                setDonorBlood(data.donor.bloodGroup);
                setDonorCity(data.donor.city);
                setDonorPhone(data.donor.phone);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!token) return toast.warn("Please login to register as a donor");
        
        try {
            const payload = { name: donorName, bloodGroup: donorBlood, city: donorCity, phone: donorPhone };
            const { data } = await axios.post(backendUrl + '/api/user/register-donor', payload, { headers: { token } });
            
            if (data.success) {
                toast.success(data.message);
                checkMyStatus();
                fetchDonors();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };

    const handleToggleStatus = async () => {
        try {
            const newStatus = !myStatus.available;
            const { data } = await axios.post(backendUrl + '/api/user/toggle-donor', { available: newStatus }, { headers: { token } });
            
            if (data.success) {
                toast.success(data.message);
                setMyStatus({ ...myStatus, available: newStatus });
                fetchDonors();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-12 min-h-[75vh]">
            <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center p-4 bg-red-50 rounded-full mb-4">
                    <Heart className="text-red-500" size={40} />
                </div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Emergency Blood Hub</h1>
                <p className="text-gray-500 max-w-2xl mx-auto">Connect with voluntary blood donors in your city or register yourself to save lives during medical emergencies.</p>
            </div>

            <div className="flex justify-center mb-8">
                <div className="bg-gray-100 p-1 rounded-xl inline-flex">
                    <button 
                        onClick={() => setActiveTab('find')}
                        className={`px-6 py-2.5 rounded-lg font-medium transition-all ${activeTab === 'find' ? 'bg-white text-red-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
                    >
                        Find Blood
                    </button>
                    <button 
                        onClick={() => setActiveTab('donate')}
                        className={`px-6 py-2.5 rounded-lg font-medium transition-all ${activeTab === 'donate' ? 'bg-white text-red-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
                    >
                        Register as Donor
                    </button>
                </div>
            </div>

            {activeTab === 'find' && (
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-end">
                        <div className="flex-1 w-full">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Blood Group</label>
                            <select value={searchBlood} onChange={(e) => setSearchBlood(e.target.value)} className="w-full border-gray-300 rounded-lg shadow-sm p-2.5 border focus:ring-red-500 focus:border-red-500 outline-none bg-gray-50">
                                <option value="">Any Blood Group</option>
                                {bloodGroups.map(bg => <option key={bg} value={bg}>{bg}</option>)}
                            </select>
                        </div>
                        <div className="flex-1 w-full">
                            <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                            <input type="text" value={searchCity} onChange={(e) => setSearchCity(e.target.value)} placeholder="e.g. Mumbai" className="w-full border-gray-300 rounded-lg shadow-sm p-2.5 border focus:ring-red-500 focus:border-red-500 outline-none bg-gray-50" />
                        </div>
                        <button onClick={fetchDonors} disabled={loading} className="w-full md:w-auto bg-red-600 text-white px-8 py-2.5 rounded-lg font-semibold hover:bg-red-700 transition flex items-center justify-center gap-2">
                            <Search size={18} /> Search
                        </button>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {loading ? (
                            <p className="text-gray-500 col-span-full text-center">Searching donors...</p>
                        ) : donors.length === 0 ? (
                            <div className="col-span-full bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
                                <Droplet className="mx-auto text-gray-300 mb-3" size={40} />
                                <h3 className="text-lg font-semibold text-gray-800">No Donors Found</h3>
                                <p className="text-gray-500">Try adjusting your filters or search in a different city.</p>
                            </div>
                        ) : (
                            donors.map((donor, idx) => (
                                <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group hover:border-red-200 transition-all">
                                    <div className="absolute top-0 right-0 bg-red-50 text-red-600 font-bold px-4 py-2 rounded-bl-2xl">
                                        {donor.bloodGroup}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 pr-12">{donor.name}</h3>
                                    <div className="mt-4 space-y-2">
                                        <p className="flex items-center gap-2 text-gray-600 text-sm"><MapPin size={16} className="text-gray-400" /> {donor.city}</p>
                                        <p className="flex items-center gap-2 text-gray-600 text-sm"><Phone size={16} className="text-gray-400" /> {donor.phone}</p>
                                    </div>
                                    <a href={`tel:${donor.phone}`} className="mt-6 block w-full bg-red-50 text-red-600 text-center py-2 rounded-lg font-semibold hover:bg-red-600 hover:text-white transition-all">
                                        Call Donor
                                    </a>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}

            {activeTab === 'donate' && (
                <div className="max-w-2xl mx-auto">
                    {myStatus ? (
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
                            <div className="inline-flex p-3 bg-green-50 text-green-500 rounded-full mb-4">
                                <ShieldCheck size={40} />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">You are a Registered Donor!</h2>
                            <p className="text-gray-500 mb-6">Thank you for being a lifesaver. Your generous profile is visible to patients in need in {myStatus.city}.</p>
                            
                            <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-xl mb-6 text-left">
                                <div>
                                    <p className="font-semibold text-gray-800">Donor Visibility</p>
                                    <p className="text-sm text-gray-500">Temporarily hide your profile if you cannot donate right now.</p>
                                </div>
                                <button 
                                    onClick={handleToggleStatus}
                                    className={`px-4 py-2 rounded-lg font-bold transition-all ${myStatus.available ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}
                                >
                                    {myStatus.available ? 'Active' : 'Hidden'}
                                </button>
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={handleRegister} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-5">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Become a hero today.</h2>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <input type="text" required value={donorName} onChange={e => setDonorName(e.target.value)} className="w-full border-gray-300 rounded-lg p-3 bg-gray-50 focus:ring-red-500 outline-none border" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Blood Group</label>
                                    <select required value={donorBlood} onChange={e => setDonorBlood(e.target.value)} className="w-full border-gray-300 rounded-lg p-3 bg-gray-50 focus:ring-red-500 outline-none border">
                                        {bloodGroups.map(bg => <option key={bg} value={bg}>{bg}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                    <input type="text" required value={donorCity} onChange={e => setDonorCity(e.target.value)} placeholder="e.g. Pune" className="w-full border-gray-300 rounded-lg p-3 bg-gray-50 focus:ring-red-500 outline-none border" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number (Public)</label>
                                <input type="tel" required value={donorPhone} onChange={e => setDonorPhone(e.target.value)} className="w-full border-gray-300 rounded-lg p-3 bg-gray-50 focus:ring-red-500 outline-none border" />
                            </div>
                            
                            <button type="submit" className="w-full bg-red-600 text-white font-bold py-3 rounded-xl hover:bg-red-700 transition shadow-lg shadow-red-600/20 mt-6">
                                Register and Save Lives
                            </button>
                            <p className="text-xs text-gray-400 text-center mt-4">By registering, you agree to make your phone number visible to users searching for blood in an emergency.</p>
                        </form>
                    )}
                </div>
            )}
        </div>
    );
};

export default BloodHub;
