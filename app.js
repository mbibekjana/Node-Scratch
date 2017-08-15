/*Project: Node Scratch
 * Author: Bibekananda Jana
 * 
 * 
 * */




var express 			= require('express');
var path 				= require('path');
var favicon 			= require('static-favicon');
var logger 				= require('morgan');
var cookieParser 		= require('cookie-parser');
var bodyParser 			= require('body-parser');
var flash             	= require('connect-flash');
var crypto            	= require('crypto');
var sess              	= require('express-session');
var Store             	= require('express-session').Store;
var bcrypt 				= require('bcrypt-nodejs');
var passport          	= require('passport');
var LocalStrategy     	= require('passport-local').Strategy;
var partials 			= require('express-partial');


var models 				= require('./models'); 
///passport
passport.use(new LocalStrategy(function(username, password, done) {
   models.users.findOne({ where: {email: username} }).then(function(data) {
	   
      var user = data;
      if(user === null) {
         return done(null, false, {message: 'Invalid username or password'});
      } else {
         user = data.toJSON();
         if(!bcrypt.compareSync(password, user.password)) {
            return done(null, false, {message: 'Invalid username or password'});
         } else {
            return done(null, user);
         }
      }
   });
}));

passport.serializeUser(function(user, done) {
	console.log(user.username);
  done(null, user.username);
});

passport.deserializeUser(function(username, done) {
   models.users.findOne({ where: {email: username} }).then(function(user) {
      done(null, user);
   });
});

///passport end


///Express session store and expiration
var store 				= require('session-memory-store')(sess);






var app 				= express();

		// view engine setup
		app.set('views', path.join(__dirname, 'views'));
		//app.set('view engine', 'jade');
		app.set('view engine', 'ejs');

		app.use(favicon());
		app.use(logger('dev'));
		app.use(bodyParser.json());
		app.use(bodyParser.urlencoded());
		app.use(cookieParser());
		app.use(express.static(path.join(__dirname, 'public')));
		app.use(flash());
		app.use(sess({
				name: 'nodescratch',
				secret: 'MYSECRETISVERYSECRET',
				store:  new store({ expires: 60 * 60 * 1000, debug: true }),
				resave: true,
				saveUninitialized: true
			}));
		app.use(passport.initialize());
		app.use(passport.session());

///routes
var routes 				= require('./routes/index');
var users 				= require('./routes/users');
var authentication 		= require('./routes/auth.js');
var api 				= require('./routes/api');
///routes end


		app.use('/', routes);
		app.use('/api/v1', api);
		app.use('/users', users);
		app.use('/auth', authentication);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
