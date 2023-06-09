const { response,request } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');


const usuariosGet = (req=request,res=response) =>{
    const { q, nombre = 'Sin nombre' } = req.query;
    res.json({
        msg: 'get API',
        q,
        nombre
    });
}

const usuariosPost = async (req,res=response) => {

    const {nombre,correo,password,rol} = req.body;
    const usuario = new Usuario( {nombre,correo,password,rol} );
    
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt);

    await usuario.save();

    res.json({
        usuario
    });

}

const usuariosPut = (req,res=response) =>{
    const {id} = req.params;
    res.json({
        msg: 'put API',
        id: id
    });
}

const usuariosDelete = async(req,res=response) =>{
    const { id } = req.params;

    const usuario = await Usuario.findByIdAndUpdate ( id, {estado: false} );

    res.json({ usuario });
}


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}