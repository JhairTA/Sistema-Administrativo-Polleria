import Axios from 'axios'
import '../styles/Usuario.scss'
import React, { useEffect, useState, Component } from 'react'
import * as FaIcons from 'react-icons/fa'
import { Link, Route, Routes } from 'react-router-dom';
import Swal from 'sweetalert2'
import { Alert } from 'reactstrap';
import qr_polleria from '../assets/qr_polleria.png';
import ComprobantePDF from '../pages/ComprobantePDF';



const ComprobanteCajero = () => {
    const [comprobanteList, setComprobante] = useState([]);
    const [pedidos, setPedidos] = useState([]);
    const [pedido_id, setPedido_id] = useState("");
    const [usuario_id, setUsuario_id] = useState("");
    const [nombre_usuario, setNombre_usuario] = useState("");
    const [cliente_id, setCliente_Id] = useState("");
    const [nombre, setNombre] = useState("");
    const [mesa_id, setMesa_Id] = useState("");
    const [numMesa, setNumMesa] = useState("");
    const [precio, setPrecio] = useState(0);
    const [total, setTotal] = useState(0);
    const [dni, setDni] = useState("");
    const [fechaCancelacion, setFechaCancelacion] = useState("");

    const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);
    const [mostrarModalPDF, setMostrarModalPDF] = useState(false);
    const [comprobanteSeleccionado, setComprobanteSeleccionado] = useState(null);

    useEffect(()=>{
        Axios.get("http://localhost:3001/datospedido")
        .then(response =>{
            setPedidos(response.data);
        })
        .catch(error =>{
            console.error(error);
        });
    }, []);

    const seleccionarComprobante = (comprobante) => {
        setComprobanteSeleccionado(comprobante);
        //console.log(comprobante)
    }

    const add = () =>{
        if (pedido_id.trim() === '' || fechaCancelacion.trim() === '') {
            Swal.fire({
            icon: 'info',
            title: 'Oops...',
            text: 'Por favor, completa todos los campos.',
          });
          return;
        }  
        Axios.post("http://localhost:3001/createcomprobante",{
          fechaCancelacion:fechaCancelacion,
          pedido_id:pedido_id
      }).then(()=>{
          Swal.fire({
            title: "<strong>Comprobante generado!</strong>",
            html: "<i>El comprobante fue genrado con éxito!</i>",
            icon: 'success'
          })
          limpiarCampos();
      });
    }

    const deleteComprobante = (val) =>{
        Swal.fire({
          title: 'Comfirmar eliminado?',
          html: "<i>Realmente desea eliminar el Comprobante <strong>"+val.comprobante_id+ "</strong>?</i>",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, eliminarlo!'
        }).then((result) => {
          if (result.isConfirmed) {
            Axios.delete(`http://localhost:3001/deletecomprobante/${val.comprobante_id}`).then(()=>{
              Swal.fire(
                'Eliminado!',
                'Pedido ' + val.comprobante_id + ' fue eliminado.',
                'success'
              )
              limpiarCampos();
            }).catch(function(error){
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No se logro eliminar el comprobante!',
                footer: JSON.parse(JSON.stringify(error)).message === "Network Error"? "Intente más tarde":JSON.parse(JSON.stringify(error)).message
              })
            });
          }
        })   
      }

    const seleccionarPedido = (event) => {
        const selectedPedidoId = event.target.value;
        const selectedPedido = pedidos.find(pedido => pedido.pedido_id.toString() === selectedPedidoId);

        if (selectedPedido) {
            setUsuario_id(selectedPedido.usuario_id);
            setNombre_usuario(selectedPedido.nombre_usuario);
            setCliente_Id(selectedPedido.cliente_id);
            setNombre(selectedPedido.nombre);
            setMesa_Id(selectedPedido.mesa_id);
            setNumMesa(selectedPedido.numMesa);
            setTotal(selectedPedido.total);
            setDni(selectedPedido.dni);
            setPedidoSeleccionado(selectedPedido);
            // console.log(selectedPedido.usuario_id)
            // console.log(selectedPedido.nombre_usuario)
        } else {
            setUsuario_id("");
            setNombre_usuario("");
            setPedidoSeleccionado(null);
        }

        setPedido_id(selectedPedidoId);
    }

    const limpiarCampos = () =>{
        setPedido_id("");
        setFechaCancelacion("");
    }

    const openPDFModal = () => {
        setMostrarModalPDF(true);
    };
    
    const closePDFModal = () => {
        setMostrarModalPDF(false);
    };

    const getComprobantes = () => {
        Axios.get("http://localhost:3001/comprobantes").then((response) => {
            setComprobante(response.data);
        });
    }

    getComprobantes();

    return (
        <div className='container2'>
            <div className="navbar">
                <h1>LO DE JUAN Chicken & Grill - Cajero</h1>
                <div className='acciones'>
                    <span>[Cajero]</span>
                    <Link to={'/'}>
                        <button path type="submit" className="btn btn-primary btn"><span><FaIcons.FaSignOutAlt /></span>Salir</button>
                    </Link>
                </div>
            </div>
            <div className='estructura'>
              <div className='registroListadoPedido'>
                <div className='registroPedido2'>
                    <h2>REGISTRAR COMPROBANTE</h2>
                    <div className='formularioResgistroUsuario2'>
                        <div className='campos'>
                            <div className='primerCampo primerCampoCom'>
                                <select value={pedido_id} onChange={seleccionarPedido}>
                                    <option value="" disabled>Seleccione Pedido</option>
                                    {pedidos.map(elemento => (
                                        <option key={elemento.pedido_id} value={elemento.pedido_id}>Pedido N° {elemento.pedido_id}
                                        </option>
                                        ))}
                                </select>
                            
                                <label>Fecha de Cancelación: <input value={fechaCancelacion}
                                    onChange={(event) =>{ 
                                        setFechaCancelacion(event.target.value);
                                    }}
                                    type="date"/>
                                </label>
                                
                            </div>
                            <div className='segundoCampo segundoCampoCom'>
                            
                                <label>Usuario:
                                    <input id='campoPrecio' type='text' value={nombre_usuario} readOnly />
                                </label>
                                <label>Cliente: 
                                    <input id='campoCantidad' type='text' value={nombre} readOnly  />
                                </label>
                                <label>Mesa: 
                                    <input id='campoCantidad' type='text' value={numMesa} readOnly  />
                                </label>
                                <label>Total: 
                                    <input id='campoCantidad' type='number' value={total} readOnly  />
                                </label>
                            </div>
                            <div className='tercerCampo'>
                                <button
                                className="btn2 btn-actualizar"
                                onClick={add}
                                >
                                Generar
                                </button> 
                            </div>
                        </div>
                    </div>  
                </div>            
                <div className='listaProductos2'>
                    <h2>LISTA DE COMPROBANTES</h2>
                    <div className='tabla'>
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">Id</th>
                                    <th scope="col">Fecha de Cancelación</th>
                                    <th scope="col">PedidoId</th>
                                    <th scope="col">Total</th>
                                    <th scope="col">Mantenimiento</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    comprobanteList.map((val, key) => {
                                        return <tr key={val.comprobante_id}>
                                            <th>{val.comprobante_id}</th>
                                            <th>{new Date(val.fechaCancelacion).toLocaleDateString()}</th>
                                            <td>{val.pedido_id}</td>
                                            <td>{val.total}</td>
                                            <td>
                                                <button type='button' onClick={() => seleccionarComprobante(val)} 
                                                className='btnEditar btnedi'><span><FaIcons.FaFileInvoiceDollar/></span></button>
                                                <button type='button' 
                                                onClick={() => deleteComprobante(val)}
                                                className='btnEliminar btneli'><span><FaIcons.FaTimesCircle/></span></button>
                                            </td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
              </div>
              <div className='pedido'>
                <h2>COMPROBANTE</h2>
                <div className='comprobante'>
                    <div className='campo_info'>
                        <div className='imagen_com'>
                            <img className='com_logo' src={qr_polleria}></img>
                        </div>
                        <div className='info'>
                            <p>LO DE JUAN INVERSIONES S.R.L. POLLERIA LO DE JUAN</p>
                            <p>GRUPO RESIDENCIAL  27A MZA. I LOTE. 21 SEC. 3 LIMA - LIMA - VILLA EL SALVADOR RUC:20563254174</p>
                            <p>COMPROBANTE ELECTRONICO</p>
                            <p>Nº <span>{comprobanteSeleccionado ? comprobanteSeleccionado.comprobante_id : "--"}</span></p>
                        </div>
                    </div>
                    <div className='campo_info_cliente'>
                        <div className='datos_cliente'>
                            <p>FECHA EMISION <span>: {comprobanteSeleccionado ? new Date(comprobanteSeleccionado.fechaEmision).toLocaleDateString() : "--"}</span></p>
                            <p>DNI<span>: {comprobanteSeleccionado ? comprobanteSeleccionado.dni : "--"}</span></p>
                            <p>NOMBRE <span>: {comprobanteSeleccionado ? comprobanteSeleccionado.cliente : "--"}</span></p>
                        </div>
                        <div className='datos_total'>
                            <span>--------------------------------------------------------------</span>
                            <p>TOTAL S/ <span>{comprobanteSeleccionado ? comprobanteSeleccionado.total : "--"}</span></p>
                            <span>--------------------------------------------------------------</span>
                        </div>
                        <div className='datos_final'>
                            <p>Representación del Comprobante Electronico</p>   
                            <p>www.jsjfact.com/facturador/cpe/lodejuan</p> 
                        </div>
                    </div>
                </div>
                <button className='btn2 btn_cancelar' onClick={openPDFModal}>Imprimir</button>
              </div>
              {mostrarModalPDF && (
                    <div className='pdf-modal'>
                    <div className='pdf-modal-content'>
                        <ComprobantePDF comprobanteSeleccionado={comprobanteSeleccionado} />
                        <button className='btn2 btn_cancelar' onClick={closePDFModal}>Cerrar</button>
                    </div>
                    </div>
                )}
            </div>
            
        </div>
    )
}

export default ComprobanteCajero;
