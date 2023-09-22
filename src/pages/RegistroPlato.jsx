import '../styles/Plato.scss'
import React, { useState } from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom'
import * as FaIcons from 'react-icons/fa'


const RegistroPlato = () =>{

    const [nombre, setNombre] = useState("");
    const [precio, setPrecio] = useState(0);
    const [id, setId] = useState(0);
    const [editar, setEditar] = useState(false);

    const add = () =>{
        Axios.post("http://localhost:3001/create",{
            nombre:nombre,
            precio:precio
        }).then(()=>{
            alert("Plato Registrado");
        });
    }


    const editarPlato = (val) =>{
        setEditar(true);

        setNombre(val.nombre);
        setPrecio(val.precio);
        setId(val.id);
    }
    
    return(

        <div className='container2'>
            <div className="navbar">
                 <h1>LO DE JUAN Chicken & Grill</h1>
                 <Link to={'/'}>
                   <button path type="submit" className="btn btn-primary btn"><span><FaIcons.FaSignOutAlt/></span>Salir</button>
                 </Link>
            </div>
            <h2>REGISTRAR PLATOS</h2>
            <div className="datos">
                <div className='formularioResgistro'>
                    <label>Nombre: <input
                    onChange={(event) =>{
                        setNombre(event.target.value);
                    }}
                    type="text" value={nombre}/></label>
                    <label>Precio: <input  value={precio}
                    onChange={(event) =>{
                        setPrecio(event.target.value);
                    }}
                    type="number" step="0.01"/></label>
                    <button className='btn btn-primary' onClick={add}>Registrar</button>
                </div>
            </div>
         </div>
    )
}

export default RegistroPlato;