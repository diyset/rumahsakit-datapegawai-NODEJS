'use strict'

module.exports = function (sequelize, Sequelize) {
    var tblJabatan = sequelize.define('tbl_jabatan',{

        jabatan: {type:Sequelize.STRING(40)},
        tunjangan_jabatan: {type:Sequelize.DOUBLE(15,2)}
    })
    return tblJabatan
}