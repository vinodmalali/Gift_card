var pool = require('../database');
// const {signupValidation , loginValidation } = require('../controllers/validation');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const tokenKey = process.env.TOKEN_KEY;
const {encrypt, decrypt} = require("../helper/AES");

module.exports = {
    signup : (req, res, next) => {
       // console.log(req.body)
    
        pool.query(
        `SELECT * FROM users WHERE LOWER(email) = LOWER(${pool.escape(
        req.body.emailId
        )});`,
        (err, result) => {
        if (result.length) {
        return res.status(409).send({
        msg: 'User already exist with same email ID'
        });
        } else {
        
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt)
        
        //console.log(req.body.tenantId.id)
        // pool.query(`select * from users where tenantId = ?`,[Number(decrypt(req.body.tenantId.id))],(error, results, ) => {
        //     // console.log(results.length)
            
  
        //       if (error) {
        //           console.log(error);
        //           return res.status(500).send({
        //             msg : error
        //           });
        //         }
           
            pool.query(
                `INSERT INTO users (fname,lname, email, password) VALUES ('${req.body.fName}','${req.body.lName}',${pool.escape(req.body.emailId)}, ${pool.escape(hash)})`,
                (err, result) => {
                if (err) {
                throw err;
                
                }
                return res.status(201).send({
                msg: 'The user has been registered with us!'
                });
                }
                );
            
           
           
        // }) 
       
   
    

}
}
);
},

    loginValidation : (req, res, next) => {
    pool.query(
    `SELECT * FROM users WHERE email = ${pool.escape(req.body.emailId)};`,
    (err, result) => {
    // user does not exists
    if (err) {
    throw err;
   
    }
    if (!result.length) {
    return res.status(400).send({
    msg: 'Email or password is incorrect!'
    });
    }
    
    bcrypt.compare(
        req.body.password,

        result[0]['password'],
        
        (bErr, bResult) => {
        // wrong password
        if (bErr) {
        throw bErr;
        
        }
        if (bResult) {
        const token = jwt.sign({id:result[0].id,emailId:result[0].emailId},tokenKey,{ expiresIn: '1h' });
        pool.query(
        `UPDATE users SET logintime = now() WHERE id = '${result[0].id}'`
        );
        
        //setting the userdetails
        var userDetails = {};
        userDetails.id = encrypt(result[0].id);
        userDetails.fName = result[0].fName;
        userDetails.lName = result[0].lName;
        userDetails.emailId = result[0].emailId;
        userDetails.loginTime = result[0].loginTime;

        return res.status(200).send({
        msg: 'Logged in!',
        token,
        user: userDetails
        
        });
        }
        return res.status(400).send({
        msg: 'Username or password is incorrect!'
        });
        }
        );
        }
        );
        }
};
