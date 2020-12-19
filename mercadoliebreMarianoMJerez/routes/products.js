var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path');

/* GET products listing. */
const productsController = require('../controllers/productsController');

/*MULTER y Path. Luego de aplicar upload.any() a la ruta que lo necesite configuramos en el controller el objeto para tomar la imagen*/
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  })
   
  var upload = multer({ storage: storage })

/*CLASICO AMB:*/
/* DAR DE ALTA*/
router.get('/create',productsController.create);
router.post('/create',upload.any(),productsController.store);

/* DAR DE BAJA*/
router.get('/destroy/:id',productsController.destroy);

/* MODIFICAR*/
router.get('/edit/:id',productsController.edit);
router.post('/edit/:id',upload.any(),productsController.update);

/*VER - 
PONGO POR ULTIMO PORQUE EJECUTA DESDE ARRIBA HACIA ABAJO, SI TOMO UNA RUTA MUY GENERAL LA EJECUTA PRIMERO Y ARRUINA LO QUE ESTE MAS ABAJO*/
router.get('/',productsController.vistaProducto);
router.get('/:id',productsController.id);

module.exports = router;