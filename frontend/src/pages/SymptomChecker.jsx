import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, ShieldAlert, AlertCircle, Thermometer, Loader2, ArrowRight } from 'lucide-react';

const conditionDatabase = [
    {
        name: 'Migraine',
        symptoms: ['headache', 'nausea', 'vomit', 'light', 'sensitivity', 'throbbing', 'dizziness'],
        severity: 'Moderate',
        advice: 'Rest in a quiet, dark room. Stay hydrated. Consult a Neurologist if frequent.',
        speciality: 'Neurologist'
    },
    {
        name: 'Common Cold / Flu',
        symptoms: ['fever', 'cough', 'runny', 'nose', 'sore', 'throat', 'sneezing', 'tired', 'fatigue'],
        severity: 'Mild',
        advice: 'Get plenty of rest and drink warm fluids. Take over-the-counter cold medications.',
        speciality: 'General physician'
    },
    {
        name: 'Gastritis / Acid Reflux',
        symptoms: ['stomach', 'ache', 'burning', 'chest', 'acid', 'nausea', 'burping', 'bloating'],
        severity: 'Moderate',
        advice: 'Avoid spicy and acidic foods. Eat smaller meals. Consult a Gastroenterologist.',
        speciality: 'Gastroenterologist'
    },
    {
        name: 'Appendicitis',
        symptoms: ['stomach', 'ache', 'pain', 'right', 'side', 'nausea', 'vomit', 'fever', 'sharp'],
        severity: 'Severe',
        advice: 'Seek EMERGENCY medical attention immediately. Do not eat or drink anything.',
        speciality: 'General physician'
    },
    {
        name: 'Allergic Reaction',
        symptoms: ['rash', 'itching', 'red', 'spots', 'swelling', 'hives', 'allergies', 'skin'],
        severity: 'Moderate',
        advice: 'Avoid the allergen. If you experience difficulty breathing, seek emergency care.',
        speciality: 'Dermatologist'
    },
    {
        name: 'Pneumonia / Chest Infection',
        symptoms: ['fever', 'cough', 'chest', 'pain', 'breathing', 'shortness', 'mucus'],
        severity: 'Severe',
        advice: 'Requires urgent medical evaluation. You may need antibiotics and chest X-rays.',
        speciality: 'General physician'
    }
];

const SymptomChecker = () => {
    const [inputSymptoms, setInputSymptoms] = useState('');
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState([]);
    const navigate = useNavigate();

    const handleCheck = () => {
        if (!inputSymptoms.trim()) return;

        setLoading(true);
        setResults([]);

        // Simulate AI analysis delay
        setTimeout(() => {
            const userWords = inputSymptoms.toLowerCase().match(/\w+/g) || [];
            
            let scoredConditions = conditionDatabase.map(condition => {
                let matchCount = 0;
                condition.symptoms.forEach(sym => {
                    if (userWords.includes(sym)) {
                        matchCount++;
                    }
                });
                return { ...condition, score: matchCount };
            });

            // Filter conditions that have at least 1 matching symptom, then sort by score
            let matched = scoredConditions
                .filter(c => c.score > 0)
                .sort((a, b) => b.score - a.score)
                .slice(0, 3); // top 3 matches

            setResults(matched);
            setLoading(false);
        }, 2000);
    };

    return (
        <div className='max-w-4xl mx-auto px-4 py-12 min-h-[75vh]'>
            <div className='flex items-center gap-3 mb-2'>
                <div className='bg-primary/10 p-3 rounded-xl'>
                    <Thermometer className='text-primary' size={28} />
                </div>
                <h1 className='text-3xl font-bold text-gray-900'>AI Symptom Checker</h1>
            </div>
            <p className='text-gray-500 mb-8'>Enter your symptoms separated by commas or in a sentence. Our smart system will evaluate the most likely medical conditions.</p>

            <div className='bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8'>
                <label className='block text-sm font-semibold text-gray-700 mb-2'>Describe how you are feeling:</label>
                <textarea 
                    className='w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white transition-all text-lg resize-none'
                    rows="3"
                    value={inputSymptoms}
                    onChange={(e) => setInputSymptoms(e.target.value)}
                    placeholder="E.g., I have a fever, a bad cough, and my chest hurts when I breathe."
                ></textarea>
                <div className='mt-4 flex justify-between items-center'>
                    <span className='text-xs text-red-500 flex items-center gap-1 font-medium'>
                        <ShieldAlert size={14} /> Note: This is an AI guide and not a medical diagnosis.
                    </span>
                    <button 
                        onClick={handleCheck}
                        disabled={loading || !inputSymptoms.trim()}
                        className='bg-primary text-white px-6 py-2.5 rounded-lg disabled:opacity-50 hover:bg-opacity-90 font-medium flex items-center gap-2 transition-all'
                    >
                        {loading ? <Loader2 className='animate-spin' size={18} /> : <Activity size={18} />}
                        {loading ? 'Evaluating...' : 'Check Symptoms'}
                    </button>
                </div>
            </div>

            {results.length > 0 && (
                <div className='space-y-6'>
                    <h2 className='text-xl font-bold flex items-center gap-2 text-gray-800 border-b pb-4'>
                        <AlertCircle className='text-amber-500' size={24} /> 
                        Possible Conditions Detected
                    </h2>
                    
                    <div className='grid gap-4'>
                        {results.map((item, index) => (
                            <div key={index} className='bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-6 items-start'>
                                <div className='flex-1'>
                                    <div className='flex items-center gap-3 mb-2'>
                                        <h3 className='text-xl font-bold text-gray-900'>{item.name}</h3>
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                            item.severity === 'Severe' ? 'bg-red-100 text-red-700' :
                                            item.severity === 'Moderate' ? 'bg-amber-100 text-amber-700' :
                                            'bg-green-100 text-green-700'
                                        }`}>
                                            {item.severity} Risk
                                        </span>
                                    </div>
                                    <p className='text-gray-600 mb-4'>{item.advice}</p>
                                </div>
                                <div className='md:w-64 border-t md:border-t-0 md:border-l pt-4 md:pt-0 md:pl-6 border-gray-100 flex flex-col justify-center items-center md:items-start'>
                                    <p className='text-xs text-gray-400 font-semibold uppercase tracking-wider mb-2'>Recommended Path</p>
                                    <button 
                                        onClick={() => navigate(`/doctors/${item.speciality}`)}
                                        className='w-full bg-gray-50 hover:bg-primary hover:text-white text-gray-700 group transition-colors py-2 px-4 rounded-lg flex items-center justify-between font-medium text-sm'
                                    >
                                        See {item.speciality}
                                        <ArrowRight size={16} className='group-hover:translate-x-1 transition-transform' />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {!loading && inputSymptoms && results.length === 0 && (
                <div className='text-center p-8 bg-gray-50 rounded-2xl border border-gray-100'>
                    <p className='text-gray-500 mb-2'>We couldn't confidently match your symptoms to a known condition in our basic database.</p>
                    <button onClick={() => navigate('/doctors/General physician')} className='text-primary font-semibold hover:underline'>Please consult a General Physician to be safe.</button>
                </div>
            )}
        </div>
    );
};

export default SymptomChecker;
