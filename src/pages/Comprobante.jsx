import Axios from 'axios'
import '../styles/Usuario.scss'
import React, { useEffect, useState, Component } from 'react'
import * as FaIcons from 'react-icons/fa'
import { Link, Route, Routes } from 'react-router-dom';
import Swal from 'sweetalert2'
import { Alert } from 'reactstrap';


const Comprobante = () => {
    const [comprobanteList, setComprobante] = useState([]);
    const [currentPage, setCurrentPage] = useState(1)
    const recordsPerPage = 9;
    const lastIndex = currentPage * recordsPerPage;
    const firsIndex = lastIndex - recordsPerPage;
    const records = comprobanteList.slice(firsIndex, lastIndex);
    const npage = Math.ceil(comprobanteList.length/ recordsPerPage);
    const numbers = [...Array(npage + 1).keys()].slice(1)

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

    const getComprobantes = () => {
        Axios.get("http://localhost:3001/comprobantes").then((response) => {
            setComprobante(response.data);
        });
    }

    getComprobantes();

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
            <div className='listaProductos'>
                <h2>LISTA DE COMPROBANTES</h2>
                <div className='tabla'>
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Fecha de Cancelación</th>
                                <th scope="col">PedidoId</th>
                                <th scope="col">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                records.map((val, key) => {
                                    return <tr key={val.comprobante_id}>
                                        <th>{val.comprobante_id}</th>
                                        <td>{new Date(val.fechaCancelacion).toLocaleDateString()}</td>
                                        <td>{val.pedido_id}</td>
                                        <td>{val.total}</td>
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

export default Comprobante;
