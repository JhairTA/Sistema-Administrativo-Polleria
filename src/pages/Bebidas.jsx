import '../styles/Navbar.scss'
import React, { useState , useEffect} from 'react'
import * as FaIcons from 'react-icons/fa'
import { Link, Route, Routes } from 'react-router-dom';
import Axios from 'axios'

import Swal from 'sweetalert2'


const Bebidas = () => {
  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState();
  const [unidadMedida, setUnidadMedida] = useState();
  const [importe, setImporte] = useState();
  const [PrecioUnit, setPrecioUnit] = useState();
  const [fechaCompra, setFechaCompra] = useState("");
  const [bebida_id, setBebida_id] = useState();
  const [marca_id, setMarca_id] = useState("");

  const [editar, setEditar] = useState(false);
  const [bebidasList, setBebidas] = useState([]);

  const [marca, setMarca] = useState([]);
  const [compañia, setCompañia] = useState([]);
  const [currentPage, setCurrentPage] = useState(1)
  const recordsPerPage = 3;
  const lastIndex = currentPage * recordsPerPage;
  const firsIndex = lastIndex - recordsPerPage;
  const records = bebidasList.slice(firsIndex, lastIndex);
  const npage = Math.ceil(bebidasList.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1)

  const add = () => {
    if (nombre.trim() === '' || cantidad.trim() === '' || unidadMedida.trim() === '' || importe.trim() === '' || PrecioUnit.trim() === '' || fechaCompra.trim() === '' || marca_id.trim() === '') {
      Swal.fire({
        icon: 'info',
        title: 'Oops...',
        text: 'Por favor, completa todos los campos.',
      });
      return;
    }
    Axios.post("http://localhost:3001/createBebida", {
      nombre: nombre,
      cantidad: cantidad,
      unidadMedida: unidadMedida,
      importe: importe,
      PrecioUnit: PrecioUnit,
      fechaCompra: fechaCompra,
      marca_id: marca_id
    }).then(() => {
      limpiarCampos();
      Swal.fire({
        title: "<strong>Compra registrada!</strong>",
        html: "<i>La compra <strong>" + nombre + "</strong> fue agregada con éxito!</i>",
        icon: 'success'
      })
    });
  }

  const update = () => {
    Axios.put("http://localhost:3001/updateBebida", {
      bebida_id: bebida_id,
      nombre: nombre,
      cantidad: cantidad,
      unidadMedida: unidadMedida,
      importe: importe,
      PrecioUnit: PrecioUnit,
      fechaCompra: fechaCompra,
      marca_id: marca_id
    }).then(() => {
      limpiarCampos();
      Swal.fire({
        title: "<strong>Compra Actualizada!</strong>",
        html: "<i>La compra <strong>" + bebida_id + "</strong> fue actualizada exitosamente!</i>",
        icon: 'success'
      })
    });
  }

  const deleteBebida = (val) => {
    Swal.fire({
      title: 'Comfirmar eliminado?',
      html: "<i>Realmente desea eliminar la compra <strong>" + val.nombre + "</strong>?</i>",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:3001/deleteBebida/${val.bebida_id}`).then(() => {
          limpiarCampos();
          Swal.fire(
            'Eliminada!',
            val.nombre + ' fue eliminado.',
            'success'
          )
        }).catch(function (error) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se logro eliminar la compra!',
            footer: JSON.parse(JSON.stringify(error)).message === "Network Error" ? "Intente más tarde" : JSON.parse(JSON.stringify(error)).message
          })
        });
      }
    })

  }

  useEffect(() => {
    Axios.get("http://localhost:3001/datosBebida")
      .then(response => { 
        setMarca(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const limpiarCampos = () => {
    setNombre("");
    setCantidad("");
    setUnidadMedida("");
    setImporte("");
    setPrecioUnit("");
    setFechaCompra("");
    setMarca_id("");
    setEditar(false);
  }

  const editarBebida = (val) => {
    setEditar(true);
    setNombre(val.nombre);
    setCantidad(val.cantidad);
    setUnidadMedida(val.unidadMedida);
    setImporte(val.importe);
    setPrecioUnit(val.PrecioUnit);

    // Formatear la fecha en el formato adecuado
    const formattedDate = new Date(val.fechaCompra).toISOString().split('T')[0];
    setFechaCompra(formattedDate);

    setMarca_id(val.marca_id);
    setBebida_id(val.bebida_id);
  }

  function prePage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function nextPage() {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  }

  function changeCPage(id) {
    setCurrentPage(id)
  }


  const getBebidas = () => {
    Axios.get("http://localhost:3001/bebidas").then((response) => {
      setBebidas(response.data);
    });
  }

  getBebidas();

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
      <div className='registroCompra'>
        <h2>REGISTRAR COMPRAS</h2>
        <div className="datos">
          <div className='formularioResgistro'>
          <div className='primerCampo'>
            <label>Descripción: <input value={nombre}
              onChange={(event) => {
                setNombre(event.target.value);
              }}
              type="text" placeholder='Ingrese el nombre' /></label>
            <label>Cantidad: <input value={cantidad}
              onChange={(event) => {
                setCantidad(event.target.value);
              }}
              type="number" step="1" placeholder='Ingrese la cantidad' /></label>
          </div>
          <div className='segundoCampo'>
            <label>Capacidad(ml): <input value={unidadMedida}
              onChange={(event) => {
                setUnidadMedida(event.target.value);
              }}
              type="number" step="1" placeholder='Ingrese la capacidad' /></label>
            <label>Importe: <input value={importe}
              onChange={(event) => {
                setImporte(event.target.value);
              }}
              type="number" step="0.01" placeholder='Ingrese el importe total' /></label>
          </div>
          <div className='terceroCampo'>
            <label>Precio Unitario: <input value={PrecioUnit}
              onChange={(event) => {
                setPrecioUnit(event.target.value);
              }}
              type="number" step="0.01" placeholder='Ingrese el precio unitario' /></label>
             <label>Fecha: <input value={fechaCompra}
              onChange={(event) => {
                setFechaCompra(event.target.value);
              }}
              type="date"/></label>
          </div>
          <div className='cuartoCampo'>
            <label>Marca:
              <select value={marca_id}
                onChange={(event) => {
                  setMarca_id(event.target.value);
                }}>
                <option defaultValue>Seleccione una marca</option>
                {marca.map(elemento => (
                  <option key={elemento.marca_id} value={elemento.marca_id}>{elemento.marca} 
                  </option>
                ))}
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
        <h2>LISTA DE COMPRAS</h2>
        <div className='tabla'>
          <table>
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Descripcion</th>
                <th scope="col">Cantidad</th>
                <th scope="col">Capacidad(ml)</th>
                <th scope="col">Importe</th>
                <th scope="col">Precio Venta</th>
                <th scope="col">FechaCompra</th>
                <th scope="col">Marca</th>
                <th scope="col">Compañia</th>
                <th scope="col">Mantenimiento</th>
              </tr>
            </thead>
            <tbody>
              {
                records.map((val, key) => {
                  return <tr key={val.bebida_id}>
                    <th>{val.bebida_id}</th>
                    <td>{val.nombre}</td>
                    <td>{val.cantidad}</td>
                    <td>{val.unidadMedida}</td>
                    <td>{val.importe}</td>
                    <td>{val.PrecioUnit}</td>
                    <td>{new Date(val.fechaCompra).toLocaleDateString()}</td>
                    <td>{val.marca}</td>
                    <td>{val.compañia}</td>
                    <td>
                      <button type='button'
                        onClick={() => {
                          editarBebida(val)
                        }}
                        className='btnEditar btnEdit'><span><FaIcons.FaEdit/></span></button>
                      <button type='button' onClick={() => {
                        deleteBebida(val)
                      }} className='btnEliminar btnDelet'><span><FaIcons.FaTimesCircle/></span></button>
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
                numbers.map((n, i) => (
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

export default Bebidas;