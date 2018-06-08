'use strict'

module.exports = function (sequelize, Sequelize) {
    var tblJabatan = sequelize.define('tbl_jabatan',{
        kode_jabatan: {primaryKey:true, type:Sequelize.STRING(5)},
        jabatan: {type:Sequelize.STRING(15)},
        tunjangan_jabatan: {type:Sequelize.DOUBLE(12,11)}
    })
    return tblJabatan
}