'use strict'
module.exports = function(sequelize, Sequelize){
    var tblGolongan = sequelize.define('tbl_golongan',{

        golongan: {type: Sequelize.STRING(40)},
        gaji_pokok: {type: Sequelize.DOUBLE(15,2)},
    })

    return tblGolongan;
}


