const mongoose = require('mongoose');

const schemaUser=mongoose.Schema({
    email:{ type: String, required: true, unique: true },
    name:{ type: String, required: true},
    lastname:{ type: String, required: true },
    email:{ type: String, required: true, unique: true },
    password:{ type: String, required: true },
    image:String,

})
module.exports= user=mongoose.model('users',schemaUser)