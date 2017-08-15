/*Project: Node Scratch
 * Author: Bibekananda Jana
 * 
 * 
 * */


var models = require('../../models');
var passport = require('passport');
var bcrypt = require('bcrypt-nodejs');


exports.signinview = function(req, res, next){
	res.render('login/index');
}

exports.signin = function(req, res, next) {
	 passport.authenticate('local', { successRedirect: '/',
                          failureRedirect: '/signin'}, function(err, user, info) {
      if(err) {
         return res.render('signin', {title: 'Sign In', errorMessage: err.message});
      } 

      if(!user) {
         return res.render('signin', {title: 'Sign In', errorMessage: info.message});
      }
      return req.logIn(user, function(err) {
         if(err) {
            return res.render('signin', {title: 'Sign In', errorMessage: err.message});
         } else {
			 return res.redirect('/auth');
           //return res.send('/come');
         }
      });
   })(req, res, next);
};
   
exports.signup = function(req, res, next) {
	var user = req.body;
	var usernamePromise = null;
	usernamePromise = models.users.findOne({ where: {email: user.email} });
	 return usernamePromise.then(function(result) {
		 if(result){
			 res.send( 'username already exists');
		 }else
		 {
			var password = user.password;
			var hash = bcrypt.hashSync(password);
			models.users.create({ 
				username: user.email, 
				email:user.email,
				password: hash,
				mobileno:user.mobileno
				 }).then(function(users) {
	
						
						return res.send('user created');
               
						
           
				})
				.catch(function(error) {
					return res.send(error);
          
				});
		 }
	 });
	
	
	
};
