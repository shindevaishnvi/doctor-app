import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Activity, Stethoscope, Search, ArrowRight, Loader2 } from 'lucide-react';

const symptomKeywords = {
    'Neurologist': ['headache', 'dizziness', 'migraine', 'brain', 'nerve', 'seizure', 'memory', 'numbness'],
    'Gastroenterologist': ['stomach', 'ache', 'vomit', 'nausea', 'digestion', 'belly', 'acid', 'gas', 'liver', 'intestine', 'diarrhea', 'constipation'],
    'Dermatologist': ['skin', 'rash', 'acne', 'pimple', 'itching', 'spot', 'hair', 'nail', 'eczema'],
    'Gynecologist': ['period', 'pregnancy', 'women', 'uterus', 'vagina', 'ovary', 'menstrual', 'breast'],
    'Pediatricians': ['child', 'baby', 'kid', 'infant', 'toddler'],
    'General physician': ['fever', 'cold', 'cough', 'flu', 'general', 'tired', 'fatigue', 'weakness', 'pain', 'body']
};

const SmartRecommendation = () => {
    const [symptoms, setSymptoms] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const navigate = useNavigate();

    const handleAnalyze = () => {
        if (!symptoms.trim()) return;

        setLoading(true);
        setResult(null);

        // Simulate AI Thinking
        setTimeout(() => {
            const words = symptoms.toLowerCase().match(/\w+/g) || [];
            let bestMatch = 'General physician';
            let maxCount = 0;

            for (const [speciality, keywords] of Object.entries(symptomKeywords)) {
                let count = 0;
                for (const word of words) {
                    if (keywords.includes(word)) {
                        count++;
                    }
                }
                if (count > maxCount) {
                    maxCount = count;
                    bestMatch = speciality;
                }
            }

            setResult({ speciality: bestMatch, maxCount });
            setLoading(false);
        }, 1500);
    };

    return (
        <div className='min-h-[70vh] flex flex-col items-center py-16 px-4'>
            <div className='text-center max-w-2xl mb-10'>
                <div className='inline-flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest bg-primary/10 px-4 py-2 rounded-full mb-4'>
                    <Sparkles size={14} /> AI Powered
                </div>
                <h1 className='text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-4'>Smart Doctor <span className='text-primary'>Match</span></h1>
                <p className='text-gray-500 font-medium text-lg'>Don't know which specialist to visit? Describe your symptoms and let our AI recommend the right medical expert for you.</p>
            </div>

            <div className='w-full max-w-2xl bg-white p-6 rounded-[2rem] shadow-xl border border-gray-100'>
                <div className='relative'>
                    <textarea 
                        className='w-full bg-gray-50 rounded-2xl p-6 text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none'
                        rows="4"
                        placeholder="E.g., I have a severe headache and have been feeling dizzy since morning..."
                        value={symptoms}
                        onChange={(e) => setSymptoms(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleAnalyze(); }}}
                    ></textarea>
                    
                    <button 
                        onClick={handleAnalyze}
                        disabled={loading || !symptoms.trim()}
                        className='absolute bottom-4 right-4 bg-primary text-white p-3 rounded-xl shadow-lg hover:bg-opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-semibold'
                    >
                        {loading ? <Loader2 className='animate-spin' size={20} /> : <Search size={20} />}
                        Analyze
                    </button>
                </div>

                <div className={`mt-6 transition-all duration-500 overflow-hidden ${result ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                    {result && (
                        <div className='bg-primary/5 rounded-2xl p-6 border border-primary/20 flex flex-col md:flex-row items-center gap-6'>
                            <div className='bg-white p-4 rounded-full shadow-md text-primary'>
                                <Activity size={40} />
                            </div>
                            <div className='flex-1 text-center md:text-left'>
                                <p className='text-gray-500 text-sm font-semibold uppercase tracking-wider mb-1'>Recommended Speciality</p>
                                <h2 className='text-2xl font-bold text-gray-900'>{result.speciality}</h2>
                                <p className='text-gray-600 mt-2 text-sm'>
                                    Based on your symptoms, we highly recommend consulting a certified {result.speciality}.
                                </p>
                            </div>
                            <button 
                                onClick={() => navigate(`/doctors/${result.speciality}`)}
                                className='w-full md:w-auto bg-gray-900 text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-800 transition flex items-center justify-center gap-2 whitespace-nowrap'
                            >
                                <Stethoscope size={18} /> View Doctors
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SmartRecommendation;
