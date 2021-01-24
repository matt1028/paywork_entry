const { json } = require("body-parser");
const article = require("../services/article");
const {
    getAllArticles, getArticlebyId, createArticle, updateArticle, createComment, deleteArticle
} = require("../services/article");

module.exports = {

    //모든 게시글 불러오기
    async apiGetAllArticles(req,res,next){
        try{
            const articles = await getAllArticles();
            if(!articles){
                res.status(404).json("No article posted yet")
            }
            res.json(articles);
        }catch(error){
            res.status(500).json({error : error })
        }
    },

    //게시글 검색, 상세보기 
    async apiGetArticleById(req,res,next){
        try{
            let id = req.params.id || {};
            const article = await getArticlebyId(id);
            res.json(article);
        }catch(error){

        }
    },

    //게시글 추가
    async apiCreateArticle (req,res, next){
        try{
            const createdArticle = await createArticle(req.body);
            res.json(createdArticle);
        }catch(error){
            res.status(500).json({error: error});
        }
    },

    //게시물 수정
    async apiUpdateArticle(req,res,next){
        try {
            const articleId = req.params.id;
            const {title, body, articleImage} = req.body;
            const comment = {title, body, articleImage}
            const updatedArticle = await updateArticle(articleId, comment);
            if(!updatedArticle.ok) throw new Error("Error in updating");
            res.json(updatedArticle);
        } catch (error) {
            res.status(500).json({error : error});
        }
    },

    //댓글 추가
    async apiCreateComment(req,res,next){
        try {
            const articleId = req.params.id;
            const {contents, author} = req.body;
            const comment = {contents, author}
            const createdComment = await createComment(articleId, comment);
            res.json(createdComment);
        } catch (error) {
            res.json({error : error})
        }
    },


    //게시물 삭제
    async apiDeleteArticle(req,res,next){
        try{
            const articleId = req.params.id;
            const deleteResponse = await deleteArticle(articleId);
            res.json(deleteResponse);
        }catch(error){
            res.json({error : error});
        }
    },



}