import "./room.css"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const JoinRoom =() =>{

    //const {name,setName,idToCall,setIdToCall,callUser} = useContext(DataProvider);
    const[peerId,setPeerId] = useState()
    const[name,setName] = useState()
    const nevigate = useNavigate()

    return(
        <>
        <div className="JoinMain">
            <div className="nameInput">
                <input
                type="text"
                name="name"
                value={name}
                onChange={(e)=>{setName(e.target.value)}}
                />
                <input
                type="text"
                name="name"
                value={peerId}
                onChange={(e)=>{setPeerId(e.target.value)}}
                />
                <button className="JoinBtn" onClick={()=>{
                     const user = {
                        name,peerId
                     }
                     localStorage.setItem("user",JSON.stringify(user))
                     nevigate("/recive")
                }}>
                    Join Room
                </button>
            </div>



        </div>

        </>
    )
}
export default JoinRoom;