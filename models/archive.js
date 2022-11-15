const mongoose=require('mongoose');
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
    file:{
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
    },
    uploader:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },

})

const Archive =  mongoose.model('archive',archiveSchema);

module.exports= Archive