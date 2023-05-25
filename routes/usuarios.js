const { Router } = require('express');
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete } = require('../controllers/usuarios');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { esRoleValido, existeCorreo } = require('../helpers/db-validators');


const router = Router();

router.get('/', usuariosGet);

router.put('/:id', usuariosPut);

router.post('/',[
    check('correo','El correo no es valido').isEmail(),
    check('correo').custom( existeCorreo ),
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','El password debe ser mas de 6 letras').isLength({min:6}),
    //check('rol','No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom( esRoleValido ),
    validarCampos
],usuariosPost);

router.delete('/', usuariosDelete);

module.exports = router