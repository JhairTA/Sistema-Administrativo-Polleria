import '../styles/Cliente.scss'
import React, { useState } from 'react'
import * as FaIcons from 'react-icons/fa'
import { Link, Route, Routes } from 'react-router-dom';
import Axios from 'axios'

import Swal from 'sweetalert2'


const Cliente = () => {
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [dni, setDni] = useState("");
    const [direccion, setDireccion] = useState("");
    const [telefono, setTelefono] = useState("");
    const [fechaCreacion, setFechaCreacion] = useState("");
    const [correo, setCorreo] = useState("");
    const [cliente_id, setCliente_id] = useState();
    const [tablaClientes, setTablaClientes] = useState([]);

    const [editar, setEditar] = useState(false);

    const [clienteList, setCliente] = useState([]);

    const [currentPage, setCurrentPage] = useState(1)
    const recordsPerPage = 9;
    const lastIndex = currentPage * recordsPerPage;
    const firsIndex = lastIndex - recordsPerPage;
    const records = clienteList.slice(firsIndex, lastIndex);
    const npage = Math.ceil(clienteList.length/ recordsPerPage);
    const numbers = [...Array(npage + 1).keys()].slice(1)

    const add = () => {
        Axios.post("http://localhost:3001/createcliente", {
            nombre: nombre,
            apellido: apellido,
            dni: dni,
            direccion: direccion,
            telefono: telefono,
            fechaCreacion: fechaCreacion,
            correo: correo
        }).then(() => {
            limpiarCampos();
            Swal.fire({
                title: "<strong>Cliente registrado!</strong>",
                html: "<i>El Cliente <strong>" + nombre + "</strong> fue agregado con éxito!</i>",
                icon: 'success'
            })
        });
    }

    const update = () => {
        Axios.put("http://localhost:3001/updatecliente", {
            cliente_id: cliente_id,
            nombre: nombre,
            apellido: apellido,
            dni: dni,
            direccion: direccion,
            telefono: telefono,
            fechaCreacion: fechaCreacion,
            correo: correo
        }).then(() => {
            limpiarCampos();
            Swal.fire({
                title: "<strong>Cliente Actualizado!</strong>",
                html: "<i>El Cliente <strong>" + cliente_id + "</strong> fue actualizado exitosamente!</i>",
                icon: 'success'
            })
        });
    }

    const deleteCliente = (val) => {
        Swal.fire({
            title: 'Comfirmar eliminado?',
            html: "<i>Realmente desea eliminar el cliente <strong>" + val.nombre + "</strong>?</i>",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminarlo!'
        }).then((result) => {
            if (result.isConfirmed) {
                Axios.delete(`http://localhost:3001/deletecliente/${val.cliente_id}`).then(() => {
                    limpiarCampos();
                    Swal.fire(
                        'Eliminado!',
                        val.nombre + ' fue eliminado.',
                        'success'
                    )
                }).catch(function (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'No se logro eliminar el cliente!',
                        footer: JSON.parse(JSON.stringify(error)).message === "Network Error" ? "Intente más tarde" : JSON.parse(JSON.stringify(error)).message
                    })
                });
            }
        })

    }

    const limpiarCampos = () => {
        setNombre("");
        setApellido("");
        setDni("");
        setDireccion("");
        setTelefono("");
        setFechaCreacion("");
        setCorreo("");

        setEditar(false);
    }

    const editarCliente = (val) => {
        setEditar(true);
        setNombre(val.nombre);
        setApellido(val.apellido);
        setDni(val.dni);
        setDireccion(val.direccion);
        setTelefono(val.telefono);
        setFechaCreacion(val.fechaCreacion);
        setCorreo(val.correo);
        setCliente_id(val.cliente_id);
    }

    function prePage(){
        if(currentPage !== 1){
          setCurrentPage(currentPage - 1);
        }
    }
  
    function nextPage(){
    if (currentPage !== npage){
        setCurrentPage(currentPage + 1);
    }
    }

    function changeCPage(id){
    setCurrentPage(id)
    }


    const getCliente = () => {
        Axios.get("http://localhost:3001/cliente").then((response) => {
            setCliente(response.data);
            setTablaClientes(response.data)
        });
    }

    getCliente();

    return (
        <div className='container2'>
            <div className="navbar">
                <h1>LO DE JUAN Chicken & Grill</h1>
                <div className='acciones'>
                    <span>[Administrador]</span>
                    <Link to={'/'}>
                        <button path type="submit" className="btn btn-primary btn"><span><FaIcons.FaSignOutAlt /></span>Salir</button>
                    </Link>
                </div>
            </div>
            <div className='listaClientes'>
                <h2>LISTA DE CLIENTES</h2>
                <div className='tabla'>
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Apellido</th>
                                <th scope="col">DNI</th>
                                <th scope="col">DIRECCIÓN</th>
                                <th scope="col">TELÉFONO</th>
                                <th scope="col">FECHACREACIÓN</th>
                                <th scope="col">CORREO</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                records.map((val, key) => {
                                    return <tr key={val.cliente_id}>
                                        <th>{val.cliente_id}</th>
                                        <td>{val.nombre}</td>
                                        <td>{val.apellido}</td>
                                        <td>{val.dni}</td>
                                        <td>{val.direccion}</td>
                                        <td>{val.telefono}</td>
                                        <td>{new Date(val.fechaCreacion).toLocaleDateString()}</td>
                                        <td>{val.correo}</td>
                                        
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                    <nav>
                        <ul className='pagination'>
                        <li className='page-item'>
                            <a href='#' className='page-link' onClick={prePage}>Prev</a>
                        </li>
                        {
                            numbers.map((n, i)=> (
                            <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                                <a href='#' className='page-link2'
                                onClick={() => changeCPage(n)}>{n}</a>
                            </li>
                            ))
                        }
                        <li className='page-item'>
                            <a href='#' className='page-link' onClick={nextPage}>Next</a>
                        </li>

                        </ul>
                    </nav>
                </div>
            </div>

        </div>
    )
}

export default Cliente;