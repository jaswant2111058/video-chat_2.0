import "./calling.css"
import { useContext,useState,useEffect,useRef, useMemo } from "react";
import {Peer} from "peerjs"
import { CopyToClipboard } from "react-copy-to-clipboard"
import io from "socket.io-client"
const socket = io.connect('http://localhost:5000')

const Calling =() =>{

    const user = JSON.parse(localStorage.getItem("user"))
    const[peerId,setPeerId] = useState("")
	const [ stream, setStream ] = useState([])
	const [ callAccepted, setCallAccepted ] = useState(false)
	const [ name, setName ] = useState("")
	const myVideo = useRef()
	const userVideo = useRef()
	const user1Video = useRef()
	const user2Video = useRef()
	const user4Video = useRef()
	const user3Video = useRef()
    const peer =  useMemo(()=>(new Peer()),[]);
    useEffect(() => {
		navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
			setStream(stream)
				myVideo.current.srcObject = stream
		})
	
	}, [])
    peer.on('open', function(id) {
        console.log(id)
        console.log(socket.id)   
        setPeerId(id)
        socket.peerId = id
    });

    peer.on('call', function(call) {
        call.answer(stream);
        call.on("stream",(stream)=>userVideo.current.srcObject = stream)
        setCallAccepted(true) 
      });



    return(
        <>
        <div className="Main">
            <div className="header">
                    <h3>{user.name}</h3>
                    <div>
                   <h3>Room Id : {peerId}</h3>
                   <CopyToClipboard text={peerId} style={{ marginBottom: "2rem" }}>
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