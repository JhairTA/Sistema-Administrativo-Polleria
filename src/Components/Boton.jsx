
import React, {useState} from 'react'
//import 'bootstrap/dist/css/bootstrap.min.css'
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap'
import { Link } from 'react-router-dom';

const Boton = () =>{
    const [dropdown, setDropdown] = useState(false);
   const abrirCerrarDropdown=()=>{
     setDropdown(!dropdown);
  }

  return (
    <Dropdown isOpen={dropdown} toggle={abrirCerrarDropdown}>
        <DropdownToggle caret>
            Ejemplo
        </DropdownToggle>
        <DropdownMenu>
        <DropdownItem><Link to={"/"}>Salir</Link></DropdownItem>
        </DropdownMenu>
    </Dropdown> 
  )
}

export default Boton;