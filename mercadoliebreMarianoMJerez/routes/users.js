const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {check , validationResult, body}  = require('express-validator');


const userController = require('../controllers/userController');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images/users')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  })
   
var upload = multer({ storage: storage })

/* GET users listing. */
router.get('/register', userController.register);
router.post('/register',upload.any(),[
  check('nombre').isLength({min:1}).withMessage('El Nombre tiene que ser Obligatorio'),
  check('email').isEmail().withMessage('Email Invalido, verificar'),
  check('id').isLength({min:1}).withMessage('ID Obligatorio'),
  check('password').isLength({min:1}).withMessage('Pass Obligatoria'),
  check('repassword').isLength({min:1}).withMessage('Comprobacion de Pass Obligatoria')
], userController.store);

router.get('/destroy/:id',userController.destroy);

router.get('/login',userController.login);
router.post('/login', [
  check('email').isEmail().withMessage('Email Invalido, verificar'),
  check('password').isLength({min:1}).withMessage('Pass Obligatoria')
] ,userController.access);

router.get('/check', function(req,res,next){
  if(typeof req.session.usuarioLogueado == 'undefined'){
    res.send('no estas logueado');
  } else {
    res.send('El usuario logueado es: ' + req.session.usuarioLogueado.email);
  }
});


router.get('/cerrarsesion',function(req,res,next){
  req.session.usuarioLogueado = undefined;
  res.redirect('/users/login');
})

module.exports = router;
