
import rutas from './raute-config';
import Sidebar from './Components/Sidebar';
import React, { useState } from 'react';
import Dashboard from './Components/Dashboard';
import Login from './Components/Login';
import Navbar from './Components/Navbar';
import DashboardMozo from './Components/DashboardMozo';
import { Link, useNavigate, createBrowserRouter, RouterProvider } from 'react-router-dom';
import Usuario from './pages/Usuario';
import Plato from './pages/Plato';
import Pedido from './pages/Pedido';
import Comprobante from './pages/Comprobante';
import Meza from './pages/Meza';
import Cliente from './pages/Cliente';
import './styles/Navbar.scss';
import NavbarMozo from './Components/NavbarMozo';
import PedidoMozo from './pages/PedidoMozo';
import MezaMozo from './pages/MezaMozo';
import ClienteMozo from './pages/ClienteMozo';
import DashboardCajero from './Components/DashboardCajero';
import NavbarCajero from './Components/NavbarCajero';
import ComprobanteCajero from './pages/ComprobanteCajero';
import PedidoCajero from './pages/PedidoCajero';
import Bebidas from './pages/Bebidas';

const router = createBrowserRouter([
  {
    path: '/',
    element: <div className='contenedorTotal'><Login/></div>
  },
  {
    path: '/menu',
    element: <div className='container'>
              <Dashboard/>
              <Navbar/>
            </div>
  },

  {
    path: '/mozo-dashboard',
    element: <div className='container'>
              <DashboardMozo/>
              <NavbarMozo/>
            </div>
  },

  {
    path: '/cajero-dashboard',
    element: <div className='container'>
              <DashboardCajero/>
              <NavbarCajero/>
            </div>
  },

  {
    path: '/menu/usuarios',
    element: <div className='container'>
              <Dashboard/>
              <Usuario/>
            </div>
  },

  {
    path: '/menu/platos',
    element: <div className='container'>
              <Dashboard/>
              <Plato/>
            </div>
  },

  {
    path: '/menu/pedidos',
    element: <div className='container'>
              <Dashboard/>
              <Pedido/>
            </div>
  },

  {
    path: '/menu/pedido',
    element: <div className='container'>
              <DashboardMozo/>
              <PedidoMozo/>
            </div>
  },

  {
    path: '/menu/pedidosc',
    element: <div className='container'>
              <DashboardCajero/>
              <PedidoCajero/>
            </div>
  },

  {
    path: '/menu/comprobantes',
    element: <div className='container'>
              <Dashboard/>
              <Comprobante/>
            </div>
  },

  {
    path: '/menu/compras',
    element: <div className='container'>
              <Dashboard/>
              <Bebidas/>
            </div>
  },

  {
    path: '/menu/comprobante',
    element: <div className='container'>
              <DashboardCajero/>
              <ComprobanteCajero/>
            </div>
  },

  {
    path: '/menu/mesas',
    element: <div className='container'>
              <Dashboard/>
              <Meza/>
            </div>
  },

  {
    path: '/menu/mesa',
    element: <div className='container'>
              <DashboardMozo/>
              <MezaMozo/>
            </div>
  },

  {
    path: '/menu/clientes',
    element: <div className='container'>
              <Dashboard/>
              <Cliente/>
            </div>
  },

  {
    path: '/menu/cliente',
    element: <div className='container'>
              <DashboardMozo/>
              <ClienteMozo/>
            </div>
  },
])

function App() {

 // const [userType, setUserType] = useState('admin');
  
  // const [loggedIn, setLoggedIn] = useState(false);

  // const handleLogin = () => {
  //   // Lógica para verificar las credenciales del usuario y establecer el estado de inicio de sesión
  //   setLoggedIn(true);
  // };

  return (
    //  <div>
    //    {userType === 'admin' ? <Dashboard /> : <DashboardMozo />}
    //  </div>
    
    <div>
      <RouterProvider router={router}/>
    </div>

    // <Router>
    //   <Routes>
    //     <Route exact path='/'>
    //       {loggedIn ? <Navigate to="/menu" /> : <Login onLogin={handleLogin} />}
    //     </Route>
    //     <Route path='/menu'>
    //       {!loggedIn ? <Navigate to="/" /> : <Dashboard />}
    //     </Route>
    //   </Routes>
    // </Router>
    
  ); 
}



export default App
