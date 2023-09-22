import '../App.scss'
import login from '../assets/login.jpeg'
import React, { useState, useEffect  } from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2'
import { Link, useNavigate } from 'react-router-dom';
import { Alert } from 'reactstrap';
//import { createBrowserHistory } from "history";

import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

 

function Login() {
  const[nombre_usuario,SetNombre_Usuario] = useState('')
  const[contraseña,SetContraseña] = useState('')
  const[rol_id, SetRol_id] = useState(0)
  const [intentos, setIntentos] = useState(0);
  const [bloqueado, setBloqueado] = useState(false);
  const navigateTo = useNavigate()

  const maxIntentos = 3;
  const tiempoBloqueo = 10000;

  const [mostrarContraseña, setMostrarContraseña] = useState(false);

  useEffect(() => {
    if (intentos >= maxIntentos) {
      // Si se excede el número máximo de intentos, activa el bloqueo
      setBloqueado(true);

      // Desactiva el bloqueo después de 1 minuto
      const timer = setTimeout(() => {
        setBloqueado(false);
        setIntentos(0); // Reinicia el contador de intentos después del bloqueo
      }, tiempoBloqueo);

      // Limpia el temporizador al desmontar el componente para evitar fugas de memoria
      return () => clearTimeout(timer);
    }
  }, [intentos]);

 

  const loginUser = (e) =>{
    e.preventDefault();
    if (nombre_usuario.trim() === '' || contraseña.trim() === '') {
      // Si alguno de los campos está vacío, muestra un mensaje de "Campos vacíos"
      Swal.fire({
        icon: 'info',
        title: 'Oops...',
        text: 'Por favor, completa todos los campos.',
      });

      return;

    }

    Axios.post('http://localhost:3001/login',{
      nombre_usuario:nombre_usuario,
      contraseña:contraseña,
      rol_id:rol_id

    }).then((response)=>{
      if(response.data.message){
        setIntentos(intentos + 1);
        if (intentos >= maxIntentos - 1) {
          limpiarCampos();
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Has excedido el número máximo de intentos. El boton se bloqueara por 10 segundos!',
          });

          //setIntentos(0); // Reinicia el contador de intentos

        }else{

          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Usuario o Contraseña incorrectos!',
          })
          navigateTo('/')
        }

 

      }else{
        const userData = response.data;
        setIntentos(0);
        console.log(nombre_usuario)
        console.log(contraseña)
        console.log(userData.rol_id);

        if (userData.rol_id === 1) {
          navigateTo('/menu');
        } else if (userData.rol_id === 2) {
          navigateTo('/mozo-dashboard');
        } else {
          navigateTo('/cajero-dashboard');
        }
        //...
      }
    })
  }

 
  const limpiarCampos =()=>{
    SetNombre_Usuario("");
    SetContraseña("");
  }
 
  const botonDeshabilitado = intentos >= maxIntentos || bloqueado;

  return (
    <div className='App'>
      <div className="form-login">
        <div className='cont-image'>
          <img src={login} alt="Inicio de sesión" />
        </div>

        <form>
          <label className='titulo'>BIENVENIDO</label>
          <div className="mb-3 input-user">
            <input
              type="text"
              name='nombre_usuario'
              value={nombre_usuario}
              className="form-control user"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder='Nombre de usuario'
              onChange={(event) => {
                SetNombre_Usuario(event.target.value);

              }}

            />
          </div>
          <div className="mb-3 input-user">
            <div className="password-container">
              <input
                type={mostrarContraseña ? 'text' : 'password'}
                name='contraseña'
                value={contraseña}
                className="form-control password"
                id="exampleInputPassword1"
                placeholder='Contraseña'
                onChange={(event) => {
                  SetContraseña(event.target.value);
                }}

              />

              <button
                type="button"
                className={`toggle-password ${mostrarContraseña ? 'mostrar' : ''}`}
                onClick={() => setMostrarContraseña(!mostrarContraseña)}
              >
                <FontAwesomeIcon icon={mostrarContraseña ? faEyeSlash : faEye} />
              </button>
            </div>
          </div>

          <button
            className={`btn btn-primary btn ${botonDeshabilitado ? 'bloqueado' : ''}`}
            onClick={loginUser}
            disabled={botonDeshabilitado}

          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );

}

export default Login;