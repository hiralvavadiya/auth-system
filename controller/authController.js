var model = require('../model/model');
const storage = require('node-persist');
var cat = require('../model/model_cat');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');   //jwt
storage.init();

// exports.register = async(req,res) =>{
//     try{
        
//         var data = await model.create(req.body);
//         res.status(200).json({
//             status:'data insert',
//             data
//         })
//     }
//     catch(error){
//         res.status(200).json({
//             status:error
//         })
//     }
// }

exports.login = async (req,res) => {

    var data = await model.find({"email":req.body.email});

    var login_status = await storage.getItem('login_user')

    if(login_status==undefined){
        if(data.length==1){
            bcrypt.compare(req.body.password,data[0].password, async function(err,result){
                if(data[0].password==req.body.password){
                    await storage.setItem('login_user',data[0].id)
    
                    var token = jwt.sign({id:data[0].id}, 'secretkey');
    
                    res.status(200).json({
                        status:'Login success',
                        token
                    })
                }
                else{
                    res.status(200).json({
                        status:'Check your email and password'
                    })
                }
            })
        }
        else{
            res.status(200).json({
                status:'Check your email and password'
            })
        }
    }
    else{
        res.status(200).json({
            status:'user is already login'
        })
    }
}

exports.logout = async (req,res) =>{
    await storage.clear();
    res.status(200).json({
        status:'logout'
    })
} 