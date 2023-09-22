import Axios from 'axios'
import '../styles/Usuario.scss'
import React, { useEffect, useState , Component} from 'react'
import * as FaIcons from 'react-icons/fa'
import { Link, Route, Routes } from 'react-router-dom';
import Swal from 'sweetalert2'
import { Alert } from 'reactstrap';


const PedidoMozo = () =>{
    const [pedido_id, setPedido_id] = useState();
    const [fechaEmision, setFechaEmision] = useState("");
    const [pedidoList, setPedidos] = useState([]);
    const [usuario_id, setUsuario_Id] = useState("");
    const [usuarios, setUsuarios] = useState([]);
    const [cliente_id, setCliente_Id] = useState("");
    const [clientes, setClientes] = useState([]);
    const [mesa_id, setMesa_Id] = useState("");
    const [mesas, setMesas] = useState([]);
    const [plato_id, setPlato_Id] = useState("");
    const [platos, setPlatos] = useState([]);
    const [precio, setPrecio] = useState(0);
    const [detallePedido, setDetallePedido] = useState([]);
    const [total, setTotal] = useState(0);
    const [editar, setEditar] = useState(false);

    //Paginacion
    const [currentPage, setCurrentPage] = useState(1)
    const recordsPerPage = 5;
    const lastIndex = currentPage * recordsPerPage;
    const firsIndex = lastIndex - recordsPerPage;
    const records = pedidoList.slice(firsIndex, lastIndex);
    const npage = Math.ceil(pedidoList.length/ recordsPerPage);
    const numbers = [...Array(npage + 1).keys()].slice(1)

    useEffect(()=>{
      Axios.get("http://localhost:3001/datosuser")
      .then(response =>{
        setUsuarios(response.data);
      })
      .catch(error =>{
          console.error(error);
      });

      Axios.get("http://localhost:3001/datosclient")
      .then(response =>{
        setClientes(response.data);
      })
      .catch(error =>{
          console.error(error);
      });

      Axios.get("http://localhost:3001/datosmesa")
      .then(response =>{
        setMesas(response.data);
      })
      .catch(error =>{
          console.error(error);
      });

      Axios.get("http://localhost:3001/datosplato")
      .then(response =>{
        console.log("Platos Data:", response.data); 
        setPlatos(response.data);
      })
      .catch(error =>{
          console.error(error);
      });

      const calculatedTotal = detallePedido.reduce((acc, detalle) => acc + detalle.importe, 0);
      setTotal(calculatedTotal);
    }, []);


    const addDetallePedido = () =>{
      // Busca el plato seleccionado en la lista de platos
      const selectedPlato = platos.find(plato => plato.plato_id.toString() === plato_id);

      // Obtén el valor de cantidad desde el input correspondiente (reemplaza 'inputCantidad' por el id o referencia correcta)
      const cantidad = parseFloat(document.getElementById('campoCantidad').value);

      if (selectedPlato && !isNaN(cantidad) && cantidad > 0) {
        const detalleExistente = detallePedido.find(detalle => detalle.plato.plato_id === selectedPlato.plato_id);
        if (detalleExistente) {
          // Swal.fire({
          //   title: "<strong>Error!</strong>",
          //   html: "<i>El plato ya fue agregado al pedido!</i>",
          //   icon: 'error'
          // })
          // return;
          detalleExistente.cantidad += cantidad;

          detalleExistente.importe = detalleExistente.precio * detalleExistente.cantidad;

          setDetallePedido([...detallePedido]);

          // Limpia los campos después de agregar el detalle
          setPlato_Id(""); // Limpia el campo de plato seleccionado
          setPrecio(0);    // Limpia el campo de precio
          document.getElementById('campoCantidad').value = "1";

          setTotal(total + detalleExistente.precio * cantidad);

        }else{
          // Calcula el importe multiplicando el precio por la cantidad
          const importe = selectedPlato.precio * cantidad;
  
          // Crea un nuevo objeto con los detalles del pedido
          const nuevoDetalle = {
            plato: selectedPlato,
            precio: selectedPlato.precio,
            cantidad: cantidad,
            importe: importe,
          };

          // Agrega el nuevo detalle al estado del detalle del pedido
          setDetallePedido([...detallePedido, nuevoDetalle]);
  
          // Limpia los campos después de agregar el detalle
          setPlato_Id(""); // Limpia el campo de plato seleccionado
          setPrecio(0);    // Limpia el campo de precio
          document.getElementById('campoCantidad').value = "1";
  
          // Actualiza el total
          setTotal(total + importe);
        }

      }
    }

    const add = () =>{
      if (usuario_id.trim() === '' || cliente_id.trim() === '' || mesa_id.trim() === '' || fechaEmision.trim() === '') {
        Swal.fire({
        icon: 'info',
        title: 'Oops...',
        text: 'Por favor, completa todos los campos.',
      });
      return;
      }
      if (isMesaEnUso(parseInt(mesa_id))) {
        Swal.fire({
          icon: 'error',
          title: 'Mesa en Uso',
          text: 'La mesa seleccionada ya está en uso.',
        });
        return;
      }

      Axios.post("http://localhost:3001/createpedido",{
          fechaEmision:fechaEmision,
          total:total,
          usuario_id:usuario_id,
          cliente_id:cliente_id,
          mesa_id:mesa_id
      }).then(()=>{
          Swal.fire({
            title: "<strong>Pedido registrado!</strong>",
            html: "<i>El Pedido fue agregado con éxito!</i>",
            icon: 'success'
          })
          limpiarCampos();
      });
      setDetallePedido([]);
      // setTimeout(() => {
      //   window.location.reload();
      // }, 1000);
    }

    const update = () =>{
      console.log("Pedido ID antes de actualizar:", pedido_id);
      if (isMesaEnUso(parseInt(mesa_id), pedido_id)) {
        Swal.fire({
          icon: 'error',
          title: 'Mesa en Uso',
          text: 'La mesa seleccionada ya está en uso.',
        });
        return;
      }
      Axios.put("http://localhost:3001/updatepedido",{
          pedido_id : pedido_id, 
          fechaEmision : fechaEmision,
          total : total,
          usuario_id : usuario_id,
          cliente_id : cliente_id,
          mesa_id : mesa_id
      }).then(()=>{
        Swal.fire({
          title: "<strong>Pedido Actualizado!</strong>",
          html: "<i>El pedido <strong>"+pedido_id+ "</strong> fue actualizado exitosamente!</i>",
          icon: 'success'
        })
        limpiarCampos();
      });
    }

    const deletePedido = (val) =>{
      Swal.fire({
        title: 'Comfirmar eliminado?',
        html: "<i>Realmente desea eliminar el Pedido <strong>"+val.pedido_id+ "</strong>?</i>",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminarlo!'
      }).then((result) => {
        if (result.isConfirmed) {
          Axios.delete(`http://localhost:3001/deletepedido/${val.pedido_id}`).then(()=>{
            Swal.fire(
              'Eliminado!',
              'Pedido ' + val.pedido_id + ' fue eliminado.',
              'success'
            )
            limpiarCampos();
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

    //Elimina los elementos seleccionados en la tabla detalle pedido
    const eliminarDetalle = (index) => {
      const nuevoDetalle = detallePedido.filter((detalle, i) => i !== index);
      setDetallePedido(nuevoDetalle);
    
      // Recalcula el total después de eliminar el detalle
      const nuevoTotal = nuevoDetalle.reduce((acc, detalle) => acc + detalle.importe, 0);
      setTotal(nuevoTotal);
    };

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

    const EditarPedido = (val) => {
      setDetallePedido([]);
      limpiarCampos()
      setEditar(true);
      setPedido_id(val.pedido_id);
      setUsuario_Id(val.usuario_id);
      setCliente_Id(val.cliente_id);
      setMesa_Id(val.mesa_id);

      // Formatear la fecha en el formato adecuado
      const formattedDate = new Date(val.fechaEmision).toISOString().split('T')[0];
      setFechaEmision(formattedDate);
      setTotal(val.total)
    };

    const limpiarCampos = () =>{
      setUsuario_Id("");
      setCliente_Id("");
      setMesa_Id("");
      setFechaEmision("");
      setTotal("")
      setEditar(false);
    }

    // Validar si la mesa a registrar ya esta en el listado
    const isMesaEnUso = (mesaId, currentPedidoId) => {
      const pedidosConMesa = pedidoList.filter(pedido => pedido.mesa_id === mesaId && pedido.pedido_id !== currentPedidoId);
      return pedidosConMesa.length > 0;
    };

    const getPedidos = () =>{
        Axios.get("http://localhost:3001/pedidos").then((response)=>{
            setPedidos(response.data);
            //setDetallePedido([]);
        });
      }
    
      getPedidos();

    return(
        <div className='container2'>
            <div className="navbar">
                <h1>LO DE JUAN Chicken & Grill</h1>
                <div className='acciones'>
                  <span>[Mozo]</span>
                  <Link to={'/'}>
                    <button path type="submit" className="btn btn-primary btn"><span><FaIcons.FaSignOutAlt /></span>Salir</button>
                  </Link>
                </div>
            </div>
            <div className='estructura'>
              <div className='registroListadoPedido'>
                <div className='registroPedido2'>
                    <h2>REGISTRAR PEDIDO</h2>
                    <div className='formularioResgistroUsuario2'>
                            <div className='campos'>
                                <div className='primerCampo'>
                                    <select value={usuario_id}
                                    onChange={(event) =>{ 
                                      setUsuario_Id(event.target.value);
                                    }}>
                                        <option value="" disabled>Seleccione un Usuario</option>
                                        {usuarios.map(elemento => (
                                        <option key={elemento.usuario_id} value={elemento.usuario_id}>{elemento.nombre_usuario}
                                        </option>
                                        ))}
                                    </select>
                                    <select value={cliente_id}
                                    onChange={(event) =>{ 
                                      setCliente_Id(event.target.value);
                                    }}>
                                        <option value="" disabled>Seleccione un Cliente</option>
                                        {clientes.map(elemento => (
                                        <option key={elemento.cliente_id} value={elemento.cliente_id}>{elemento.nombre}
                                        </option>
                                        ))}
                                    </select>
                                    <select value={mesa_id}
                                    onChange={(event) =>{ 
                                      setMesa_Id(event.target.value);
                                    }}>
                                        <option value="" disabled>Seleccione una Mesa</option>
                                        {mesas.map(elemento => (
                                        <option key={elemento.mesa_id} value={elemento.mesa_id}>{elemento.numMesa}
                                        </option>
                                        ))}                              
                                    </select>
                                    <label>Fecha: <input value={fechaEmision}
                                      onChange={(event) =>{ 
                                        setFechaEmision(event.target.value);
                                      }}
                                      type="date"/>
                                    </label>
                                </div>
                                <div className='segundoCampo'>
                                    <select value={plato_id} onChange={(event) =>{ 
                                          const selectedPlatoId = event.target.value;
                                          console.log('Selected Plato ID:', selectedPlatoId);

                                          const selectedPlato = platos.find(plato => plato.plato_id.toString() === selectedPlatoId);
                                          console.log("Selected Plato:", selectedPlato);

                                          if (selectedPlato) {
                                            setPrecio(selectedPlato.precio);
                                          } else {
                                            setPrecio(0); // Si no se encuentra el plato, se establece un precio predeterminado
                                          }
                                          setPlato_Id(selectedPlatoId);                                      
                                        }}>
                                            <option value="" disabled>Seleccione un Plato</option>
                                            {platos.map(elemento => (
                                            <option key={elemento.plato_id} value={elemento.plato_id.toString()}>{elemento.nombre}
                                            </option>
                                            ))}                              
                                    </select>
                                    <label>Precio:
                                      <input id='campoPrecio' type='number' value={precio} readOnly />
                                    </label>
                                    <label>Cantidad: 
                                      <input id='campoCantidad' type='number' defaultValue="1" />
                                    </label>
                                </div>
                                <div className='tercerCampo'>
                                  <button
                                    className="btn2 btn-actualizar"
                                    onClick={ addDetallePedido}
                                  >
                                    Agregar
                                  </button> 
                                </div>
                            </div>
                          </div>  
                </div>            
                <div className='listaProductos2'>
                  <h2>LISTA DE PEDIDOS</h2>
                  <div className='tabla'>
                    <table>
                      <thead>
                        <tr>
                          <th scope="col">Id</th>
                          <th scope="col">Fecha Emision</th>
                          <th scope="col">Usuario</th>
                          <th scope="col">Cliente</th>
                          <th scope="col">Mesa</th>
                          <th scope="col">Total</th>
                          <th scope="col">Mantenimiento</th>
                        </tr>
                      </thead>
                      <tbody>
                      {
                        records.map((val,key)=>{
                          return <tr key={val.pedido_id}>
                          <th>{val.pedido_id}</th>
                          <td>{new Date(val.fechaEmision).toLocaleDateString()}</td>
                          <td>{val.nombre_usuario}</td>
                          <td>{val.nombre}</td>
                          <td>{val.numMesa}</td>
                          <td>{val.total}</td>
                          <td>
                            <button type='button' 
                            onClick={() => EditarPedido(val)}
                            className='btnEditar btnedi'><span><FaIcons.FaEdit/></span></button>
                            <button type='button' onClick={()=>{
                              deletePedido(val)
                            }} className='btnEliminar btneli'><span><FaIcons.FaTimesCircle/></span></button>
                          </td>
                        </tr>
                       })
                      }
                      </tbody>
                    </table>
                    <nav className='containe-pagination'>
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
              <div className='pedido'>
                <h2>DETALLE PEDIDO</h2>
                <div className='tabla'>
                  <table>
                    <thead>
                      <tr>
                        <th scope="col"></th>
                        <th scope="col">Descripción</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Cantidad</th>
                        <th scope="col">Inporte</th>
                      </tr>
                    </thead>
                    <tbody>
                      {detallePedido.map((detalle, index) => (
                        <tr key={index}>
                          <td>
                            <button
                              className="btn-eliminar"
                              onClick={() => eliminarDetalle(index)}
                            >
                             <span><FaIcons.FaTimesCircle/></span>
                            </button>
                          </td>
                          <td>{detalle.plato.nombre}</td>
                          <td>{detalle.precio}</td>
                          <td>{detalle.cantidad}</td>
                          <td>{detalle.importe}</td>
                        </tr>
                      ))}
                  </tbody>
                  </table>
                </div>
                <div className='total'>
                  <p>Total: <input type='number' value={total} readOnly /></p>
                </div>
                {/* <button className='btn2 btn_cancelar' onClick={add} >Finalizar</button> */}
                {
                  editar ? (
                    <>
                      <button className='btn2 btn_cancelar' onClick={update} style={{ backgroundColor: '#8129C2', color: 'white', marginBottom: 5}}>Actualizar</button>
                      <button className='btn2 btn_cancelar' onClick={limpiarCampos} style={{ backgroundColor: 'gray', color: 'white' }}>Cancelar</button>
                    </>
                  ) : (
                    <button className='btn2 btn_cancelar' onClick={add}>Finalizar</button>
                  )
                } 
              </div>
            </div>
       </div>
    )
}

export default PedidoMozo;