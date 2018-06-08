'use strict'
module.exports = function(sequelize, Sequelize){
    var tblKaryawan = sequelize.define('tbl_karyawan',{
        nip: {autoIncrement:true, primaryKey:true, type:Sequelize.INTEGER},
        nama: {type: Sequelize.STRING(50),notEmpty:true},
        tanggal_lahir: {type: Sequelize.DATE,notEmpty:true},
        tempat_lahir: {type: Sequelize.STRING(50)},
        alamat: {type:Sequelize.TEXT},
        jenis_kelamin:{type: Sequelize.STRING(20),notEmpty:true},
        status:{type: Sequelize.STRING(40),notEmpty:true},
        kode_jabatan:{type: Sequelize.STRING(5),notEmpty:true},
        kode_golongan:{type: Sequelize.STRING(5),notEmpty:true},
        golongan:{type: Sequelize.STRING(15)},
        tanggal_masuk:{type: Sequelize.DATE},
        pendidikan_akhir:{type: Sequelize.STRING(10)},
        last_login: {type: Sequelize.DATE},
    })

    return tblKaryawan;
}
