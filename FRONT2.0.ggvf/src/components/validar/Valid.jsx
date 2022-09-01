import './Confirmation_Acount.css'
import React, { useState } from 'react';

import Swal from 'sweetalert2'



const Valid = () => {
    

    const querystring = window.location.search
    const params = new URLSearchParams(querystring)
    
    const update = () =>{
    
    
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      "email": params.get('email')
    });
    
    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("http://localhost:3000/api/user/estado", requestOptions)
      .then(response => response.text())
      .then(result => {
        Swal.fire({
            title: 'verificado',
            text: 'se a verificado correctamente ya puede iniciar sesion',
            icon: 'success',
            confirmButtonText: 'Cool'
          })
      })
      .catch(error => {
        Swal.fire({
            title: 'Error!',
            text: 'se prudujo un erro regrese mas tarde',
            icon: 'error',
            confirmButtonText: 'Cool'
          })
      });
    }
    return (
        <div className='container-Validd'>
            <div className='title-valid'><h1>Validar usuario</h1></div>
            <div className='button-valid'><button  onClick={() => {update()}}><h2>Validar</h2></button></div>
        </div>
    )
}

export default Valid;