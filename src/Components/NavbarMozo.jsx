import '../styles/Navbar.scss'
import Sidebar from './Sidebar'
import React from 'react'
import Boton from './Boton';
import * as FaIcons from 'react-icons/fa'
import { Link, Route, Routes } from 'react-router-dom';

//import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap'

const NavbarMozo = () =>{
  const menuItems = [
    { title: 'Pedidos', imageSrc: '/public/pedido.png', link: '/menu/pedido' },
    { title: 'Mesas', imageSrc: '/public/mesa.png', link: '/menu/mesa' },
    { title: 'Cliente', imageSrc: '/public/clientes.png', link: '/menu/cliente' },
  ];
    return (
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

export default NavbarMozo