import '../styles/Navbar.scss'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import * as FaIcons from 'react-icons/fa'

const SidebarMozo = () =>{
    return (
        <div className="sidebar">
            <div className='imagen'>
                <Link to={"/mozo-dashboard"}>
                <img src={logo}/>
                </Link>
            </div>
            <nav className='navegacion'>
                <ul>
                    <li>
                        <Link to="/menu/pedido"><span><FaIcons.FaConciergeBell/></span>Pedido</Link>
                    </li>
                    <li>
                        <Link to="/menu/mesa"><span><FaIcons.FaUtensils/></span>Mesa</Link>
                    </li>
                    <li>
                        <Link to="/menu/cliente"><span><FaIcons.FaUsers/></span>Cliente</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default SidebarMozo;