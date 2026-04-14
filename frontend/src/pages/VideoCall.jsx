import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt'
import { AppContext } from '../context/AppContext'

const VideoCall = () => {
    const { id } = useParams()
    const { userData } = useContext(AppContext)

    const myMeeting = React.useCallback(async (element) => {
        if (!element) return;

        const appID = Number(process.env.REACT_APP_ZEGO_APP_ID);
        const serverSecret = process.env.REACT_APP_ZEGO_SERVER_SECRET;

        if (!appID || !serverSecret) {
            console.error("ZegoCloud credentials are missing. Please check your .env file.");
            element.innerHTML = `
                <div class="flex flex-col items-center justify-center h-full text-white p-10 text-center">
                    <h2 class="text-xl font-bold mb-4 text-white">Video Call Unavailable</h2>
                    <p class="text-gray-400 text-sm">Please provide ZegoCloud credentials in the <code>.env</code> file to enable video consultations.</p>
                </div>
            `;
            return;
        }
        
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
            appID,
            serverSecret,
            id, // roomID
            userData ? userData._id : Date.now().toString(), // userID
            userData ? userData.name : "Guest User" // userName
        );

        // Create instance object from Kit Token.
        const zp = ZegoUIKitPrebuilt.create(kitToken);

        // start the call
        zp.joinRoom({
            container: element,
            sharedLinks: [
                {
                    name: 'Meeting link',
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
    }, [id, userData]);

    return (
        <div className='min-h-[80vh] flex flex-col items-center justify-center p-4 bg-gray-50/50'>
            <div className='w-full max-w-6xl aspect-video glass-card rounded-[2.5rem] overflow-hidden shadow-2xl bg-black border-4 border-white' ref={myMeeting}></div>
            <p className='mt-6 text-gray-400 font-medium text-sm italic'>Secure Encrypted Video Consultation</p>
        </div>
    )
}

export default VideoCall
