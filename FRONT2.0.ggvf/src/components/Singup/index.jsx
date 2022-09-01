import { useState } from "react";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import crear from "../../assets/img/cuenta.png";
import { useForm } from 'react-hook-form';
import {AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai";
 

const Signup = () => {
	const navigate = useNavigate()
  


	const { register, handleSubmit, formState: { errors } } = useForm();
  
	const sendValiud = (value) => {
	  var myHeaders = new Headers();
	  myHeaders.append("Content-Type", "application/json");
  
	  var raw = JSON.stringify({
		"email": value.email
	  });
  
	  var requestOptions = {
		method: 'POST',
		headers: myHeaders,
		body: raw,
		redirect: 'follow'
	  };
  
	  fetch("http://localhost:3000/api/user/valid", requestOptions)
		.then(response => response.text())
		.then(result => console.log(result))
		.catch(error => console.log('error', error));
  
	}
  
	const onSubmit = value => {
  
	  var myHeaders = new Headers();
	  myHeaders.append("Content-Type", "application/json");
  
	  var raw = JSON.stringify({
		"name": value.name,
		"email": value.email,
		"password": value.password
	  });
  
	  var requestOptions = {
		method: 'POST',
		headers: myHeaders,
		body: raw,
		redirect: 'follow'
	  };
  
	  fetch("http://localhost:3000/api/user/create", requestOptions)
		.then(response => response.text())
		.then(result => {
		  if (result === "creado") {
			Swal.fire({
			  title: 'registrado',
			  text: "se a registrado con exito solo verifique su cuenta le llegara un correo a su correo para confirmar",
			  icon: 'success',
			  confirmButtonText: 'OK'
			})
		  }
		})
		.catch(error => {
		  Swal.fire({
			title: 'Error!',
			text: "sucedio un error inesperado regrersa mas tarde",
			icon: 'error',
			confirmButtonText: 'Cool'
		  })
		});
		sendValiud(value)
	  navigate('/');
	}
	
	return (
		<div className={styles.signup_container}>
			<div className={styles.signup_form_container}>
				<div className={styles.left}>
					
					
					<Link to="/login">
						<button type="button" className={styles.white_btn}>
							Return
						</button>
					</Link>
				</div>
				<div className={styles.right}>
					<form className={styles.form_container} onSubmit={handleSubmit(onSubmit)}>
						<h1>Create Account</h1>
						<img src={crear} width="200px" alt="User Icon"/>
						<input
							type="text"
							placeholder="Name"
							name="name"
							className={styles.input}
							{...register("name", {
								required: {
									value: true,
									message: "Necesitas este campo"
								}
							})}
						/>
						 <div className='error-input-name'>{errors.name && <p>{errors.name.message}</p>}</div>
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
						<div className={styles.password}>
						<input
							type= "password" 
							placeholder="Password"
							name="password"
							className={styles.input}
							{...register("password", {
								required: {
									value: true,
									message: "El campo es requerido"
								},
								minLength: {
									value: 8,
									message: "La contraseña debe tener al menos 8 caracteres"
								},
								
							})}
						

						/> 	
						 <div className='error-input-password'>{errors.password && <p>{errors.password.message}</p>}</div>
							
						
						


						</div>
						

						
						<button type="submit" className={styles.green_btn}>
							Sing Up
						</button>

					</form>
				</div>
			</div>
		</div>
	);
};

export default Signup;
