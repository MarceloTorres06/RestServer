const { response,request } = require('express');

const usuariosGet = (req=request,res=response) =>{
    const { q, nombre = 'Sin nombre' } = req.query;
    res.json({
        msg: 'get API',
        q,
        nombre
    });
}

const usuariosPost = (req,res=response) =>{
    //const body = req.body;
    res.json({
        msg: 'post API',
        body: body
    });
}

const usuariosPut = (req,res=response) =>{
    const {id} = req.params;
    res.json({
        msg: 'put API',
        id: id
    });
}

const usuariosDelete = (req,res=response) =>{
    res.json({
        msg: 'delete API'
    });
}


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}