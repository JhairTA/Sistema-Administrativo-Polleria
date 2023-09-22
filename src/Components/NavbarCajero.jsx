import '../styles/Navbar.scss'
import Sidebar from './Sidebar'
import React from 'react'
import Boton from './Boton';
import * as FaIcons from 'react-icons/fa'
import { Link, Route, Routes } from 'react-router-dom';

//import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap'

const NavbarCajero = () =>{
  const menuItems = [
    { title: 'Comprobantes', imageSrc: '/public/comprobante.png', link: '/menu/comprobante' },
    { title: 'Pedidos', imageSrc: '/public/pedido.png', link: '/menu/pedidosc' },
  ];
    return (
        <div className='container2'>
          <div className="navbar">
            <h1>LO DE JUAN Chicken & Grill</h1>
            <div className='acciones'>
              <span>[Cajero]</span>
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

export default NavbarCajero