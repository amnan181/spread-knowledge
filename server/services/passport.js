var LocalStrategy = require('passport-local');
var tutorCollection = require('../models/tutorSchema');
var studentCollection = require('../models/studentSchema');
var jwt = require("jsonwebtoken")

module.exports = (passport,app,dbname)=>{

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    if(dbname=='/tutors/login'){
      tutorCollection.findById(id, function(err, user) {
      done(err, user);
    });
  }
  else if(dname=='/students/login'){
    studentCollection.findById(id, function(err, user) {
      done(err, user);
    });

  }
  });


    passport.use(new LocalStrategy({usernameField:'email'},
        function(email, password, done) {
        if(dbname==='/tutors/login'){
          tutorCollection.findOne({ tEmail: email , tPassword: password}, function (err, user) {
            if (err) { 
              return done(err); }
            if (!user) {
              return done(null, false, { message: 'Incorrect username.' });
            }
            // if (!user.validPassword(password)) {
            //   return done(null, false, { message: 'Incorrect password.' });
            // }


            return done(null, user);
          });
      } else if(dbname === '/students/login') {
        studentCollection.findOne({ email: email, password: password }, function (err, user) {
          if (err) { return done(err); }
          if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
          }
          // if (!user.validPassword(password)) {
          //   return done(null, false, { message: 'Incorrect password.' });
          // }
          return done(null, user);
        });
      }
    }
      ));

      generateAuthToken = (user,name)=>{
       const token = jwt.sign({id:user._id,name},'hamzapro')
        return token
      }

      
      
      app.post('/tutors/login',  passport.authenticate('local'), function(req, res) {
        const token = generateAuthToken(req.user,'tutor')
        
        // res.status(200).send(req.user)
        res.status(200).send({user:req.user,
          token:token})
        
      });

      app.post('/students/login',passport.authenticate('local'),(req,res)=>{
        const token = generateAuthToken(req.user,'student')
        
        res.status(200).send({user:req.user,
        token:token})
       
      })

}