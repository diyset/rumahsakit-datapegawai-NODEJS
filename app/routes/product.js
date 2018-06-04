'use strict'

var productController = require('../controllers/productcontroller');

module.exports = (app)=>{
    app.get('/product', productController.menu)
}