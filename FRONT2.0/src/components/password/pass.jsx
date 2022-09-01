import axios from "axios";
import { Link, useNavigate} from "react-router-dom";
import { useForm } from 'react-hook-form';
import styles from "./styles.module.css";
import React,{useState} from"react";

import log from "../../assets/img/forgot.png";
import Swal from "sweetalert2";


const Password = () => {

	const { register, handleSubmit, formState: { errors } } = useForm();
  
	const onSubmit = value => {
	  
	  const data = value;
	  var myHeaders = new Headers();
	  myHeaders.append("Content-Type", "application/json");
  
	  var raw = JSON.stringify({
		"email": value.email,
	  });
  
	  var requestOptions = {
		method: 'POST',
		headers: myHeaders,
		body: raw,
		redirect: 'follow'
	  };
  
	  //      http://localhost:3000/api/user/recovery_password
	  fetch("http://localhost:3000/api/user/recovery_password", requestOptions)
		.then(response => response.text())
		.then(result => {
		  Swal.fire({
			title: 'vaya a su correo',
			text: 'listo en su correo lo estara esperando un correo de nosotros',
			icon: 'success',
			confirmButtonText: 'OK'
		  })
		})
		.catch(error => {
		  Swal.fire({
			title: 'error',
			text: 'lo siento a susedido un erro regrese mas tarde',
			icon: 'error',
			confirmButtonText: 'OK'
		  })
	});
  
	};
	

	return (
		<div className={styles.login_container}>
			<div className={styles.login_form_container}>
				<div className={styles.left}>
					<form className={styles.form_container} onSubmit={handleSubmit(onSubmit)}>
						<h1>Insert your email address</h1>
						<input
							type="email"
							placeholder="Email"
							name="email"
							className={styles.input}
							{...register("email", {
								required: {
								  value: true,
								  message: "Necesitas este campo"
								},
								pattern: {
								  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
								  message: "El formato no es correcto"
								}
							  })}
						/>
						 <div className="error-input-email">{errors.email && <p>{errors.email.message}</p>}</div>
						<button onClick={onSubmit} className= {styles.green_btn}>
							Recuperar
						</button>
						
						
						
					</form>
				</div>
				<div className={styles.right}>
					<img src={log} width="200px" alt="User Icon"/>
					
					<Link to="/login">
						<button type="button" className={styles.white_btn}>
							return
						</button>
					</Link>

				
					
				</div>
			</div>
			
		</div>
	);
};

export default Password;