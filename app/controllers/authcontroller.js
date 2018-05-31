var exports = module.exports = {}


exports.signup = function(req,res){
	res.render('signup',{'title':'Signup Page'}); 
}

exports.signin = function(req,res){
	res.render('signin',{'title':'Login Page'}); 
}

exports.menu = function(req,res){
  let profile = req.user;
  console.log('Menu : ',profile)
  res.render('index',{'profile': profile,'title':'Menu Page'});
}



exports.logout = function(req,res){

  req.session.destroy((err)=>{
    console.log('LOGOUT ERROR',err)
  })
  res.redirect('/index');
}