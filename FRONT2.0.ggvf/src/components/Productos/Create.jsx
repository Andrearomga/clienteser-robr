import axios from 'axios'
import React, {useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import styles from "./styles.module.scss";
import Swal from "sweetalert2";

const CompCreateBlog = () => {
    const [mensaje, setMensaje] = useState();
    const [loading, setLoading] = useState(false);
    function handle(e) {
        e.preventDefault();
        const newdata = { ...data }
        newdata[e.target.id] = e.target.value
        setData(newdata)
        console.log(newdata)

    }
    const [data, setData] = useState({
        name: '',
        nameProduc: '',
        description: '',
        price: '',
        amount: '',
        selectedFile: null
    })
    const url = 'http://localhost:3000/api/product/create'
    const handleFileSelected = (e) => {
        const files = Array.from(e.target.files)
        console.log("files:", files);

        if (files && files.length > 0) {
            const newdata = {...data}
            newdata["selectedFile"] = files[0];
            setData(newdata)
        }
    }

        const navigate = useNavigate();

    const { name,nameProduc, description, price, amount } = data;


    const onSubmit = async (e) => {
        e.preventDefault();
        if (nameProduc !== "" && description !== ""&& price !== ""&& amount !== "") {
            setLoading(true);
            const formData = new FormData();
            formData.append("name", data.selectedFile);
            formData.append("nameProduc", data.nameProduc);
            formData.append("description", data.description);
            formData.append("price", data.price);
            formData.append("amount", data.amount);
            console.log(data)
            axios.post(url,formData )
                .then(res => {

                    console.log(res)
                    if(res.status === 200)
                    {
                        Swal.fire({
                            title: 'Bien Hecho',
                            text: "Producto Agregado ✔️!",
                            icon: 'success',
                            confirmButtonColor: '#0e46ff',
                            confirmButtonText: 'Aceptar'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                window.location.replace('/Dashboard');
                            }
                        })
                    }else{
                        Swal.fire(
                            'ATENCIÓN',
                            'Ha ocurrido un error al guardar la imagen, reintente',
                            'warning'
                        );
                    }
                })
            setLoading(false);
        }
    };

    return (
        <>
            <div className={styles.formContainer}>
                <h4  className='text-center'>Producto a registrar: </h4>
                <br />
                <form onSubmit={(e) => onSubmit(e)}>
                    <div>
                        <input type="file" name='file' className="form-control" onChange={handleFileSelected} id="name"
                               aria-label="Upload" required></input>
                    </div>
                    <br />
                    <div className={styles.inputContainer}>
                        
                           
                            <input
                                onChange={(e) => handle(e)}
                                value={nameProduc}
                                name="nameProduc"
                                id="nameProduc"
                                type="text"
                                placeholder="Nombre del producto"
                                className='form-control'
                                autoComplete="off"
                            />
                    </div>
                    <br />

                    <div className={styles.inputContainer}>
                     
                            <input
                                onChange={(e) => handle(e)}
                                value={description}
                                name="description"
                                id="description"
                                type="text"
                                className='form-control'
                                placeholder="Description"
                                autoComplete="off"
                            />
                    </div>
                    <br />

                    <div className={styles.inputContainer}>
                       
                            <input
                                onChange={(e) => handle(e)}
                                value={price}
                                name="price"
                                id="price"
                                type="number"
                                className='form-control'
                                placeholder="Precio"
                                autoComplete="off"
                            />
                    
                    </div>
                    <br />

                    <div className={styles.inputContainer}>
                        
                            <input
                                onChange={(e) => handle(e)}
                                value={amount}
                                name="amount"
                                id="amount"
                                type="number"
                                className='form-control'
                                placeholder="Monto"
                                autoComplete="off"
                            />
                    </div>
                    <br />

                    <div class="d-grid gap-2 col-6 mx-auto">
                    <button type="submit" className='btn btn-success'>
                        {loading ? "Cargando..." : "Guardar"}
                    </button>
                    </div>
                 

                </form>
            </div>
            {mensaje && <div className={styles.toast}>{mensaje}</div>}
        </>
    );
};

export default CompCreateBlog;