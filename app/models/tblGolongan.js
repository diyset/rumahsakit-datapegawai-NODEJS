'use strict'
module.exports = function(sequelize, Sequelize){
    var tblGolongan = sequelize.define('tbl_golongan',{
        kodeGolongan: {primaryKey:true, type:Sequelize.STRING(5)},
        golongan: {type: Sequelize.STRING(15)},
        gaji_pokok: {type: Sequelize.DOUBLE(12,11)},
    })

    return tblGolongan;
}


