import { useRef, useEffect } from 'react';
import StyledButton from "../styledComponents/styledButton";

const constraints = {
    audio: false,
    video: true,
}

const WebRTC = () => {

    const localVideoRef = useRef<HTMLVideoElement>(document.createElement("video"));
    const remoteVideoRef = useRef<HTMLVideoElement>(document.createElement("video"));
    const pc = useRef<RTCPeerConnection>(new RTCPeerConnection());
    const textRef = useRef<HTMLTextAreaElement>(document.createElement("textarea"))

    const createOffer = () => {
        pc.current.createOffer({
            offerToReceiveAudio: true,
            offerToReceiveVideo: true,
        }).then(sdp => {
            console.log(JSON.stringify(sdp));
            pc.current.setLocalDescription(sdp)
        }).catch(e => {
            console.log(e);
        })
    }

    const createAnswer = () => {
        pc.current.createAnswer({
            offerToReceiveAudio: true,
            offerToReceiveVideo: true,
        }).then(sdp => {
            console.log(JSON.stringify(sdp));
            pc.current.setLocalDescription(sdp)
        }).catch(e => {
            console.log(e);
        })
    }

    const setRemoteDescription = () => {
        const sdp = JSON.parse(textRef.current.value)
        console.log(sdp);
        pc.current.setRemoteDescription(new RTCSessionDescription(sdp));
    }

    const addCandidate = () => {
        const candidate = JSON.parse(textRef.current.value);
        console.log('Adding candidate...', candidate);

        pc.current.addIceCandidate(new RTCIceCandidate(candidate));
    }

    useEffect(() => {
        
        navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
            localVideoRef.current.srcObject = stream;
            stream.getTracks().forEach(track => {
                _pc.addTrack(track, stream);
            });
        }).catch((error) => {
            console.log('Error', error)
        })

        const _pc = new RTCPeerConnection(undefined);
        _pc.onicecandidate = (e) => {
            if (e.candidate) {
                console.log(JSON.stringify(e.candidate));
            }
        }

        _pc.oniceconnectionstatechange = (e) => {
            console.log(e);
        }

        _pc.ontrack = (e) => {
            remoteVideoRef.current.srcObject = e.streams[0];
        }

        pc.current = _pc;
    }, [])

    return (
        <div style={{
            display: 'grid',
            placeItems: 'center',

        }}>
            <div style={{ display: 'flex' }}>
                <video ref={localVideoRef} autoPlay style={{
                    width: 300,
                    height: 300,
                    backgroundColor: 'black',
                    margin: 15,
                    display: 'block'
                }} />
                <video ref={remoteVideoRef} autoPlay style={{
                    width: 300,
                    height: 300,
                    backgroundColor: 'black',
                    margin: 15,
                }} />
            </div>
            <div style={{display:'flex', gap: 10,}}>
                <StyledButton onClick={createOffer}>Create offer</StyledButton>
                <StyledButton onClick={createAnswer}>Create answer</StyledButton>
            </div>
            <br/>
            <textarea ref={textRef} />
            <br/>
            <div style={{display:'flex', gap: 10,}}>
                <StyledButton onClick={setRemoteDescription}>Set remove description</StyledButton>
                <StyledButton onClick={addCandidate}>add candidate</StyledButton>
            </div>
        </div>
    );
}

export default WebRTC;