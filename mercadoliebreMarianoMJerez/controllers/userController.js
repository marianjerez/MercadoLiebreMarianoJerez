const fs = require('fs');
const bcrypt = require('bcrypt');
const { profile } = require('console');
const { check, validationResult , body} = require('express-validator');
let users = JSON.parse(fs.readFileSync(__dirname + '/../data/usersDataBase.json','utf8'));


const userController = {
    login : function(req,res,next){
        res.render('login');
    },
    access : function(req,res,next){
        /*CHEQUEO ERRORES DE CARGA DE FORMULARIO*/
        let errors = validationResult(req);
        if( !errors.isEmpty() ){
            return res.render('login', {errors:errors.errors});
        }
        /* SI NO HAY ERRORES RECORRO LA BASE DE DATOS COMPARANDO EMAIL Y CONTRASEñA*/
        for (i=0; i<users.length; i++){
            if (users[i].email == req.body.email){
                if (bcrypt.compareSync(req.body.password, users[i].password)){
                    var usuarioALoguear = users[i];
                    break;
                }
            }
        }
        /*SI NO ENCONTRO EL USER:*/
        if (typeof usuarioALoguear == 'undefined'){
            return res.render('login', {errors: [
                {msg : 'Email o Password incorrectas'}
            ]});
        }
        /*SI ENCONTRO EL USER LO GUARDO EN SESSION*/
        req.session.usuarioLogueado = usuarioALoguear;
        console.log(req.body.recordame);
        if(req.body.recordame != 'undefined'){
            res.cookie('recordame', usuarioALoguear.email, {maxAge : 1000*60*10});
        }
        res.render('users/profile', {usuarioALoguear});
    },
    register : function(req,res,next){
        res.render('registro');
    },
    store : function(req,res,next){
        var errors = validationResult(req);
        console.log(errors);
        if( !errors.isEmpty() ){
            return res.render('registro',{errors:errors.errors});
        }
        let newUser = req.body;
        if (newUser.fotousuario){
            newUser.fotousuario = req.files[0].filename;
        } else {
            newUser.fotousuario = 'none';
        }
        newUser.password = bcrypt.hashSync(newUser.password,10);
        newUser.repassword = bcrypt.hashSync(newUser.password,10);
        users.push(newUser);
        fs.writeFileSync(__dirname + '/../data/usersDataBase.json',JSON.stringify(users));
        res.redirect('login');
    },
    destroy : function(req,res,next){
        let newUsers = users.filter(element => {
            return req.params.id != element.id;
        })
        fs.writeFileSync(__dirname + '/../data/usersDataBase.json',JSON.stringify(newUsers));
        res.send('Eliminado exitosamente!');
    }
}

module.exports = userController;