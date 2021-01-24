const Article = require("../models/Article");
const Comment = require("../models/comment");

module.exports = {

    //게시글 불러오기
    async getAllArticles() {
        try{
            const allArticles = await Article.find();
            return allArticles;
        }catch(error){
            console.log("Could not get all articles : ${error}");
        }
    },

    //게시물 상세 보기 
    async getArticlebyId(articleId){
        try{
            const singleArticleResponse = await Article.findById({_id : articleId});
            return singleArticleResponse;
        }catch(error){
            console.log("Article does not exist");
        }
    },


    //게시글 추가
    async createArticle(data){
        try{
            const newArticle = {
                title : data.title,
                body : data.body,
                article_image : data.article_image,
                author : data.author
            }
            const response = await new Article(newArticle).save();
            return response;
        }catch(error){
            console.log(error);
        }
    },


    //게시글 수정 
    async updateArticle(articleId, {title, body, articleImage}){
        try{
            const updateResponse = await Article.updateOne(
                {_id : articleId},
                {title, body, articleImage},
                { $set : { date : new Date.now()}});
            return updateResponse;
        }catch(error){
            console.log("Could not update Article ${error}");
        }
    },  

    //댓글 추가 
    async createComment(articleId, {contents, author}){
        try {
            const comment = new Comment();
            comment.contents = contents;
            comment.author = contents; 

            const commentResponse = await Article.updateOne(
                {_id : articleId},
                {$push : {comments : comment}});
            return commentResponse
        } catch (error) {
            console.log("Could not create Comment ${error}");      
        }
    },

    //게시글 삭제 
    async deleteArticle(articleId){
        try{
            const deletedResponse = await Article.findOneAndDelete(articleId);
            return deletedResponse
        }catch(error){
            console.log("Could not delete article");
        }
    }





}