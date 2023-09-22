const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"bd_lodejuan"
})

app.post('/login', (req, res)=>{
    const nombre_usuario = req.body.nombre_usuario
    const contraseña = req.body.contraseña

    db.query('SELECT * FROM usuario WHERE nombre_usuario = ? && contraseña = ?' , [nombre_usuario, contraseña],
    (err, results) =>{
        if(err){
            res.send({error: err})
        }
        if(results.length > 0){
            const user = results[0];
            const { rol_id, ...userInfo } = user;
            res.send({ rol_id, user: userInfo });
            //res.send(results)
        }
        else{
            res.send({message: "Credenciales incorrectas"})
        }
    })
})

// CRUD DE PLATOS

//  crear
app.post("/create", (req, res)=>{
    const nombre = req.body.nombre;
    const precio = req.body.precio;
    const categoria_id = req.body.categoria_id;

    db.query('INSERT INTO plato(nombre, precio, categoria_id) VALUES(?,?,?)',[nombre, precio, categoria_id],
    (err, result) =>{
        if(err){
            console.log(err);
        }else{
            res.send("Plato registrado con exito!!")
        }
    })
});

//  listar
app.get("/platos", (req, res)=>{

    db.query('SELECT p.plato_id, p.nombre, p.precio, p.categoria_id , c.nombre AS categoria FROM plato p JOIN categoria c ON p.categoria_id=c.categoria_id',
    (err, result) =>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
});

//  actualizar
app.put("/update", (req, res)=>{
    const nombre = req.body.nombre;
    const precio = req.body.precio;
    const categoria_id = req.body.categoria_id;
    const plato_id = req.body.plato_id;

    db.query('UPDATE plato SET nombre=?, precio=?, categoria_id=? WHERE plato_id=?',[nombre, precio, categoria_id, plato_id],
    (err, result) =>{
        if(err){
            console.log(err);
        }else{
            res.send("Plato actualizado con exito!!")
        }
    })
});

// eliminar
app.delete("/delete/:plato_id", (req, res)=>{
    const plato_id = req.params.plato_id;

    db.query('DELETE FROM plato WHERE plato_id=?',plato_id,
    (err, result) =>{
        if(err){
            console.log(err);
        }else{
            res.send("Plato eliminado con exito!!")
        }
    })
});

// COMBOBOX-PLATOS
app.get("/datoscat", (req, res)=>{
    const nombre = req.body.nombre;
    const categoria_id = req.body.categoria_id;

    db.query('SELECT * FROM categoria',
    (err, result) =>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
});
// *************************************************************************************************


// CRUD USUARIO

//  listar
app.get("/usuarios", (req, res)=>{

    db.query('SELECT u.usuario_id, u.nombre_usuario, u.contraseña, u.fechaCreacion, u.rol_id, r.nombre AS nombre FROM usuario u JOIN rol r ON u.rol_id = r.rol_id',
    (err, result) =>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
});

//  crear
app.post("/createUser", (req, res)=>{
    const nombre_usuario = req.body.nombre_usuario;
    const contraseña = req.body.contraseña;
    const fechaCreacion = req.body.fechaCreacion;
    const rol_id = req.body.rol_id;

    db.query('INSERT INTO usuario(nombre_usuario, contraseña, fechaCreacion, rol_id) VALUES(?,?,?,?)',[nombre_usuario, contraseña, fechaCreacion, rol_id],
    (err, result) =>{
        if(err){
            console.log(err);
        }else{
            res.send("Usuario registrado con exito!!")
        }
    })
});

//  actualizar
app.put("/updateUser", (req, res)=>{
    const nombre_usuario = req.body.nombre_usuario;
    const contraseña = req.body.contraseña;
    const fechaCreacion = req.body.fechaCreacion;
    const rol_id = req.body.rol_id;
    const usuario_id = req.body.usuario_id;

    db.query('UPDATE usuario SET nombre_usuario=?, contraseña=?, fechaCreacion=?, rol_id=?  WHERE usuario_id=?',[nombre_usuario, contraseña, fechaCreacion, rol_id, usuario_id],
    (err, result) =>{
        if(err){
            console.log(err);
        }else{
            res.send("Usuario actualizado con exito!!")
        }
    })
});


// eliminar
app.delete("/deleteUser/:usuario_id", (req, res)=>{
    const usuario_id = req.params.usuario_id;

    db.query('DELETE FROM usuario WHERE usuario_id=?',usuario_id,
    (err, result) =>{
        if(err){
            console.log(err);
        }else{
            res.send("Usuario eliminado con exito!!")
        }
    })
});

// COMBOBOX Rol
app.get("/datos", (req, res)=>{
    const nombre = req.body.nombre;
    const rol_id = req.body.rol_id;

    db.query('SELECT * FROM rol',
    (err, result) =>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
});

// *************************************************************************************************
// CRUD DE MESA

//  crear
app.post("/createmesa", (req, res)=>{
    const numMesa = req.body.numMesa;
    const numAsientos = req.body.numAsientos;
    const estado = req.body.estado;

    db.query('INSERT INTO mesa(numMesa, numAsientos, estado) VALUES(?,?,?)',[numMesa, numAsientos, estado],
    (err, result) =>{
        if(err){
            console.log(err);
        }else{
            res.send("Mesa registrada con exito!!")
        }
    })
});

//  listar
app.get("/mesa", (req, res)=>{
    const numMesa = req.body.numMesa;
    const numAsientos = req.body.numAsientos;
    const estado = req.body.estado;

    db.query('SELECT * FROM mesa',
    (err, result) =>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
});

//  actualizar
app.put("/updatemesa", (req, res)=>{
    const numMesa = req.body.numMesa;
    const numAsientos = req.body.numAsientos;
    const estado = req.body.estado;
    const mesa_id = req.body.mesa_id;

    db.query('UPDATE mesa SET numMesa=?, numAsientos=?, estado=? WHERE mesa_id=?',[numMesa, numAsientos, estado, mesa_id],
    (err, result) =>{
        if(err){
            console.log(err);
        }else{
            res.send("Mesa actualizada con exito!!")
        }
    })
});

// eliminar
app.delete("/deletemesa/:mesa_id", (req, res)=>{
    const mesa_id = req.params.mesa_id;

    db.query('DELETE FROM mesa WHERE mesa_id=?',mesa_id,
    (err, result) =>{
        if(err){
            console.log(err);
        }else{
            res.send("Mesa eliminada con exito!!")
        }
    })
});
// *************************************************************************************************

// *************************************************************************************************
// CRUD DE CLIENTES

//  crear
app.post("/createcliente", (req, res)=>{
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const dni = req.body.dni;
    const direccion = req.body.direccion;
    const telefono = req.body.telefono;
    const fechaCreacion = req.body.fechaCreacion;
    const correo = req.body.correo;

    db.query('INSERT INTO cliente(nombre, apellido, dni, direccion, telefono, fechaCreacion, correo) VALUES(?,?,?,?,?,?,?)',[nombre, apellido, dni, direccion, telefono, fechaCreacion, correo],
    (err, result) =>{
        if(err){
            console.log(err);
        }else{
            res.send("Cliente registrado con exito!!")
        }
    })
});

//  listar
app.get("/cliente", (req, res)=>{

    db.query('SELECT * FROM cliente',
    (err, result) =>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
});

//  actualizar
app.put("/updatecliente", (req, res)=>{
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const dni = req.body.dni;
    const direccion = req.body.direccion;
    const telefono = req.body.telefono;
    const fechaCreacion = req.body.fechaCreacion;
    const correo = req.body.correo;
    const cliente_id = req.body.cliente_id;

    db.query('UPDATE cliente SET nombre=?, apellido=?, dni=?, direccion=?, telefono=?, fechaCreacion=?, correo=? WHERE cliente_id=?',[nombre, apellido, dni, direccion, telefono, fechaCreacion, correo, cliente_id],
    (err, result) =>{
        if(err){
            console.log(err);
        }else{
            res.send("Cliente actualizado con exito!!")
        }
    })
});

// eliminar
app.delete("/deletecliente/:cliente_id", (req, res)=>{
    const cliente_id = req.params.cliente_id;

    db.query('DELETE FROM cliente WHERE cliente_id=?',cliente_id,
    (err, result) =>{
        if(err){
            console.log(err);
        }else{
            res.send("Cliente eliminado con exito!!")
        }
    })
});
// *************************************************************************************************

// *************************************************************************************************
// CRUD COMPROBANTE
//  listar
app.get("/comprobantes", (req, res)=>{

    db.query('SELECT c.comprobante_id, c.fechaCancelacion, c.pedido_id , p.total AS total, cl.nombre AS cliente, cl.dni AS dni, p.fechaEmision AS fechaEmision FROM comprobante c JOIN pedido p ON c.pedido_id = p.pedido_id JOIN cliente cl ON p.cliente_id = cl.cliente_id',
    (err, result) =>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
});

//  crear
app.post("/createcomprobante", (req, res)=>{
    const fechaCancelacion = req.body.fechaCancelacion;
    const pedido_id = req.body.pedido_id;

    db.query('INSERT INTO comprobante(fechaCancelacion, pedido_id) VALUES(?,?)',[fechaCancelacion, pedido_id],
    (err, result) =>{
        if(err){
            console.log(err);
        }else{
            res.send("Comprobante registrado con exito!!")
        }
    })
});

// eliminar
app.delete("/deletecomprobante/:comprobante_id", (req, res)=>{
    const comprobante_id = req.params.comprobante_id;

    db.query('DELETE FROM comprobante WHERE comprobante_id=?',comprobante_id,
    (err, result) =>{
        if(err){
            console.log(err);
        }else{
            res.send("Comprobante eliminado con exito!!")
        }
    })
});


// COMBOBOX-PEDIDO
app.get("/datospedido", (req, res)=>{

    db.query('SELECT p.pedido_id, p.fechaEmision, p.total, p.usuario_id, p.cliente_id, p.mesa_id, u.nombre_usuario AS nombre_usuario , c.nombre AS nombre, c.dni As dni , m.numMesa As numMesa FROM pedido p JOIN usuario u ON p.usuario_id = u.usuario_id JOIN cliente c ON p.cliente_id = c.cliente_id JOIN mesa m ON p.mesa_id = m.mesa_id',
    (err, result) =>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
});

// *************************************************************************************************

// *************************************************************************************************
// CRUD PEDIDO
//  listar
app.get("/pedidos", (req, res)=>{

    db.query('SELECT p.pedido_id, p.fechaEmision, p.total, p.usuario_id, p.cliente_id, p.mesa_id, u.nombre_usuario AS nombre_usuario, c.nombre AS nombre , m.numMesa As numMesa FROM pedido p JOIN usuario u ON p.usuario_id = u.usuario_id JOIN cliente c ON p.cliente_id = c.cliente_id JOIN mesa m ON p.mesa_id = m.mesa_id',
    (err, result) =>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
});

// crear
app.post("/createpedido", (req, res)=>{
    const fechaEmision = req.body.fechaEmision;
    const total = req.body.total;
    const usuario_id = req.body.usuario_id;
    const cliente_id = req.body.cliente_id;
    const mesa_id = req.body.mesa_id;

    db.query('INSERT INTO pedido(fechaEmision, total, usuario_id, cliente_id, mesa_id) VALUES(?,?,?,?,?)',[fechaEmision, total, usuario_id, cliente_id, mesa_id],
    (err, result) =>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
});

//  actualizar
app.put("/updatepedido", (req, res)=>{
    const pedido_id = req.body.pedido_id; 
    const fechaEmision = req.body.fechaEmision;
    const total = req.body.total;
    const usuario_id = req.body.usuario_id;
    const cliente_id = req.body.cliente_id;
    const mesa_id = req.body.mesa_id;

    db.query('UPDATE pedido SET fechaEmision=?, total=?, usuario_id=?, cliente_id=?, mesa_id=? WHERE pedido_id=?',[fechaEmision, total, usuario_id, cliente_id, mesa_id, pedido_id],
    (err, result) =>{
        if(err){
            console.log(err);
        }else{
            res.send("Pedido actualizado con exito!!")
        }
    })
});

//Eliminar
app.delete("/deletepedido/:pedido_id", (req, res)=>{
    const pedido_id = req.params.pedido_id;

    db.query('DELETE FROM pedido WHERE pedido_id=?',pedido_id,
    (err, result) =>{
        if(err){
            console.log(err);
        }else{
            res.send("Pedido eliminado con exito!!")
        }
    })
});



// COMBOBOX-PEDIDO
app.get("/datosuser", (req, res)=>{
    const nombre_usuario = req.body.nombre_usuario;
    const usuario_id = req.body.usuario_id;

    db.query('SELECT * FROM usuario where rol_id = 2',
    (err, result) =>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
});

app.get("/datosclient", (req, res)=>{
    const nombre = req.body.nombre;
    const cliente_id = req.body.cliente_id;

    db.query('SELECT * FROM cliente',
    (err, result) =>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
});

app.get("/datosmesa", (req, res)=>{
    const numMesa = req.body.numMesa;
    const mesa_id = req.body.mesa_id;

    db.query('SELECT * FROM mesa',
    (err, result) =>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
});

app.get("/datosplato", (req, res)=>{
    const plato_id = req.body.plato_id;
    const nombre = req.body.nombre;
    const precio = req.body.precio;

    db.query('SELECT * FROM plato',
    (err, result) =>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
});

//*************************************************************************************************
// CRUD Bedidas

//  listar
app.get("/bebidas", (req, res)=>{

    db.query('SELECT b.bebida_id,b.nombre, b.cantidad, b.unidadMedida, b.importe, b.PrecioUnit, b.fechaCompra, b.marca_id, m.marca AS marca, m.compañia AS compañia FROM bebida b JOIN marca m ON b.marca_id = m.marca_id',
    (err, result) =>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
});

//  crear
app.post("/createBebida", (req, res)=>{
    const nombre = req.body.nombre;
    const cantidad = req.body.cantidad;
    const unidadMedida = req.body.unidadMedida;
    const importe = req.body.importe;
    const PrecioUnit = req.body.PrecioUnit;
    const fechaCompra = req.body.fechaCompra;
    const marca_id = req.body.marca_id;

    db.query('INSERT INTO bebida(nombre, cantidad, unidadMedida, importe, PrecioUnit, fechaCompra, marca_id) VALUES(?,?,?,?,?,?,?)',[nombre, cantidad, unidadMedida, importe, PrecioUnit, fechaCompra, marca_id],
    (err, result) =>{
        if(err){
            console.log(err);
        }else{
            res.send("Compra registrada con exito!!")
        }
    })
});

//  actualizar
app.put("/updateBebida", (req, res)=>{
    const nombre = req.body.nombre;
    const cantidad = req.body.cantidad;
    const unidadMedida = req.body.unidadMedida;
    const importe = req.body.importe;
    const PrecioUnit = req.body.PrecioUnit;
    const fechaCompra = req.body.fechaCompra;
    const marca_id = req.body.marca_id;
    const bebida_id = req.body.bebida_id;

    db.query('UPDATE bebida SET nombre=?, cantidad=?, unidadMedida=?, importe=?, PrecioUnit=?, fechaCompra=?,marca_id=? WHERE bebida_id=?',[nombre, cantidad, unidadMedida, importe, PrecioUnit, fechaCompra, marca_id, bebida_id],
    (err, result) =>{
        if(err){
            console.log(err);
        }else{
            res.send("Compra actualizada con éxito!!")
        }
    })
});


// eliminar
app.delete("/deleteBebida/:bebida_id", (req, res)=>{
    const bebida_id = req.params.bebida_id;

    db.query('DELETE FROM bebida WHERE bebida_id=?',bebida_id,
    (err, result) =>{
        if(err){
            console.log(err);
        }else{
            res.send("Compra eliminada con éxito!!")
        }
    })
});

// COMBOBOX
app.get("/datosBebida", (req, res)=>{
    const marca = req.body.marca;
    const marca_id = req.body.marca_id;

    db.query('SELECT * FROM marca',
    (err, result) =>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
});

// *************************************************************************************************
app.listen(3001, ()=>{
    console.log("Corriendo en el puerto 3001");
})