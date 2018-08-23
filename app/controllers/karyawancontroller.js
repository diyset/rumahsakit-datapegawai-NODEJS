'use strict'

var exports = module.exports = {}
var models = require("../models/")
let Sequelize = require('sequelize')
let moment = require('moment')
let currencyFormat = require('currency-formatter')

moment.locale('id')
exports.listKaryawan = (req,res)=>{
    let profile = req.user;
    var profilePopUpTemp;
    console.log(profile)
    if(profile.kode_golongan!=null) {
        models.tbl_golongan.findOne({where: {id: profile.kode_golongan}}).then((profilePopUp) => {
            profilePopUpTemp = profilePopUp;
        })
    } else {
        profilePopUpTemp = "";
    }
    models.sequelize.query('SELECT * FROM tbl_karyawans JOIN tbl_golongans on tbl_karyawans.kode_golongan = tbl_golongans.id order by tbl_karyawans.nip asc ',
        {
            type: Sequelize.QueryTypes.SELECT},
        {raw:true})
        .then((results)=>{
        // console.log('Menu : ',profile)
        console.log(profilePopUpTemp)
        console.log('Results : '+results[0])
        res.render('list_karyawan',{
            profile: profile,
            currencyformat: currencyFormat,
            profilePopUp: profilePopUpTemp,
            title:'Menu Page',
            karyawan: results,
            moment:moment
        })
    }).catch((err)=>{
        console.log(err.message)
        res.render('error',{error:err,message:'Error Catching'})
    })
}
exports.nonAktifkanKaryawan = (req,res)=>{
    let profile = req.user;
    let nipParams = req.params.nip;
    let data = {
        status_aktif:'Tidak Aktif'
    }
    models.tbl_karyawan.update({status_aktif:'Tidak Aktif'},{where:{nip:nipParams}}).then((results)=>{
        res.redirect('/karyawan')
    }).catch((err)=>{
        console.log(err.message)
        res.render('error',{error:err,message:'Error Catching'})
    })
}


exports.aktifkanKaryawan = (req,res)=>{
    let profile = req.user;
    console.log('aktifkanKaryawan')
    let nipParams = req.params.nip;
    console.log(nipParams)
    let data = {
        status_aktif: 'Aktif'
    }
    console.log('TEST')
    models.tbl_karyawan.update({status_aktif:'Aktif'},{where:{nip:nipParams}}).then((results)=>{
       console.log('Masuk Model')
       res.redirect('/karyawan')
   }).catch((err)=>{
       console.log(err.message)
       res.render('error',{error:err,message:'Error Catching'})
   })
}

exports.detailKaryawan = (req,res)=>{
    let profile = req.user;
    // profile = JSON.stringify(profile)
    console.log(profile)
    models.tbl_golongan.findAll().then((resultsGolongan)=>{
        // models.tbl_karyawan.findOne({where:{nip:req.params.nip}},{include:{model:models.tbl_golongan}}).then((resultsKaryawan)=>{
        let resultsTempKaryawan = "";
        models.sequelize.query(
            'Select * from tbl_karyawans join tbl_golongans on tbl_karyawans.kode_golongan = tbl_golongans.id ' +
            'where nip = :nip',{
                replacements: {nip:profile.nip},
                type : Sequelize.QueryTypes.SELECT
            },
            {raw:true}).
        then((resultsKaryawan)=>{
            resultsTempKaryawan = resultsKaryawan[0];
            console.log(resultsKaryawan)
            console.log('Results Karyawan : '+resultsKaryawan.golongan)
        res.render('edit_karyawan',{
            profile:profile,
            moment:moment,
            golongan:resultsGolongan,
            karyawan:resultsTempKaryawan
        })
        })
    }).catch((err)=>{
        console.log(err.message)
        res.render('error',{error:err,message:'Error Catching'})
    })
}
