import { Route, Routes, Navigate,BrowserRouter } from "react-router-dom";
import Signup from "./components/Singup";
import Login from "./components/Login";
import Password from "./components/password/pass";
import Email from "./components/Confirm/email";
import Tarjeta from "./components/Bienvenido/tarjeta";
import Valid from "./components/validar/Valid";
import Dashboard from "./components/Productos/Dashboard";
import Createprd from "./components/Productos/Create"; 



import styles from './App.module.scss'


const App = () => {

	return (
	<BrowserRouter>
	<div className={styles.container}>
		<Routes>
			<Route path="/signup" exact element={<Signup />} />
			<Route path="/login" exact element={<Login />} /> 
			<Route path="/" element={<Navigate replace to="/login" />} />
			<Route path="/recover" exact element={<Password />} />
			<Route path="/password" exact element={<Email />} />
			<Route path="/tarjeta" exact element={<Tarjeta />} />
			<Route path="/valid" exact element={<Valid/>} />
			<Route path="/Dashboard" exact element={<Dashboard/>} />
			<Route path="/creeaaa" exact element={<Createprd/>} />
		</Routes>
		</div>
		</BrowserRouter>

		
		
	);
};

export default App;
