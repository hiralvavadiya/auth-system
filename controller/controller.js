var model = require('../model/model');
var cat = require('../model/model_cat');
const bcrypt = require('bcrypt');

exports.index = async (req, res) => {

    req.body.image = req.file.originalname 

    var b_pass = await bcrypt.hash(req.body.password,10);
    req.body.password = b_pass;

    try{
        var data = await model.create(req.body);

        res.status(200).json({
            status: 'success',
            data
        })
    }
    catch(error){
        res.status(200).json({
            status:error
        })
    }
};

// pagination
exports.find_data = async (req, res) => {

    var limit =2;
    var page_no = req.query.page_no;

    if(page_no==undefined){
        page_no=1;
    }

    var start = (page_no-1)*limit;

    var total_record = await model.find().count();
    var total_page = Math.ceil(total_record/limit);

    var data = await model.find().skip(start).limit(limit);

    res.status(200).json({
        status: 'data get',
        data,
        total_page,
        page_no
    })

};

exports.cat_insert = async (req,res) => {
    var data = await cat.create(req.body);
    res.status(200).json({
        status: 'data inserted',
        data
    })
};

exports.cat_get_data = async (req,res) => {
    var data = await cat.find().populate("user_id");
    res.status(200).json({
        status: 'data get',
        data
    })
}