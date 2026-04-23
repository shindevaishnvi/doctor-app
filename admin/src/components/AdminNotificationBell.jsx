import React, { useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';
import { Bell } from 'lucide-react';
import { DoctorContext } from '../context/DoctorContext';
import { AppContext } from '../context/AppContext';

const AdminNotificationBell = () => {
    const { dToken, profileData } = useContext(DoctorContext);
    const { backendUrl } = useContext(AppContext); // Check if AppContext has backendUrl in Admin
    
    // Just in case backendUrl isn't in AppContext
    const baseUrl = backendUrl || 'http://localhost:5000';

    const [notifications, setNotifications] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);

    const fetchNotifications = async () => {
        try {
            const { data } = await axios.post(baseUrl + '/api/doctor/notifications', {}, { headers: { dToken } });
            if (data.success) {
                setNotifications(data.notifications);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const markAsRead = async () => {
        try {
            const { data } = await axios.post(baseUrl + '/api/doctor/notifications/mark-read', {}, { headers: { dToken } });
            if (data.success) {
                fetchNotifications(); // Refresh list to show them as read
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (dToken) {
            // Need to pass docId for fetching in our controller design. 
            // Controllers get docId populated automatically via authDoctor middleware!
            // Wait, let's just make it a GET request if our router expects GET
            // Oh, my route says: `doctorRouter.get("/notifications", authDoctor, getNotifications);`
            // Let's modify the fetch to GET:
            const fetchNotifsGet = async () => {
                try {
                    const { data } = await axios.get(baseUrl + '/api/doctor/notifications', { headers: { dToken } });
                    if (data.success) {
                        setNotifications(data.notifications);
                    }
                } catch (error) {
                    console.log(error);
                }
            };
            fetchNotifsGet();

            const interval = setInterval(fetchNotifsGet, 30000);
            return () => clearInterval(interval);
        }
    }, [dToken, baseUrl]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const unreadCount = notifications.filter(n => !n.isRead).length;

    const handleBellClick = () => {
        setShowDropdown(!showDropdown);
        if (!showDropdown && unreadCount > 0) {
            markAsRead();
        }
    };

    if (!dToken) return null; // Show only to doctors

    return (
        <div className="relative mr-4" ref={dropdownRef}>
            <button 
                onClick={handleBellClick} 
                className='relative text-gray-500 hover:text-primary p-2 rounded-full hover:bg-gray-100 transition-all'
            >
                <Bell size={20} />
                {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 border-2 border-white"></span>
                    </span>
                )}
            </button>

            {showDropdown && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden transform transition-all origin-top-right">
                    <div className="flex justify-between items-center p-4 border-b border-gray-50 bg-gray-50/50">
                        <h3 className="font-bold text-gray-800">Doctor Alerts</h3>
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-semibold">
                            {unreadCount} New
                        </span>
                    </div>
                    
                    <div className="max-h-[350px] overflow-y-auto w-full text-left">
                        {notifications.length === 0 ? (
                            <div className="p-6 text-center text-gray-400 flex flex-col items-center">
                                <Bell className="mb-2 opacity-20" size={32} />
                                <p className="text-sm">No new alerts.</p>
                            </div>
                        ) : (
                            notifications.map((notif) => (
                                <div key={notif._id} className={`p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors ${!notif.isRead ? 'bg-primary/5' : ''}`}>
                                    <div className="flex gap-3 items-start">
                                        <div className={`mt-1 flex-shrink-0 p-2 rounded-full ${!notif.isRead ? 'bg-primary/20 text-primary' : 'bg-gray-100 text-gray-400'}`}>
                                            <Bell size={14} />
                                        </div>
                                        <div className="flex-1">
                                            <p className={`text-sm leading-tight ${!notif.isRead ? 'font-semibold text-gray-800' : 'text-gray-600'}`}>
                                                {notif.message}
                                            </p>
                                            <p className="text-xs text-gray-400 mt-2 font-medium">
                                                {new Date(notif.date).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    
                    <div className="p-3 text-center border-t border-gray-50 bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors" onClick={() => setShowDropdown(false)}>
                        <p className="text-sm font-semibold text-primary">Close</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminNotificationBell;
