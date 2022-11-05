const mongoose=require('mongoose');

const bcrypt = require('bcrypt')
const Schema=mongoose.Schema;

const archiveSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    language:{
        type:String,
        required:true
    },
    filesize:{
        type:String,
        required:true
    },
    extension:{
        type:String,
        required:true
    },
    bookImage:{
        type:String,
        required:true
    },
    publisher:{
        type:String,
        required:true
    },
    year:{
        type:String,
        required:true
    },
    pages:{
        type:String,
        required:true
    },
    categories:{
        type:[],
        required:true
    }

})

archiveSchema.pre('save', function (next) {
    const user = this
    bcrypt.hash(user.password, 10, (error, hash) => {
        user.password = hash
        next()
    })

})
const Archive =  mongoose.model('archive',archiveSchema);

module.exports= Archive