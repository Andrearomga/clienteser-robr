import axios from "axios";
import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input, FormGroup } from 'reactstrap';
import Swal from "sweetalert2";
import "./table.css";
import View from './Viex';

const URL = 'http://localhost:3000/api/product/view'

const CompShowBlogs = () => {
    const [modaldelet, setModaldelet] = useState(false);
    const delet = () => setModaldelet(!modaldelet);
    const [data, setData] = useState({
        id: '',
    })
    const [blogs, setBlog] = useState([])
    useEffect( ()=>{
        getBlogs()
    },[])

    function handledelet(d) {
        d.preventDefault();
        const newdata = { ...data }
        newdata[d.target.id] = d.target.value
        setData(newdata)
        console.log(newdata)

    }

    //procedimineto para mostrar todos los blogs
    const getBlogs = async () => {
        const res = await axios.get(URL)
        setBlog(res.data)
    }
    //procedimineto para eliminar un blog
    const urldelet = 'http://localhost:3000/api/product/delete'

    const EnviarDelet = (id,d) => {

        axios.delete(urldelet, {
            data: data,
        })
            .then(res => {
                setData(res.data)
            })
            .catch(err => {
                console.log(err)
            })
        Swal.fire({
            title: 'Datos Eliminados!',
            text: "",
            icon: 'success',
            confirmButtonColor: '#0e46ff',
            confirmButtonText: 'Okay'
        }).then((result) => {
            if (result.isConfirmed) {
               // window.location.replace('/blog');
            }

        })

        getBlogs()
    }



    return(
        <div className='container'>
            
            <div className='row'>
                <div className='col'>
                    <div className="btn-group btn-group-toggle" data-toggle="buttons">
                    <button type="submit">
                        <Link to="/create"  className='btn btn-primary btn-lg mt-2 mb-2'><i className="fas fa-plus"></i> {"agregar"}</Link></button>
                    <button type="submit">
                        <Link to="/login"  className='btn btn-success btn-lg mt-2 mb-2'><i className="fas fa-plus"></i> {"Salir"}</Link></button>
                        <li>
                            <button onClick={delet} className="dropdown-item" type="button">
                                Delete
                            </button>
                        </li>
                    </div>


                    <table className='table'>
                        <thead className='table-primary'>
              
                        </thead>
                        <form>
                            <Modal isOpen={modaldelet}>
                                <ModalHeader className="text-primary">Delete</ModalHeader>
                                <ModalBody>
                                    <form className="was-validated" noValidate>
                                        <FormGroup>
                                            <h3>Lista de productos</h3>
                                            <div className="alert alert-primary" role="alert">
                                                <View/>
                                            </div>
                                            <div>
                                                <Label for="price">Token</Label>
                                                <input type="text" className="form-control"
                                                       onChange={(d) => handledelet(d)} id="id" value={data.id}
                                                       placeholder="Token" required></input>
                                            </div>
                                        </FormGroup>
                                    </form>
                                </ModalBody>
                                <ModalFooter>
                                    <Button type="submit" onClick={EnviarDelet} color="primary">Guardar</Button>
                                    <Button color="secondary" onClick={delet}>Cancel</Button>
                                </ModalFooter>
                            </Modal>
                        </form>
                        <tbody>
                        { blogs.map ( (blog) => (
                            <tr key={ blog.id}>
                             
                                <td> { blog.nameProduc } </td>
                                <td> { blog.description } </td>
                                <td> { blog.price } </td>
                                <td> { blog.amount } </td>
                               

                                <td>
                                    <Link to={`/edit/${blog.id}`} className='btn btn-info'><i className="fas fa-edit"></i>{"Editar"}   </Link>
                                    <button onClick={ (e)=>EnviarDelet(blog.id, e) } type="button" className='btn btn-danger'><i className="fas fa-trash-alt">{"Eliminar"}</i></button>
                                </td>
                            </tr>
                        )) }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
export default CompShowBlogs