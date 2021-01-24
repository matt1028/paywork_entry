const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    contents: String,
    author : String,
    comment_date : {type : Date, default : Date.now()}
});

const articleSchema = Schema({
    title : {
        type : String,
        required : true 
    },
    body : {
        type : String,
        required : true
    },
    author : {
        type : String,
        required : true
    },
    article_image : {
        type : String,
        required : false
    },
    date : {
        type : Date,
        default : Date.now()
    },
    comments : [commentSchema]
});

module.exports = Article = mongoose.model("Article", articleSchema);