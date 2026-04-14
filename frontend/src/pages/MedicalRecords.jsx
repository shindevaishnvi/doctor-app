import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

const MedicalRecords = () => {
    const { token, backendUrl } = useContext(AppContext);
    const [records, setRecords] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(false);

    const fetchRecords = async () => {
        try {
            setFetchLoading(true);
            const { data } = await axios.get(backendUrl + '/api/user/medical-records', { headers: { token } });
            if (data.success) {
                setRecords(data.records);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        } finally {
            setFetchLoading(false);
        }
    };

    useEffect(() => {
        if (token) {
            fetchRecords();
        }
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!title || !file) {
                return toast.error("Title and Document file are required");
            }
            setLoading(true);

            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            formData.append('document', file);

            const { data } = await axios.post(backendUrl + '/api/user/add-medical-record', formData, { headers: { token } });

            if (data.success) {
                toast.success("Medical record added successfully");
                setTitle('');
                setDescription('');
                setFile(null);
                fetchRecords();
                // clear file input
                document.getElementById('recordFile').value = '';
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

    const handleDelete = async (id) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/user/delete-medical-record', { recordId: id }, { headers: { token } });
            if (data.success) {
                toast.success(data.message);
                fetchRecords();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    }

    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Digital Health Records</h1>
            
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-xl font-semibold mb-4 text-gray-700">Upload New Record</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Record Title</label>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border" placeholder="e.g., Blood Test Report" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description (Optional)</label>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border" rows="3" placeholder="Additional details..."></textarea>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Document / Image</label>
                        <input id="recordFile" type="file" onChange={(e) => setFile(e.target.files[0])} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-indigo-600" />
                    </div>
                    <button type="submit" disabled={loading} className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-opacity-90 transition disabled:opacity-50">
                        {loading ? 'Uploading...' : 'Upload Record'}
                    </button>
                </form>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4 text-gray-700">My Records</h2>
                {fetchLoading ? (
                    <p className="text-gray-500">Loading records...</p>
                ) : records.length === 0 ? (
                    <p className="text-gray-500">No medical records found.</p>
                ) : (
                    <div className="grid gap-4 sm:grid-cols-2">
                        {records.map((record) => (
                            <div key={record._id} className="border p-4 rounded-lg flex flex-col justify-between shadow-sm hover:shadow-md transition">
                                <div>
                                    <h3 className="font-bold text-lg text-gray-800">{record.title}</h3>
                                    <p className="text-sm text-gray-500 mb-2">{new Date(record.date).toLocaleDateString()}</p>
                                    <p className="text-sm text-gray-600 mb-4">{record.description}</p>
                                </div>
                                <div className="flex gap-2 justify-between mt-4">
                                    <a href={record.fileUrl} target="_blank" rel="noreferrer" className="text-primary hover:underline text-sm font-medium border border-primary px-3 py-1 rounded-md">View Document</a>
                                    <button onClick={() => handleDelete(record._id)} className="text-red-600 hover:text-red-800 text-sm font-medium border border-red-600 px-3 py-1 rounded-md">Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MedicalRecords;
