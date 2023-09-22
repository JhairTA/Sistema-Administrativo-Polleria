import Axios from 'axios'
import '../styles/Usuario.scss'
import React, { useEffect, useState , Component} from 'react'
import * as FaIcons from 'react-icons/fa'
import { Link, Route, Routes } from 'react-router-dom';
import Swal from 'sweetalert2'
import { Alert } from 'reactstrap';


const Pedido = () =>{
    
    const [pedidoList, setPedidos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1)
    const recordsPerPage = 9;
    const lastIndex = currentPage * recordsPerPage;
    const firsIndex = lastIndex - recordsPerPage;
    const records = pedidoList.slice(firsIndex, lastIndex);
    const npage = Math.ceil(pedidoList.length/ recordsPerPage);
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

    const getPedidos = () =>{
        Axios.get("http://localhost:3001/pedidos").then((response)=>{
            setPedidos(response.data);
        });
      }
    
      getPedidos();

    return(
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
            <h2>LISTA DE PEDIDOS</h2>
            <div className='tabla'>
              <table>
                <thead>
                  <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Fecha Emision</th>
                    <th scope="col">Total</th>
                    <th scope="col">Usuario</th>
                    <th scope="col">Cliente</th>
                    <th scope="col">Mesa</th>
                  </tr>
                </thead>
                <tbody>
                {
                  records.map((val,key)=>{
                    return <tr key={val.pedido_id}>
                    <th>{val.pedido_id}</th>
                    <td>{new Date(val.fechaEmision).toLocaleDateString()}</td>
                    <td>{val.total}</td>
                    <td>{val.nombre_usuario}</td>
                    <td>{val.nombre}</td>
                    <td>{val.numMesa}</td>
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

export default Pedido;