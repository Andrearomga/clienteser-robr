import React, { useEffect, useState } from "react";
import axios from 'axios';
import ID from "./id";
import './View.css'


function View() {

    const [data, setData] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3000/api/product/view')
            .then(res => {
                setData(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <div className="container-Id-View">
            {
                data.map((data) => (
                    <ID
                        id={data.id}
                        nameProduc={data.nameProduc}
                    />
                ))
            }


        </div>

    )



}

export default View;