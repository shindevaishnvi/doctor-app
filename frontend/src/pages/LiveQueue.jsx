import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const LiveQueue = () => {
    const { token, backendUrl } = useContext(AppContext);
    const [queueData, setQueueData] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchLiveQueue = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(backendUrl + '/api/user/live-queue', { headers: { token } });
            if (data.success) {
                setQueueData(data.liveQueueData);
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

    useEffect(() => {
        if (token) {
            fetchLiveQueue();
            const interval = setInterval(() => {
                fetchLiveQueue();
            }, 10000); // refresh every 10 seconds
            return () => clearInterval(interval);
        }
    }, [token]);

    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 min-h-[60vh]">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Live Appointment Queue</h1>
                <button onClick={fetchLiveQueue} className="bg-primary text-white px-4 py-2 rounded-md hover:bg-opacity-90">Refresh</button>
            </div>
            
            {loading ? (
                <p className="text-gray-500 text-center mt-10">Loading queue status...</p>
            ) : queueData.length === 0 ? (
                <div className="bg-white p-8 rounded-lg shadow text-center">
                    <p className="text-gray-600 text-lg">No active appointments found in the queue.</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {queueData.map((item, index) => (
                        <div key={index} className="bg-white p-6 rounded-lg shadow-md border-l-4 border-primary">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                <div className="flex items-center gap-4">
                                    <img className="w-16 h-16 rounded-full object-cover" src={item.appointment.docData.image} alt={item.appointment.docData.name} />
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-800">{item.appointment.docData.name}</h2>
                                        <p className="text-sm text-gray-500">Date: {item.appointment.slotDate} | Time: {item.appointment.slotTime}</p>
                                        <p className="text-sm font-medium text-gray-600 mt-1">{item.appointment.docData.speciality}</p>
                                    </div>
                                </div>
                                <div className="text-center bg-gray-50 p-4 rounded-lg w-full md:w-auto min-w-[150px]">
                                    <p className="text-sm text-gray-500 uppercase tracking-widest font-semibold">Your Position</p>
                                    <h3 className={`text-4xl font-black mt-1 ${item.position === 1 ? 'text-green-500' : 'text-primary'}`}>#{item.position}</h3>
                                    <p className="text-xs text-gray-500 mt-1">out of {item.totalPending} pending</p>
                                </div>
                            </div>
                            
                            {item.position === 1 && (
                                <div className="mt-4 bg-green-50 text-green-700 p-3 rounded text-center text-sm font-semibold">
                                    You're next in line! Please prepare for your consultation.
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LiveQueue;
