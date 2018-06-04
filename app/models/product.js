'use strict'
module.exports = function(sequelize, Sequelize){
    var Product = sequelize.define('tbl_product',{
        id: {autoIncrement:true, primaryKey:true, type:Sequelize.INTEGER},
        nama_produk: {type: Sequelize.STRING(50),notEmpty:true},
        lokasi: {type: Sequelize.STRING(50),notEmpty:true},
        deskripsi: {type: Sequelize.TEXT},
        url_images: {type: Sequelize.STRING(100),notEmpty:true}
    })

    return Product;
}
