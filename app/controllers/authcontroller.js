var exports = module.exports = {}
var models = require("../models/")
let moment = require('moment')
moment.locale('id')
exports.signup = function(req,res){
    let nama = req.body.name;
    console.log(nama);
	res.render('signup',{
    'title':'Signup Page',
    'message': req.flash('message')[0]
  });
}

exports.signin = function(req,res){
	res.render('signin',{'title':'Login Page','message': req.flash('message')[0]});
}

exports.index = (req,res)=>{
  let profile = req.user;
  // console.log('Menu : ',profile)
    models.tbl_golongan.findOne({where:{id:profile.kode_golongan}}).then((results)=>{

    res.render('index_admin',{
        profile: profile,
        moment:moment,
        profilePopUp:results,
        title:'Menu Page',
    })
    })
}

exports.login = (req,res)=>{
  let message = req.message;
  console.log('Message ',message)
  res.render('login',{'message': message})
}

exports.logout = function(req,res){

  req.session.destroy((err)=>{
    console.log('LOGOUT ERROR',err)
  })
  res.redirect('/index');
}