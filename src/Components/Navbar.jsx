import '../styles/Navbar.scss'
import Sidebar from './Sidebar'
import React from 'react'
import Boton from './Boton';
import * as FaIcons from 'react-icons/fa'
import { Link, Route, Routes } from 'react-router-dom';

//import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap'

const Navbar = () =>{
  const menuItems = [
    { title: 'Usuarios', imageSrc: '/public/usuario.png', link: '/menu/usuarios' },
    { title: 'Platos', imageSrc: '/public/plato.png', link: '/menu/platos' },
    { title: 'Comprobantes', imageSrc: '/public/comprobante.png', link: '/menu/comprobantes' },
    { title: 'Pedidos', imageSrc: '/public/pedido.png', link: '/menu/pedidos' },
    { title: 'Mesas', imageSrc: '/public/mesa.png', link: '/menu/mesas' },
    { title: 'Clientes', imageSrc: '/public/clientes.png', link: '/menu/clientes' },
    { title: 'Compras', imageSrc: '/public/compras2.png', link: '/menu/compras' },
  ];
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
          <h2>BIENVENIDO..!</h2>
          <div className="menu">
            {menuItems.map((item, index) => (
            <div key={index} className="menu-item">
              <Link to={item.link}>
              <img src={item.imageSrc} alt={item.title} />
              <p>{item.title}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    )
}

export default Navbar