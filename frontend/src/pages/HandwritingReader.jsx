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

    const preprocessImage = (file) => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');

                    // Scale up by 2x for better OCR readability
                    const scale = 2;
                    canvas.width = img.width * scale;
                    canvas.height = img.height * scale;

                    // Use good interpolation
                    ctx.imageSmoothingEnabled = true;
                    ctx.imageSmoothingQuality = 'high';

                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                    const data = imageData.data;

                    // Preprocess: Grayscale and Adaptive Contrast
                    for (let i = 0; i < data.length; i += 4) {
                        const r = data[i];
                        const g = data[i + 1];
                        const b = data[i + 2];

                        // Grayscale
                        let gray = 0.299 * r + 0.587 * g + 0.114 * b;

                        // Increase Contrast: push lighter grays to white, darker grays to black
                        // This helps capture faint handwriting
                        gray = (gray - 160) * 2.5 + 160;

                        // Clamp values
                        if (gray > 255) gray = 255;
                        if (gray < 0) gray = 0;

                        data[i] = data[i + 1] = data[i + 2] = gray;
                    }

                    ctx.putImageData(imageData, 0, 0);
                    resolve(canvas.toDataURL('image/png', 1.0));
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        });
    };

    const handleScan = async () => {
        if (!selectedImage) return;

        setStatus('processing');
        setProgress(0);

        try {
            const processedImageDataUrl = await preprocessImage(selectedImage);

            const worker = await Tesseract.createWorker('eng', 1, {
                logger: m => {
                    if (m.status === 'recognizing text') {
                        setProgress(Math.round(m.progress * 100));
                    }
                }
            });

            await worker.setParameters({
                tessedit_pageseg_mode: Tesseract.PSM.SINGLE_BLOCK, // Better for structured lists like prescriptions
                tessjs_create_hocr: '0',
                tessjs_create_tsv: '0',
            });

            const { data: { text } } = await worker.recognize(processedImageDataUrl);
            await worker.terminate();

            setOcrText(text);
            setStatus('done');
        } catch (err) {
            console.error(err);
            setStatus('done');
            setOcrText("Error scanning the image. Please try again with a clearer, well-lit picture.");
        }
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
                            <div className='flex flex-col h-full'>
                                <div className='flex-1 whitespace-pre-wrap text-gray-800 font-medium text-base leading-relaxed overflow-y-auto max-h-[250px] bg-white p-4 rounded-lg border border-gray-100 shadow-inner'>
                                    {ocrText}
                                </div>
                                <div className='mt-4 pt-4 border-t border-gray-200 flex items-start gap-2 text-amber-600 bg-amber-50/50 p-3 rounded-lg'>
                                    <AlertCircle size={16} className='shrink-0 mt-0.5' />
                                    <p className='text-[10px] font-medium leading-tight'>
                                        Handwriting recognition can be imprecise. Please cross-verify this text with your physical prescription before making any medical decisions.
                                    </p>
                                </div>
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
