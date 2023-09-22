import { Route, Routes } from "react-router-dom";
import Login from '../src/Components/Login';
import Navbar from '../src/Components/Navbar';
import Usuario from "./pages/Usuario";
import Plato from "./pages/Plato";
import Pedido from "./pages/Pedido";
import Sidebar from "./Components/Sidebar";
import Comprobante from "./pages/Comprobante";
import RegistroPlato from "./pages/RegistroPlato";
import Meza from "./pages/Meza";
import Cliente from "./pages/Cliente";

const rutas= [
    //{path : '/', componente:Login},
    {path : '/menu', componente:Navbar},
    {path : '/menu/usuarios', componente:Usuario},
    {path : '/menu/platos', componente:Plato},
    {path : '/menu/pedidos', componente:Pedido},
    {path : '/menu/comprobantes', componente:Comprobante},
    {path : '/menu/mesas', componente:Meza},
    {path : '/menu/clientes', componente:Cliente},
    {path : '/menu/platos/registro', componente:RegistroPlato}
];

export default rutas;