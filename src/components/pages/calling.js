import "./calling.css"
import { useState,useEffect,useRef, useMemo } from "react";
import {Peer} from "peerjs"
import { CopyToClipboard } from "react-copy-to-clipboard"
import io from "socket.io-client"
const socket = io.connect('http://localhost:5000')
const peer = new Peer()

const Calling =() =>{

    const user = JSON.parse(localStorage.getItem("user"))
    const [peerId,setPeerId] = useState("")
    const [incommingCall,setIncommingcall] = useState(false)
	const [ stream, setStream ] = useState()
	const [ callAccepted, setCallAccepted ] = useState(false)
	const [ name, setName ] = useState("")
	const myVideo = useRef()
	const userVideo = useRef([])



    useEffect(() => {
		navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((mystream) => {
            // let strm =stream
            // strm[0]=mystream
			setStream(mystream)
				myVideo.current.srcObject = mystream
		})
	
	}, [])
    peer.on('open', function(id) {
        setPeerId(id)
        console.log(id)
        socket.peerId = id
        socket.creater=true
    });

    peer.on('call', function(call) {
        call.answer(stream);
        call.on("stream",(stream)=>{
        userVideo.current.srcObject = stream
    })
        setCallAccepted(true) 
      });

      useEffect(()=>{

        socket.on("IncomingCall",(caller)=>{
          //  window.alert(caller.name +" is calling....")
            setIncommingcall(true)
            socket.caller = caller
         //   console.log(caller)
        })
      })

      useEffect(()=>{

        if(incommingCall){
            const details = {
                name:socket.caller.name,
                idToCall: socket.caller.idToCall,
                mySocketId: socket.caller.mySocketId,
                myPeerId: socket.caller.myPeerId,
                creater: socket.caller.creater,
                peerIdToCall:socket.peerId
            }
            socket.emit("readyToAccept",details)
            console.log(details)
        }
    },[incommingCall])


    //    socket.on("IncomingCall",(caller)=>{
    //         window.alert(caller.name +" is calling....")
    //         console.log(caller)
    //     })

    //   socket.on("IncomingCall",(caller)=>{
    //         window.alert(caller.name+" is calling....")
    //         peer.on('call', function(call) {
    //             call.answer(stream);
    //             call.on("stream",(callerStream)=>{
    //                 let strm =stream
    //                 strm[caller.number]=callerStream
    //                 setStream(strm)
    //                 userVideo[caller.number].current.srcObject = callerStream
    //         })
    //             setCallAccepted(true)
    //           });
    //   })
    // socket.on("IncomingCall",(data)=>{
    //     console.log(data,"yesme")
    //     // window.alert(data.name+ " is Calling....")
    //     data.createrPeerId=socket.peerId
    //     socket.emit("readyToAccept",data)
    // })

      

    return(
        <>
        {incommingCall?<>{socket.caller.name + " is calling....."}</>:null}
        <div className="Main">
            <div className="header">
                    <h3>{user.name}</h3>
                    <div>
                   <h3>Room Id : {socket.id}</h3>
                   <h3>peer Id : {socket.peerId}</h3>
                   <CopyToClipboard text={socket.id} style={{ marginBottom: "2rem" }}>
                   <button onClick={()=>{}}>
                    Copy To clipboard
                    </button>  
                    </CopyToClipboard>
            </div>
            <div className="callingScreen">
                <div className="video">
					{<video playsInline muted ref={myVideo} autoPlay style={{ width: "300px" }} />}
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