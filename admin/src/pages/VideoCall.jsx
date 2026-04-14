import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt'
import { DoctorContext } from '../context/DoctorContext'

const VideoCall = () => {
    const { id } = useParams()
    const { profileData, getProfileData } = useContext(DoctorContext)

    useEffect(() => {
        if (!profileData) {
            getProfileData()
        }
    }, [getProfileData, profileData])

    const myMeeting = React.useCallback(async (element) => {
        if (!element) return;
        
        const appID = Number(import.meta.env.VITE_ZEGO_APP_ID);
        const serverSecret = import.meta.env.VITE_ZEGO_SERVER_SECRET;

        if (!appID || !serverSecret) {
            console.error("ZegoCloud credentials are missing. Please check your .env file.");
            element.innerHTML = `
                <div class="flex flex-col items-center justify-center h-full text-white p-10 text-center">
                    <h2 class="text-2xl font-bold mb-4">Video Call Configuration Missing</h2>
                    <p class="text-gray-400">Please provide your ZegoCloud <strong>App ID</strong> and <strong>Server Secret</strong> in the <code>.env</code> file to enable video consultations.</p>
                </div>
            `;
            return;
        }
        
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
            appID,
            serverSecret,
            id, // roomID
            profileData ? profileData._id : Date.now().toString(), // userID
            profileData ? profileData.name : "Medical Specialist" // userName
        );

        // Create instance object from Kit Token.
        const zp = ZegoUIKitPrebuilt.create(kitToken);

        // start the call
        zp.joinRoom({
            container: element,
            sharedLinks: [
                {
                    name: 'Session link',
                    url:
                        window.location.protocol + '//' +
                        window.location.host + window.location.pathname +
                        '?roomID=' +
                        id,
                },
            ],
            scenario: {
                mode: ZegoUIKitPrebuilt.OneONoneCall,
            },
            showScreenSharingButton: true,
            showMyCameraToggleButton: true,
            showAudioVideoSettingsButton: true,
            showTextChat: true,
            showUserList: true,
            maxUsers: 2,
            layout: "Auto",
            showLayoutButton: false,
        });
    }, [id, profileData]);

    return (
        <div className='min-h-[80vh] w-full flex flex-col items-center justify-center p-8 bg-gray-50/30'>
             <div className='w-full max-w-7xl aspect-video glass-card rounded-[3rem] overflow-hidden shadow-2xl bg-black border-8 border-white' ref={myMeeting}></div>
             <div className='mt-8 flex items-center gap-4 bg-white px-6 py-3 rounded-2xl shadow-sm border border-gray-100'>
                <div className='w-2 h-2 rounded-full bg-red-500 animate-pulse'></div>
                <p className='text-gray-900 font-black text-sm uppercase tracking-widest'>Encryption Active • HIPAA Compliant</p>
             </div>
        </div>
    )
}

export default VideoCall
