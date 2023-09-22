import { Route, Routes } from "react-router-dom";
import Sidebar from "./Sidebar";
import rutas from "../raute-config";
import Navbar from "./Navbar";
import SidebarCajero from "./SidebarCajero";

function DashboardCajero(){

    return(
        <div className='container'>
            <SidebarCajero/>
            <Routes>
                {
                rutas.map(ruta =>
                    <Route key={ruta.path} path={ruta.path}
                    element={<ruta.componente/>}/>)
                }
            </Routes>  
        </div>
    );

}

export default DashboardCajero;