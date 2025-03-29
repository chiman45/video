import React, { useState, useEffect, useCallback } from "react";
import DailyIframe from "@daily-co/daily-js";
import { useAuth0 } from "@auth0/auth0-react";

const VideoChat = () => {
    const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();
    const [roomUrl, setRoomUrl] = useState("");
    const [callFrame, setCallFrame] = useState(null);
    const [isJoining, setIsJoining] = useState(false);

    // Function to create a new Daily.co room
    const createRoom = async () => {
        const response = await fetch("https://api.daily.co/v1/rooms", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `974c23ff8fa3e35517ca20adbc2c4c596755652553813632f048a7b4f1803ff2`,
            },
            body: JSON.stringify({ privacy: "public" }),
        });
        const data = await response.json();
        setRoomUrl(data.url);
    };

    // Join the video chat
    const joinCall = useCallback(() => {
        if (!roomUrl) return;
        setIsJoining(true);
        const frame = DailyIframe.createFrame({
            showLeaveButton: true,
            iframeStyle: {
                position: "fixed",
                width: "100vw",
                height: "100vh",
                top: "0",
                left: "0",
            },
        });
        frame.join({ url: roomUrl });
        setCallFrame(frame);
    }, [roomUrl]);

    // Leave the call
    const leaveCall = () => {
        if (callFrame) {
            callFrame.leave();
            setCallFrame(null);
        }
        setIsJoining(false);
    };

    return (
        <div className="video-chat-container">
            {!isAuthenticated ? (
                <button onClick={() => loginWithRedirect()}>Log in to Join</button>
            ) : (
                <>
                    <button onClick={() => logout({ returnTo: window.location.origin })}>
                        Logout
                    </button>
                    {!roomUrl ? (
                        <button onClick={createRoom}>Create Video Chat</button>
                    ) : (
                        <>
                            <p>Share this link: <a href={roomUrl}>{roomUrl}</a></p>
                            {!isJoining ? (
                                <button onClick={joinCall}>Join Video Chat</button>
                            ) : (
                                <button onClick={leaveCall}>Leave Call</button>
                            )}
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default VideoChat;
