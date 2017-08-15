/*Project: Node Scratch
 * Author: Bibekananda Jana
 * 
 * 
 * */
"using strict";
var models = require('../../models');
var jwt = require('jsonwebtoken');
var SECRET = 'nodescratch';




exports.index = function(req, res) {
	
	
	models.users.findAll().then(function(users) {
	
            if (users.length) {
				return res.json(users);
               
            }
           
        })
        .catch(function(error) {
			return res.send(error);
          
        });

   
};


exports.login = function(req, res) {
    
    
    models.users.findById(req.query.data.mobileno).then(function(users) {
     
        if (Number(req.body.data.mobileno) === Number(users.mobileno)) {
              
               var token =    jwt.sign({users}, SECRET, { expiresIn: 18000 });
                    res.json(token) ;
            }else{
                return res.json("invalid username or password");
            }
        })
        .catch(function(error) {
            return res.send(error);
          
        });

   
};



exports.userdetails = function(req, res) {
    
    var token=req.query.token;
    var id=req.query.id;
    jwt.verify(token, SECRET, function(err, decoded) {
             if (err) {
                        res.json('Invalid Token');
                        }else{
                    res.json(decoded);
                models.users.findById(id).then(function(users) {                   
                res.json(users);
        })
        .catch(function(error) {
            return res.send(error);
          
            });
        
        }
    });
};



