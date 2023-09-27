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

}