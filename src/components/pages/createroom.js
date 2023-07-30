import "./room.css"
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";


const CreateRoom =() =>{

 
    const[name,setName] = useState()
    const nevigate = useNavigate()

    return(
        <>
        <div className="createMain">
            <div className="nameInput">
                <input
                type="text"
                name="name"
                value={name}
                onChange={(e)=>{setName(e.target.value)}}
                />
                <button className="createBtn" onClick={()=>{
                    const user = {
                        name
                     }
                     localStorage.setItem("user",JSON.stringify(user))
                     nevigate("/call")
                    //nevigate to calling page
                }}>
                    Create Room
                </button>
            </div>



        </div>

        </>
    )
}
export default CreateRoom;