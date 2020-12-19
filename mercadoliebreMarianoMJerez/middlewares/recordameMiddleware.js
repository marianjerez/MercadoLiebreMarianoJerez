var fs = require('fs');
let users = JSON.parse(fs.readFileSync(__dirname + '/../data/usersDataBase.json','utf8'));

/*llevar el middleware a toda la app*/
const recordameMiddleware = function (req,res,next){
    if(typeof req.cookies.recordame != 'undefined' && typeof req.session.usuarioLogueado == 'undefined'){
        for (i=0; i<users.length; i++){
            if (users[i].email == req.cookies.recordame){
                    var usuarioALoguear = users[i];
                    break;
            }
        } 
        req.session.usuarioLogueado = usuarioALoguear;
    } 
    
    next();
}

module.exports = recordameMiddleware;