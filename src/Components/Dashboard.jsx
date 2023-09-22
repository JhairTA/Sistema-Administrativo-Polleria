import { Route, Routes } from "react-router-dom";
import Sidebar from "./Sidebar";
import rutas from "../raute-config";
import Navbar from "./Navbar";

function Dashboard(){

    return(
        <div className='container'>
            <Sidebar/>
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

export default Dashboard;