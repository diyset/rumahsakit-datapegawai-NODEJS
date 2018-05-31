'use strict';

let bCrypt = require('bcrypt-nodejs')
let md5 = require('crypto')


module.exports = (passport,user)=>{
    
    let User = user;
    let LocalStrategy = require('passport-local').Strategy;

    passport.serializeUser((user,done)=>{
        done(null, user.id)
    })

    passport.deserializeUser((id, done)=>{
        User.findById(id).then((user)=>{
            if(user){
                done(null, user.get())
                done(user.errors,null)
            } else {
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

        User.findOne({where: {email:email}}).then((user)=>{
            if(user){
                return done(null, false, {message: 'That email is Already Taken'})
            }

            else {
                let userPassword = generateCrypt(password)
                let data = {
                    email:email,
                    password: userPassword,
                    firstname: req.body.firstname,
                    lastname: req.body.lastname
                }

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
        let User = user;
        let isValidPassword = (userpass, password)=>{
            return bCrypt.compareSync(password, userpass)
        }
        

        User.findOne({ where: { email: email }}).then((user)=>{
            if(!user){
                console.log("Data Tidak ada",!user)
                return done(null, false, {message: 'Email/Password Salah!'})
            } 

            if(!isValidPassword(user.password, password)){
                console.log(user.password, password)
                console.log("isValidPassword",!isValidPassword)
                return done(null, false, {message: 'Email/Password Salah'})
                console.log(message)
            }
            let userinfo = user.get();
            
            console.log('Berhasil Login',userinfo)
            return done(null,userinfo)

        }).catch((err)=>{
            console.log("Error ",err)
            return done(null, false, {message: 'Something went wrong with your signin'})
        })
    }
))
}