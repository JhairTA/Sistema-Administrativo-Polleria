import '../styles/Navbar.scss'
import React, { useState , useEffect} from 'react'
import * as FaIcons from 'react-icons/fa'
import { Link, Route, Routes } from 'react-router-dom';
import Axios from 'axios'

import Swal from 'sweetalert2'


const Plato = () => {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState();
  const [plato_id, setPalto_id] = useState();
  const [categoria_id, setCategoria_id] = useState("");

  const [editar, setEditar] = useState(false);
  const [platosList, setPlatos] = useState([]);

  const [categoria, setCategoria] = useState([]);
  const [currentPage, setCurrentPage] = useState(1)
  const recordsPerPage = 4;
  const lastIndex = currentPage * recordsPerPage;
  const firsIndex = lastIndex - recordsPerPage;
  const records = platosList.slice(firsIndex, lastIndex);
  const npage = Math.ceil(platosList.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1)

  const add = () => {
    if (nombre.trim() === '' || precio.trim() === '' || categoria_id.trim() === '') {
      Swal.fire({
        icon: 'info',
        title: 'Oops...',
        text: 'Por favor, completa todos los campos.',
      });
      return;
    }
    Axios.post("http://localhost:3001/create", {
      nombre: nombre,
      precio: precio,
      categoria_id: categoria_id
    }).then(() => {
      limpiarCampos();
      Swal.fire({
        title: "<strong>Plato registrado!</strong>",
        html: "<i>El Plato <strong>" + nombre + "</strong> fue agregado con éxito!</i>",
        icon: 'success'
      })
    });
  }

  const update = () => {
    Axios.put("http://localhost:3001/update", {
      plato_id: plato_id,
      nombre: nombre,
      precio: precio,
      categoria_id: categoria_id
    }).then(() => {
      limpiarCampos();
      Swal.fire({
        title: "<strong>Plato Actualizado!</strong>",
        html: "<i>El Plato <strong>" + plato_id + "</strong> fue actualizado exitosamente!</i>",
        icon: 'success'
      })
    });
  }

  const deletePlato = (val) => {
    Swal.fire({
      title: 'Comfirmar eliminado?',
      html: "<i>Realmente desea eliminar el plato <strong>" + val.nombre + "</strong>?</i>",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:3001/delete/${val.plato_id}`).then(() => {
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
            text: 'No se logro eliminar el plato!',
            footer: JSON.parse(JSON.stringify(error)).message === "Network Error" ? "Intente más tarde" : JSON.parse(JSON.stringify(error)).message
          })
        });
      }
    })

  }

  useEffect(() => {
    Axios.get("http://localhost:3001/datoscat")
      .then(response => {
        setCategoria(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const limpiarCampos = () => {
    setNombre("");
    setPrecio("");
    setCategoria_id("");
    setEditar(false);
  }

  const editarPlato = (val) => {
    setEditar(true);
    setNombre(val.nombre);
    setPrecio(val.precio);
    setCategoria_id(val.categoria_id);
    setPalto_id(val.plato_id);
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


  const getPlatos = () => {
    Axios.get("http://localhost:3001/platos").then((response) => {
      setPlatos(response.data);
    });
  }

  getPlatos();

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
      <div className='registroPlatos'>
        <h2>REGISTRAR PLATOS</h2>
        <div className="datos">
          <div className='formularioResgistro'>
          <div className='primerCampo'>
            <label>Nombre: <input value={nombre}
              onChange={(event) => {
                setNombre(event.target.value);
              }}
              type="text" placeholder='Ingrese el nombre' /></label>
            <label>Precio: <input value={precio}
              onChange={(event) => {
                setPrecio(event.target.value);
              }}
              type="number" step="0.01" placeholder='Ingrese el precio' /></label>
          </div>
          <div className='segundoCampo'>
            <label>Categoria:
              <select value={categoria_id}
                onChange={(event) => {
                  setCategoria_id(event.target.value);
                }}>
                <option defaultValue>Seleccione una categoria</option>
                {categoria.map(elemento => (
                  <option key={elemento.categoria_id} value={elemento.categoria_id}>{elemento.nombre}
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
        <h2>LISTA DE PLATOS</h2>
        <div className='tabla'>
          <table>
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Descripcion</th>
                <th scope="col">Precio</th>
                <th scope="col">Categoria</th>
                <th scope="col">Mantenimiento</th>
              </tr>
            </thead>
            <tbody>
              {
                records.map((val, key) => {
                  return <tr key={val.plato_id}>
                    <th>{val.plato_id}</th>
                    <td>{val.nombre}</td>
                    <td>{val.precio}</td>
                    <td>{val.categoria}</td>
                    <td>
                      <button type='button'
                        onClick={() => {
                          editarPlato(val)
                        }}
                        className='btnEditar'>Editar</button>
                      <button type='button' onClick={() => {
                        deletePlato(val)
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

export default Plato;