'use strict'
module.exports = function (sequelize, Sequelize) {
    var tblPenggajian = sequelize.define('tbl_penggajian',{
        no_slip: {primaryKey:true, type:Sequelize.STRING(7)},
        nip: {type:Sequelize.STRING(20)},
        tanggal: {type:Sequelize.DATE},
        gaji_pokok: {type:Sequelize.DOUBLE(12,11)},
        tunjangan_jabatan: {type:Sequelize.DOUBLE(11,11)}
    })
    return tblPenggajian
}