

import JoinRoom from "./components/hero/joinroom"
import CreateRoom from "./components/hero/createroom"
import Calling from "./components/hero/calling"
import Recive from "./components/hero/reciver"
import { HashRouter, Routes, Route, } from "react-router-dom";
//const socket = io.connect('http://localhost:5000')
function App() {
	
	return(
		<HashRouter>
		<Routes>
		<Route exact path ='/' element={<CreateRoom/>}/>
		<Route exact path ='/join' element={<JoinRoom/>}/>
		<Route exact path ='/call' element={<Calling/>}/>
		<Route exact path ='/recive' element={<Recive/>}/>
		</Routes>
		</HashRouter>
	)
}

export default App
