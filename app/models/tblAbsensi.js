'use strict'
module.exports = function (sequelize, Sequelize) {
    var tblAbsensi = sequelize.define('tbl_absensi',{
        nip:{type: Sequelize.STRING(20),notEmpty:true, primaryKey:true},
        tanggal_absen:{type:Sequelize.DATE,allowNull:false},
        jam_masuk:{type:Sequelize.DATE},
        jam_keluar:{type:Sequelize.DATE},
        keterangan:{type:Sequelize.STRING(15)}
    })
    return tblAbsensi
}