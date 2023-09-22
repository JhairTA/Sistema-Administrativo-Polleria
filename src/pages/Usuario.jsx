import Axios from 'axios'
import '../styles/Usuario.scss'
import React, { useEffect, useState , Component} from 'react'
import * as FaIcons from 'react-icons/fa'
import { Link, Route, Routes } from 'react-router-dom';
import Swal from 'sweetalert2'
import { Alert } from 'reactstrap';
import Sidebar from '../Components/Sidebar';


const Usuario = () =>{
    const [nombre_usuario, SetNombre_Usuario] = useState("");
    const [contraseña, SetContraseña] = useState("");
    const [fechaCreacion, SetFechaCreacion] = useState("");
    const [usuario_id, setUsuario_id] = useState();
    const [rol_id, setRol_Id] = useState("");

    const [editar, setEditar] = useState(false);
    const [usuarioList, setUsuarios] = useState([]);

    const [roles, setRoles] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const recordsPerPage = 4;
    const lastIndex = currentPage * recordsPerPage;
    const firsIndex = lastIndex - recordsPerPage;
    const records = usuarioList.slice(firsIndex, lastIndex);
    const npage = Math.ceil(usuarioList.length/ recordsPerPage);
    const numbers = [...Array(npage + 1).keys()].slice(1)

    const add = () =>{

      const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z]).{8,}$/;

      if (nombre_usuario.trim() === '' || contraseña.trim() === '') {
        Swal.fire({
        icon: 'info',
        title: 'Oops...',
        text: 'Por favor, completa todos los campos.',
      });
      return;
      } 

      if (!passwordRegex.test(contraseña)) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text:
            'La contraseña debe tener al menos 8 caracteres, un número, un carácter especial y una letra mayúscula.',
        });
        return;
      }

      Axios.post("http://localhost:3001/createUser",{
          nombre_usuario:nombre_usuario,
          contraseña:contraseña,
          fechaCreacion:fechaCreacion,
          rol_id:rol_id
      }).then(()=>{
          limpiarCampos();
          Swal.fire({
            title: "<strong>Usuario registrado!</strong>",
            html: "<i>El Usuario <strong>"+nombre_usuario+ "</strong> fue agregado con éxito!</i>",
            icon: 'success'
          })
      });

    }

    const update = () =>{
        Axios.put("http://localhost:3001/updateUser",{
            usuario_id: usuario_id,
            nombre_usuario:nombre_usuario,
            contraseña:contraseña,
            fechaCreacion:fechaCreacion,
            rol_id:rol_id
        }).then(()=>{
          limpiarCampos();
          Swal.fire({
            title: "<strong>Usuario Actualizado!</strong>",
            html: "<i>El Usuario <strong>"+usuario_id+ "</strong> fue actualizado exitosamente!</i>",
            icon: 'success'
          })
        });
    }

    const deleteUsuario = (val) =>{
        Swal.fire({
          title: 'Comfirmar eliminado?',
          html: "<i>Realmente desea eliminar el usuario <strong>"+val.nombre_usuario+ "</strong>?</i>",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, eliminarlo!'
        }).then((result) => {
          if (result.isConfirmed) {
            Axios.delete(`http://localhost:3001/deleteUser/${val.usuario_id}`).then(()=>{
              limpiarCampos();
              Swal.fire(
                'Eliminado!',
                val.nombre_usuario + ' fue eliminado.',
                'success'
              )
            }).catch(function(error){
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No se logro eliminar el usuario!',
                footer: JSON.parse(JSON.stringify(error)).message === "Network Error"? "Intente más tarde":JSON.parse(JSON.stringify(error)).message
              })
            });
          }
        })     
    }

    useEffect(()=>{
        Axios.get("http://localhost:3001/datos")
        .then(response =>{
           setRoles(response.data);
           console.log("Roles Data:", response.data);
        })
        .catch(error =>{
            console.error(error);
        });
    }, []);

    const limpiarCampos = () =>{
        SetNombre_Usuario("");
        SetContraseña("");
        SetFechaCreacion("");
        setRol_Id("");
        setEditar(false);
    }

    const editarUsuario = (val) =>{
        console.log(val);
        console.log(val.rol_id);
        setEditar(true);
        SetNombre_Usuario(val.nombre_usuario);
        SetContraseña(val.contraseña);

        // Formatear la fecha en el formato adecuado
        const formattedDate = new Date(val.fechaCreacion).toISOString().split('T')[0];
        SetFechaCreacion(formattedDate);

        setRol_Id(val.rol_id);
        setUsuario_id(val.usuario_id);
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

    const getUsuarios = () =>{
        Axios.get("http://localhost:3001/usuarios").then((response)=>{
            setUsuarios(response.data);
        });
      }
    
    getUsuarios();

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
            <div className='registroUsuario'>
                <h2>REGISTRAR USUARIO</h2>
                <div className='formularioResgistroUsuario'>
                    <div className='campos'>
                        <div className='camposDerecha'>
                            <label>Usuario: <input value={nombre_usuario}
                            onChange={(event) =>{
                                SetNombre_Usuario(event.target.value);
                            }}
                            type="text" placeholder='Ingrese el usuario'/></label>
                            <label>Contraseña: <input value={contraseña} 
                            onChange={(event) =>{ 
                                SetContraseña(event.target.value);
                            }}
                            type="password" placeholder='Ingrese la contraseña'/></label>  
                        </div>
                        <div className='camposIzquierda'>
                            <label>Fecha: <input value={fechaCreacion}
                            onChange={(event) =>{ 
                                SetFechaCreacion(event.target.value);
                            }}
                            type="date"/></label>
                            <label>Rol: 
                              <select value={rol_id} onChange={(event) =>{ setRol_Id(event.target.value); }}>
                                  {/* <option defaultValue>Seleccione un rol</option> */}
                                  <option value="" disabled>Seleccione un rol</option>
                                  {roles.map(elemento => (
                                    <option key={elemento.rol_id} value={elemento.rol_id}>{elemento.nombre}
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
            <h2>LISTA DE USUARIOS</h2>
            <div className='tabla'>
              <table>
                <thead>
                  <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Usuario</th>
                    <th scope="col">Contraseña</th>
                    <th scope="col">Fecha de Creacion</th>
                    <th scope="col">Rol</th>
                    <th scope="col">Mantenimiento</th>
                  </tr>
                </thead>
                <tbody>
                {
                  records.map((val,key)=>{
                    return <tr key={val.usuario_id}>
                    <th>{val.usuario_id}</th>
                    <td>{val.nombre_usuario}</td>
                    <td>{val.contraseña}</td>
                    {/* <td>{val.fechaCreacion}</td> */}
                    <td>{new Date(val.fechaCreacion).toLocaleDateString()}</td>
                    <td>{val.nombre}</td>
                    <td>
                        <button type='button' 
                        onClick={()=>{
                           editarUsuario(val)
                        }}
                        className='btnEditar'>Editar</button>
                      <button type='button' onClick={()=>{
                        deleteUsuario(val)
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

export default Usuario;