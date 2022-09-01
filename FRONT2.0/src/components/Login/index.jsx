import axios from "axios";
import { Link, useNavigate} from "react-router-dom";
import { useForm } from 'react-hook-form';
import styles from "./styles.module.css";
import React,{useState} from"react";
import {AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai";
import log from "../../assets/img/reg.png";
import Swal from "sweetalert2";


const Login = () => {


	const navigate = useNavigate();
	
	const { register, handleSubmit, formState: { errors } } = useForm();

	

    const onSubmit = value => {
        const data = value;

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "email": value.email,
            "password": value.password
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:3000/api/user/login", requestOptions)
            .then(response => response.json())
            .then(result => {
                switch (result.error) {
                    case "Usuario no encontrado":
                        Swal.fire({
                            title: 'Error!',
                            text: 'Usuario no encontrado',
                            icon: 'error',
                            confirmButtonText: 'Cool'
                        })
                        break;
                    case "Usuario no verificado":
                        Swal.fire({
                            title: 'Error!',
                            text: 'Usuario no verificado',
                            icon: 'error',
                            confirmButtonText: 'Cool'
                        })
                        break;
                    case "contraseña no válida":
                        Swal.fire({
                            title: 'Error!',
                            text: 'contraseña no válida',
                            icon: 'error',
                            confirmButtonText: 'Cool'
                        })
                        break;

                    default:
                        navigate('/dashboard');
                        break;
                }
            })
            .catch(error => console.error);

    }
	
	
	return (
		<div className={styles.login_container}>
			<div className={styles.login_form_container}>
				<div className={styles.left}>
					<form className={styles.form_container} onSubmit={handleSubmit(onSubmit)}>
						<h1>Login to Your Account</h1>
						<input
							type="email"
							placeholder="Email"
							name="email"
							className={styles.input}
							{...register("email", {
								required: {
									value: true,
									message: "Campo requerido"
								},
								pattern: {
									value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
									message: "El formato no es correcto"
								}
							})}

						/>
						  <div className="error-input-email">{errors.email && <p>{errors.email.message}</p>}</div>
						
						<div  className={styles.password}>
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
									message: "Necesita al menos 8 caracteres"
								},
								
							})}
							
						/>
						
						<div className="error-input-password">{errors.password && <p>{errors.password.message}</p>}</div>
						
						</div>
						
						<button type="submit" className={styles.green_btn}>
							Sing In
						</button>
							<Link className="underlineHover  formFooter" to="/recover">Forgot Password?</Link>


						
						
					</form>
					
				</div>
				<div className={styles.right}>
					<h1>New Here ?</h1>
					<img src={log} width="200px" alt="User Icon"/>
					
					<Link to="/signup">
						<button type="button" className={styles.white_btn}>
							Sing Up
						</button>
					</Link>

				
					
				</div>
			</div>
			
		</div>
	);
};

export default Login;
