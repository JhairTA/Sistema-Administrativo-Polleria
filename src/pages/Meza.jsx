import '../styles/Mesa.scss'
import React, { useState } from 'react'
import * as FaIcons from 'react-icons/fa'
import { Link, Route, Routes } from 'react-router-dom';
import Axios from 'axios'

import Swal from 'sweetalert2'

const Meza = () => {
    const [numMesa, setNumMesa] = useState("");
    const [numAsientos, setNumAsientos] = useState();
    const [estado, setEstado] = useState("");
    const [mesa_id, setMesa_id] = useState();

    const [editar, setEditar] = useState(false);

    const [mesaList, setMesa] = useState([]);
    const [currentPage, setCurrentPage] = useState(1)
    const recordsPerPage = 4;
    const lastIndex = currentPage * recordsPerPage;
    const firsIndex = lastIndex - recordsPerPage;
    const records = mesaList.slice(firsIndex, lastIndex);
    const npage = Math.ceil(mesaList.length/ recordsPerPage);
    const numbers = [...Array(npage + 1).keys()].slice(1)

    const add = () => {
      if (numMesa.trim() === ''|| numAsientos.trim() === ''|| estado.trim() === '') {
        Swal.fire({
        icon: 'info',
        title: 'Oops...',
        text: 'Por favor, completa todos los campos.',
      });
      return;
      } 
      Axios.post("http://localhost:3001/createmesa", {
          numMesa: numMesa,
          numAsientos: numAsientos,
          estado: estado
      }).then(() => {
          limpiarCampos();
          Swal.fire({
              title: "<strong>Mesa registrada!</strong>",
              html: "<i>La mesa <strong>" + numMesa + "</strong> fue agregada con éxito!</i>",
              icon: 'success'
          })
      });
  }

    const update = () => {
        Axios.put("http://localhost:3001/updatemesa", {
            mesa_id: mesa_id,
            numMesa: numMesa,
            numAsientos: numAsientos,
            estado: estado
        }).then(() => {
            limpiarCampos();
            Swal.fire({
                title: "<strong>Mesa Actualizada!</strong>",
                html: "<i>La Mesa <strong>" + mesa_id + "</strong> fue actualizada exitosamente!</i>",
                icon: 'success'
            })
        });
    }

    const deleteMesa = (val) => {
        Swal.fire({
            title: 'Comfirmar eliminado?',
            html: "<i>Realmente desea eliminar la mesa <strong>" + val.numMesa + "</strong>?</i>",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminarlo!'
        }).then((result) => {
            if (result.isConfirmed) {
                Axios.delete(`http://localhost:3001/deletemesa/${val.mesa_id}`).then(() => {
                    limpiarCampos();
                    Swal.fire(
                        'Eliminada!',
                        val.numMesa + ' fue eliminada.',
                        'success'
                    )
                }).catch(function (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'No se logro eliminar la mesa!',
                        footer: JSON.parse(JSON.stringify(error)).message === "Network Error" ? "Intente más tarde" : JSON.parse(JSON.stringify(error)).message
                    })
                });
            }
        })

    }

    const limpiarCampos = () => {
        setNumMesa("");
        setNumAsientos("");
        setEstado("");
        setEditar(false);
    }

    const editarMesa = (val) => {
        setEditar(true);
        setNumMesa(val.numMesa);
        setNumAsientos(val.numAsientos);
        setEstado(val.estado);
        setMesa_id(val.mesa_id);
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


    const getMesa = () => {
        Axios.get("http://localhost:3001/mesa").then((response) => {
            setMesa(response.data);
        });
    }

    getMesa();
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
            <div className='registroMesa'>
              <h2>REGISTRAR MESA</h2>
              <div className="datos">
                  <div className='formularioResgistroMesa'>
                    <div className='primerCampo'>
                      <label>Nro Mesa: <input value={numMesa}
                      onChange={(event) =>{
                          setNumMesa(event.target.value);
                      }}
                      type="text" placeholder='Ingrese el Nro de Mesa'/></label>
                      <label>Nro Asientos: <input  value={numAsientos}
                      onChange={(event) =>{
                          setNumAsientos(event.target.value);
                      }}
                      type="number" step="1" placeholder='Ingrese el Nro de Asientos'/></label>
                    </div>
                    <div className='segundoCampo'>
                      <label>Estado:
                        <select value={estado}
                          onChange={(event) =>{ 
                            setEstado(event.target.value);
                          }}>
                            <option value="" disabled>Seleccione un Cliente</option>
                            <option value="Disponible" >Disponible</option>
                            <option value="Ocupado" >Ocupado</option>
                            <option value="Limpieza" >Limpieza</option>
                        </select>
                      </label>
                    </div>
                  </div>
                  <div className='containerButton'>
                    {
                      editar ?
                        <div>
                          <button className='btn2 btn-actualizar' onClick={update}>Actualizar</button>
                          <button className='btn2 btn_cancelar' onClick={limpiarCampos}>Cancelar</button>
                        </div>
                        : <button className='btn btn-primary' onClick={add}>Registrar</button>
                    }
                  </div>
              </div>
            </div>
            <div className='listaProductos'>
              <h2>LISTA DE MESAS</h2>
              <div className='tabla'>
                <table>
                  <thead>
                    <tr>
                      <th scope="col">Id</th>
                      <th scope="col">Mesa</th>
                      <th scope="col">NroAsientos</th>
                      <th scope="col">Estado</th>
                      <th scope="col">Mantenimiento</th>
                    </tr>
                  </thead>
                  <tbody>
                  {
                    records.map((val,key)=>{
                      return <tr key={val.mesa_id}>
                      <th>{val.mesa_id}</th>
                      <td>{val.numMesa}</td>
                      <td>{val.numAsientos}</td>
                      <td>{val.estado}</td>
                      <td>
                          <button type='button' 
                          onClick={()=>{
                            editarMesa(val)
                          }}
                          className='btnEditar'>Editar</button>
                        <button type='button' onClick={()=>{
                          deleteMesa(val)
                        }} className='btnEliminar'>Eliminar</button>
                      </td>
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

export default Meza;
