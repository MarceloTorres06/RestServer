const { response } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');

const login = async(req,res=response) =>{

    const {correo,password} = req.body;

    const usuario = await Usuario.findOne({correo});

    if( !usuario){
        return res.status(400).json({
            msg: 'Usuario/password no correctos - correo'
        })
    }

    if( !usuario.estado){
        return res.status(400).json({
            msg: 'Usuario/password no correctos - estado: false'
        })
    }
    const validPassword = bcryptjs.compareSync(password, usuario.password);

    if( !validPassword ){
        return res.status(400).json({
            msg: 'Usuario/password no correctos - password'
        })
    }

    const token = await generarJWT( usuario.id );

    try{
        res.json({
            usuario,
            token
        });
    }catch(error){
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }

}

module.exports = {
    login
}