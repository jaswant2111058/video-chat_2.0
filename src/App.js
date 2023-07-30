

import JoinRoom from "./components/pages/joinroom"
import CreateRoom from "./components/pages/createroom"
import Calling from "./components/pages/calling"
import Recive from "./components/pages/reciver"
import { HashRouter, Routes, Route, } from "react-router-dom";
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
