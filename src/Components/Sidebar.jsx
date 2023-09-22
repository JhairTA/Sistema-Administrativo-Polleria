import '../styles/Navbar.scss'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import * as FaIcons from 'react-icons/fa'

const Sidebar = () =>{
    return (
        <div className="sidebar">
            <div className='imagen'>
                <Link to={"/menu"}>
                    <img src={logo}/>
                </Link>
            </div>
            <nav className='navegacion'>
                <ul>
                    <li>
                        <Link to="/menu/usuarios"> <span><FaIcons.FaUser/></span> Usuarios</Link>
                    </li>
                    <li>
                        <Link to="/menu/platos"><span><FaIcons.FaDrumstickBite/></span>Platos</Link>
                    </li>
                    <li>
                        <Link to="/menu/comprobantes"><span><FaIcons.FaReceipt/></span>Comprobantes</Link>
                    </li>
                    <li>
                        <Link to="/menu/pedidos"><span><FaIcons.FaConciergeBell/></span>Pedidos</Link>
                    </li>
                    <li>
                        <Link to="/menu/mesas"><span><FaIcons.FaUtensils/></span>Mesa</Link>
                    </li>
                    <li>
                        <Link to="/menu/clientes"><span><FaIcons.FaUsers/></span>Cliente</Link>
                    </li>
                    <li>
                        <Link to="/menu/compras"><span><FaIcons.FaShoppingBag/></span>Compras</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Sidebar