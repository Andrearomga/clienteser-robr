import styles from "./styles.module.css";
import { useState } from "react";
import { useForm} from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import seguridad from "../../assets/img/pass.png";
import Swal from "sweetalert2";

function Email () {
	const [messageP, setMessageP] = useState("")

	const querystring = window.location.search
  const params = new URLSearchParams(querystring)
  
	const { register, handleSubmit, formState: { errors } } = useForm();
  
	const onSubmit = value => {
  
  
	  if (value.password1 === value.password2 && value.password2 === value.password1) {
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
  
		var raw = JSON.stringify({
		  "email": params.get('email'),
		  "password": value.password1
		});
  
		var requestOptions = {
		  method: 'PUT',
		  headers: myHeaders,
		  body: raw,
		  redirect: 'follow'
		};
		// http://localhost:3000/api/user/update
		fetch("http://localhost:3000/api/user/update", requestOptions)
		  .then(response => response.text())
		  .then(result => console.log(result))
		  .catch(error => console.log('error', error));
		Swal.fire({
		  title: 'contraseña restablecida!',
		  text: 'Se restablecido la contraseña',
		  icon: 'success',
		  confirmButtonText: 'OK'
		})
	  } else {
		Swal.fire({
		  title: 'error!',
		  text: 'Las contraseñas no coinciden ',
		  icon: 'error',
		  confirmButtonText: 'OK'
		})
	  }
  
	}

    return (
		<div className={styles.signup_container}>
			<div className={styles.signup_form_container}>
				<div className={styles.left}>
				<img src={seguridad} width="200px" alt="User Icon"/>
				
				
					<Link to="/login">
						<button type="button" className={styles.white_btn}>
							Return
						</button>
					</Link>
				</div>
				
				<div className={styles.right}>

				<h1>Confirm password </h1>

				
					
					<form className ="was-validated" noValidate onSubmit={handleSubmit(onSubmit)}> 
						<input
                        	type="password"
							className="form-control"
							placeholder="Password"
							name="password1" 
							{...register("password1", {
								required: {
								  value: true,
								  message: "El campo es requerido"
								},
								minLength: {
								  value: 8,
								  message: "Debe tener al menos 8 caracteres"
								},
								
							  })}></input>
							    <div className="error-input-password">{errors.password1 && <p>{errors.password1.message}</p>}</div>
                        <input
                        	type="password"
							className="form-control"
							placeholder="Password" 
							name="password2"
							{...register("password2", {
								required: {
								  value: true,
								  message: "El campo es requerido"
								},
								minLength: {
								  value: 8,
								  message: "La contraseña debe tener al menos 8 caracteres"
								},
								
							  })}></input>
						{errors.password&& <span className="text-danger">{errors.password.message}</span>}
						<div className="d-grid">
							<button type="submit" className="btn btn-primary">Restablecer</button>
						</div>
						
					</form>
				</div>
			</div>
		</div>
	);
}

export default Email;