var jwt = require('jsonwebtoken');
var tutorCollection = require('../models/tutorSchema');
var studentCollection = require('../models/studentSchema');

const findByToken = async (req,res,next)=>{
    token = req.header('authorization')

    try {
        
        jwt.verify(token, 'hamzapro', async function (err, decoded) {
            if (decoded) {
                if (decoded.name == 'tutor') {
                    const user = await tutorCollection.findById(decoded.id)
                    if (user) {
                        next()
                    }
                    else {
                        res.status(401).send("please first login!")
                        next()
                    }

                }

                if (decoded.name == 'student') {
                    const user = await studentCollection.findById(decoded.id)
                    if (user) {
                        next()
                    }
                    else {
                        res.status(401).send("please first login!")
                    }
                }
            }
            if (err) {
                res.status(500).send("Server internal error:" + err)
            }
        });

      } catch(err) {
        res.status(404).send('Error:' + err);
      }

    
}

module.exports = findByToken