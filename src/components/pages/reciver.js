import "./calling.css"
import { useState,useEffect,useRef,useMemo } from "react";
import {Peer} from "peerjs"
import { CopyToClipboard } from "react-copy-to-clipboard"
import io from "socket.io-client"
const socket = io.connect('http://localhost:5000')
const peer = new Peer()

const Calling =() =>{

    const user = JSON.parse(localStorage.getItem("user"))
    const[peerId,setPeerId] = useState()
    
	const [ stream, setStream ] = useState()
	const [ callAccepted, setCallAccepted ] = useState(false)
    const [ readyToCall,setReadyToCall]= useState(false)
	const [ idToCall, setIdToCall ] = useState()
	const myVideo = useRef()
	const userVideo = useRef()
	

    peer.on('open', function(id) {
        setPeerId(id)
        console.log(id)
        socket.peerId = id
        socket.creater=false
    });
    
    useEffect(() => {
		navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
			setStream(stream)
				myVideo.current.srcObject = stream
		})
          setIdToCall(user.peerId)
	}, [])


    socket.on("ReadyToCall", async (data)=>{
        console.log("recieved")
        socket.caller = data
        setCallAccepted(true)
        setReadyToCall(true)
    })

    useEffect(()=>{

        if(readyToCall){
            const call =  peer.call(socket.caller.peerIdToCall,stream);
             call.on("stream",(stream)=>{
            userVideo.current.srcObject = stream 
             })
        }

    },[readyToCall])
    // const call =  peer.call(data.createrPeerId,stream);
    // call.on("stream",(stream)=>{
    //     userVideo.current.srcObject = stream 
    //     setCallAccepted(true)
    // })
    // setCallAccepted(true)



    function makeCall (){

        const data ={
            name:user.name,
            idToCall,
            mySocketId:socket.id,
            myPeerId:socket.peerId,
            creater:false
        }
       socket.emit("calling",data)
        // var call = peer.call(user.peerId,stream);
        //     call.on("stream",(stream)=>userVideo.current.srcObject = stream)
        //     setCallAccepted(true)
    }

    return(
        <>
        <div className="Main">
            <div className="header">
                    <h3>{user.name}</h3>
                    <div>
                   <h3>Room Id:{socket.peerId}</h3>
                   <CopyToClipboard text={socket.peerId} style={{ marginBottom: "2rem" }}>
                   <button onClick={()=>{}}>
                    Copy To clipboard
                    </button>  
                    </CopyToClipboard>
            </div>
            <button onClick={()=>makeCall()}> Call </button>
            <div className="callingScreen">
                <div className="video">
					{ <video playsInline muted ref={myVideo} autoPlay style={{ width: "300px" }} />}
				</div>
                <div className="video">
					{callAccepted ?
					<video playsInline ref={userVideo} autoPlay style={{ width: "300px"}} />:
					null}
				</div>
            </div> 
            </div>
        </div>

        </>
    )
}
export default Calling;