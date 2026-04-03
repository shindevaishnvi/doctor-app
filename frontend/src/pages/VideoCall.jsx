import React from 'react'
import { useParams } from 'react-router-dom'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt'

const VideoCall = () => {
    const { id } = useParams()

    const myMeeting = async (element) => {
        // Generate Kit Token
        const appID = 123456789; // Replace with your ZegoCloud App ID
        const serverSecret = "your_server_secret"; // Replace with your ZegoCloud Server Secret
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
            appID,
            serverSecret,
            id, // roomID
            Date.now().toString(), // userID
            "User" // userName
        );

        // Create instance object from Kit Token.
        const zp = ZegoUIKitPrebuilt.create(kitToken);

        // start the call
        zp.joinRoom({
            container: element,
            sharedLinks: [
                {
                    name: 'Personal link',
                    url:
                        window.location.protocol + '//' +
                        window.location.host + window.location.pathname +
                        '?roomID=' +
                        id,
                },
            ],
            scenario: {
                mode: ZegoUIKitPrebuilt.OneONoneCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
            },
            showScreenSharingButton: true,
        });
    }

    return (
        <div className='w-full h-screen flex flex-col items-center justify-center bg-gray-100'>
            <div className='w-full h-full' ref={myMeeting}></div>
        </div>
    )
}

export default VideoCall
