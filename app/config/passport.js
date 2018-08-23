'use strict';

let dateformat = require('dateformat')
let bCrypt = require('bcrypt-nodejs')
let Sequelize = require('sequelize')
let Op = Sequelize.Op;
let moment = require('moment')


module.exports = (passport,user)=>{
    
    let User = user;
    let LocalStrategy = require('passport-local').Strategy;

    passport.serializeUser((user,done)=>{
        done(null, user.nip)
    })

    passport.deserializeUser((nip, done)=>{
        User.findById(nip).then((user)=>{
            if(user){
                done(null, user.get())
            } else {
                done(user.errors,null)
            }
        })
    })

    passport.use('local-signup', new LocalStrategy(
        {
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback: true
    },

    (req,email,password,done)=>{

        let generateCrypt = (password)=>{
            return bCrypt.hashSync(password,bCrypt.genSaltSync(4),null);
        }
        // dateformat.masks.tanggalLahir = 'DD/MM/YYYY';
        let bodyTanggal_lahir = req.body.tanggal_lahir;
        let tanggal_lahir = dateformat(bodyTanggal_lahir,'tanggalLahir')
        console.log(req.body.email)
        console.log(req.body.tanggal_lahir)
        let dateFormat = req.body.tanggal_lahir;
        let afterParsing = moment(dateFormat).format('D/MMM/YYYY')
        console.log(dateFormat)
        console.log(afterParsing)
        User.findOne({ where:{ [Op.or]: [{ email: email } , { nip: email }]}}).then((user)=>{
            if(user){
                return done(null, false, req.flash('message','Email is Already Taken'))
            }

            else {
                let userPassword = generateCrypt(password)
                let purePassword = req.body.password;
                let data = {
                    
                    email:email,
                    password: userPassword,
                    nama: req.body.name,
                    tanggal_lahir: req.body.tanggal_lahir,
                    tempat_lahir: req.body.tempat_lahir,
                    jenis_kelamin: req.body.jenis_kelamin,
                    status: req.body.status,
                    pendidikan_akhir: req.body.pendidikan_terakhir,
                    alamat: req.body.alamat,
                    kode_golongan: 99,
                    tanggal_masuk: new Date(),
                    last_login: new Date(),
                    status_aktif: "Aktif"
                }
        let confirmPassword = req.body.confirmPassword;
        console.log(tanggal_lahir)
         if(purePassword != confirmPassword){
             console.log(data.password, confirmPassword)
             return done(null, false, req.flash('message','Confirm Password is not valid'))
         }
         console.log('Data : '+data.dataValues)
        User.create(data).then((newUser,created)=>{
            if(!newUser){
                return done(null,false)
            }
            if(newUser){
                return done(null,newUser)
            }
        })
            }
        })
    }
))


passport.use('local-signin', new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
},

    (req, email, password, done)=>{
        var date = new Date();
        let createDateAsUTC = (date)=>{
            return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
        }      
        let User = user;
        let isValidPassword = (userpass, password)=>{
            return bCrypt.compareSync(password, userpass)
        }


        /*
            QUERY ORM
         */
        // User.findOne({
        //     where:{
        //         [Op.or]:
        //             [{ email: email } ,
        //                 { nip: email }]}
        // })

        /*
        Query RAW
         */
            User.sequelize.query('SELECT * FROM tbl_karyawans join tbl_golongans ON tbl_karyawans.kode_golongan = tbl_golongans.id where email = ?',{
                replacements:[email],
                type: Sequelize.QueryTypes.SELECT
            },{raw:true})
            .then((user)=>{
                console.log(user[0])
            //Validasi username tidak ditemukan
            if(!user[0]){
                return done(null, false, req.flash('message','Akun tidak ditemukan!'))
            }
            //Validasi Status Aktif
            //Validasi username atau password salah
            if(!isValidPassword(user[0].password, password)){
                return done(null, false, req.flash('message','Username atau Password salah!'))
            }

            if(user[0].status_aktif=='Tidak Aktif'){
                return done(null, false, req.flash('message','Akun Anda tidak Aktif! harap hubungin admin'))
            }
            let data = {
                last_login: createDateAsUTC(date)
            }
            User.update({last_login:data.last_login},{where:{nip:user[0].nip}}).then((newUser,created)=>{
                console.log('newUser',newUser)
            })
            let userinfo = user[0];
                console.log(user[0])
                console.log('userinfo '+JSON.stringify(userinfo))
                JSON.stringify(userinfo)
            return done(null,userinfo)

        }).catch((err)=>{
            console.log("Error ",err)
            return done(null, false, {message: 'Something went wrong with your signin'})
        })
    }
))
}