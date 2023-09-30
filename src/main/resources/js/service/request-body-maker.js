class RequestBodyMaker{

    constructor(){}

    makeRequestBodyToUpdateComment(content, userId){
        let body = {
            content: content,
            userId: userId
        }
        return JSON.stringify(body);
    }

    makeRequestBodyToCreateComment(content, userId){
        let body = {
            content: content,
            userId: userId
        }
        return JSON.stringify(body);
    }

    makeRequestBodyToCreateArticle(){
        let body = {
            title: ArticleData.title,
            authorName: ArticleData.author,
            minutesToRead: ArticleData.minutesToRead,
            content: ArticleData.content,
            imageURL: ArticleData.imageURL,
            categories: ArticleData.categories,
            summary: {
                content: "",
                imageURL: ArticleData.imageURL
            }
        }
        return JSON.stringify(body);
    }

    makeRequestBodyToUpdateArticle(){
        let body = {
            title: ArticleData.title,
            authorName: ArticleData.author,
            minutesToRead: ArticleData.minutesToRead,
            content: ArticleData.content,
            imageURL: ArticleData.imageURL,
            categories: ArticleData.categories,
            summary: {
                content: "",
                imageURL: ArticleData.imageURL
            }
        }
        return JSON.stringify(body);
    }



}