var mongoose = require('mongoose');

var catSchema = new mongoose.Schema({
    name: {
        type: String
    },
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin',
    }
})

module.exports = mongoose.model("category",catSchema);