import '../styles/Navbar.scss'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import * as FaIcons from 'react-icons/fa'

const SidebarCajero = () =>{
    return (
        <div className="sidebar">
            <div className='imagen'>
                <Link to={"/cajero-dashboard"}>
                    <img src={logo}/>
                </Link>
            </div>
            <nav className='navegacion'>
                <ul>
                    <li>
                        <Link to="/menu/comprobante"><span><FaIcons.FaReceipt/></span>Comprobantes</Link>
                    </li>
                    <li>
                        <Link to="/menu/pedidosc"><span><FaIcons.FaConciergeBell/></span>Pedidos</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default SidebarCajero