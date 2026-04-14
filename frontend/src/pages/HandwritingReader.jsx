import React, { useState, useRef } from 'react';
import Tesseract from 'tesseract.js';
import { Upload, FileText, Loader2, Sparkles, AlertCircle, Scan } from 'lucide-react';

const HandwritingReader = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [ocrText, setOcrText] = useState('');
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState(''); // 'idle', 'processing', 'done'
    const fileInputRef = useRef(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
            setImagePreview(URL.createObjectURL(file));
            setOcrText('');
            setProgress(0);
            setStatus('idle');
        }
    };

    const handleScan = () => {
        if (!selectedImage) return;

        setStatus('processing');
        Tesseract.recognize(
            selectedImage,
            'eng',
            {
                logger: m => {
                    if (m.status === 'recognizing text') {
                        setProgress(Math.round(m.progress * 100));
                    }
                }
            }
        ).then(({ data: { text } }) => {
            setOcrText(text);
            setStatus('done');
        }).catch(err => {
            console.error(err);
            setStatus('done');
            setOcrText("Error scanning the image. Please try again with a clearer picture.");
        });
    };

    return (
        <div className='max-w-4xl mx-auto px-4 py-12 min-h-[75vh]'>
            <div className='flex items-center gap-3 mb-2'>
                <div className='bg-primary/10 p-3 rounded-xl'>
                    <Scan className='text-primary' size={28} />
                </div>
                <h1 className='text-3xl font-bold text-gray-900'>Scan Prescription</h1>
            </div>
            <p className='text-gray-500 mb-8'>Upload a photo of your doctor's handwritten prescription. Our AI optical character recognition (OCR) will try to digitize the text for you.</p>

            <div className='grid md:grid-cols-2 gap-8'>
                {/* Upload Section */}
                <div className='bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full'>
                    <h2 className='text-xl font-bold text-gray-800 mb-4 flex items-center gap-2'>
                        <Upload size={20} className='text-primary' /> Upload Image
                    </h2>

                    <input 
                        type="file" 
                        accept="image/*" 
                        ref={fileInputRef} 
                        onChange={handleImageChange} 
                        className="hidden" 
                    />

                    <div 
                        onClick={() => fileInputRef.current.click()}
                        className='flex-1 border-2 border-dashed border-primary/30 rounded-xl bg-gray-50 flex flex-col items-center justify-center p-8 cursor-pointer hover:bg-gray-100 hover:border-primary transition-all text-center min-h-[250px]'
                    >
                        {imagePreview ? (
                            <img src={imagePreview} alt="Prescription" className='max-h-48 object-contain rounded-lg mb-4' />
                        ) : (
                            <div className='flex flex-col items-center opacity-60'>
                                <FileText size={48} className='text-primary mb-2' />
                                <p className='font-semibold text-gray-600'>Click to browse or drag image</p>
                                <p className='text-xs text-gray-400 mt-1'>Supports JPG, PNG</p>
                            </div>
                        )}
                    </div>

                    <div className='mt-6'>
                        <button 
                            onClick={handleScan}
                            disabled={!selectedImage || status === 'processing'}
                            className='w-full bg-gray-900 text-white py-3 rounded-xl font-semibold flex flex-row justify-center items-center gap-2 hover:bg-gray-800 transition disabled:opacity-50'
                        >
                            {status === 'processing' ? <Loader2 size={18} className='animate-spin' /> : <Sparkles size={18} />}
                            {status === 'processing' ? `Scanning... ${progress}%` : 'Read Handwriting'}
                        </button>
                    </div>
                </div>

                {/* Results Section */}
                <div className='bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full'>
                    <h2 className='text-xl font-bold text-gray-800 mb-4 flex items-center gap-2'>
                        <FileText size={20} className='text-primary' /> Extracted Text
                    </h2>

                    <div className='flex-1 bg-gray-50 border border-gray-200 rounded-xl p-5 relative min-h-[300px]'>
                        {status === 'processing' ? (
                            <div className='absolute inset-0 flex flex-col items-center justify-center'>
                                <Loader2 size={40} className='text-primary animate-spin mb-4' />
                                <div className='w-2/3 bg-gray-200 rounded-full h-2.5'>
                                    <div className='bg-primary h-2.5 rounded-full transition-all duration-300' style={{ width: `${progress}%` }}></div>
                                </div>
                                <p className='text-sm text-gray-500 mt-2 font-medium'>Decoding Handwriting... {progress}%</p>
                            </div>
                        ) : ocrText ? (
                            <div className='whitespace-pre-wrap text-gray-700 font-mono text-sm leading-relaxed overflow-y-auto max-h-[300px]'>
                                {ocrText}
                            </div>
                        ) : (
                            <div className='h-full flex flex-col items-center justify-center opacity-40 text-center px-4'>
                                <AlertCircle size={40} className='text-gray-400 mb-2' />
                                <p className='text-sm'>The digitized text will appear here. Please ensure the handwriting is as clear and well-lit as possible for the best accuracy.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HandwritingReader;
