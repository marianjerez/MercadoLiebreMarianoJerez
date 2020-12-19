const fs = require('fs');
const products = JSON.parse(fs.readFileSync(__dirname + '/../data/productsDataBase.json', 'utf-8'));
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


const routesController = {
    vistaHome : function(req,res){
        res.render('home',{products,toThousand});
    }
}

module.exports = routesController;