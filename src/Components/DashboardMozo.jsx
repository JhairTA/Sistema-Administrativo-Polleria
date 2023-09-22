import { Route, Routes } from "react-router-dom";

import rutas from "../raute-config";
import SidebarMozo from "./SidebarMozo";

function DashboardMozo(){

    return(
        <div className='container'>
            <SidebarMozo/>
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

export default DashboardMozo;