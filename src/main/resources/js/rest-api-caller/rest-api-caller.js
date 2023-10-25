class RESTAPICaller {
    constructor() {
        this.urlProvider = new URLProvider();
        this.errorChecker = new RESTAPIErrorChecker();
        this.queryParamFormatter = new QueryParamFormatter()

        this.tokenProvider = new TokenProvider();
        this.userToken = this.tokenProvider.getUserTokenAfterSignIn();
        this.authorizationHeader = { "Authorization":this.userToken };
        this.authorizationHeaderWithContentType = {
            "Content-Type": "application/json",
            "Authorization":this.userToken
        };
    }
}

class ArticleRESTAPICaller extends RESTAPICaller {
    constructor() {
        super();
    }

    async getASingleArticle(id) {
        return await fetch(this.urlProvider.getBaseArticleURL() + "/" + id, { method: 'GET' })
            .then(response => this.errorChecker.check(response))
            .then(response => response.json())
            .catch(error => console.log(error));
    }

    async getAllCategories() {
        return await fetch(this.urlProvider.getCategoriesURL(), { method: 'GET' })
            .then(response => this.errorChecker.check(response))
            .then(response => response.json())
            .catch(error => console.log(error));
    }

    async getAllArticles(queryParams) {
        let formattedQueryParams = this.queryParamFormatter.format(queryParams);
        return await fetch(this.urlProvider.getBaseArticleURL() + "/?" + formattedQueryParams, { method: 'GET' })
            .then(response => this.errorChecker.check(response))
            .then(response => response.json())
            .catch(error => console.log(error));
        }

    async deleteArticle(id, header) {
        return await fetch(this.urlProvider.getBaseArticleURL() + "/" + id, { method: 'DELETE',  headers: header})
            .then(response => this.errorChecker.check(response))
            .catch(error => console.log(error));
    }

    async createArticle(body){
        await fetch(this.urlProvider.getBaseArticleURL()+"/", { method: 'POST', headers: this.authorizationHeaderWithContentType, body:body})
        .then(response => this.errorChecker.check(response))
        .then(location.href = this.urlProvider.getHomePageURL())
        .catch(error => console.log(error));
    }

    async updateArticle(articleId, body){
         let errorChecker = new RESTAPIErrorChecker();
         await fetch(this.urlProvider.getUpdateArticleURL(articleId), {method: 'PUT', headers: this.authorizationHeaderWithContentType, body:body})
         .then(response => this.errorChecker.check(response))
         .then(location.href = this.urlProvider.getHomePageURL())
         .catch(error => console.log(error));
     }
}

class AuthenticationRESTAPICaller extends RESTAPICaller {
    constructor() {
        super();
    }

    async getAuthenticatedUser(){
        return await fetch(this.urlProvider.getAuthenticatedUserInformationURL(), { method: 'GET', headers: this.authorizationHeader })
            .then(response => this.errorChecker.check(response))
            .then(response => response.json())
            .catch(error => console.log(error));
    }

    async detectAuthenticationStatus(){
        return await fetch(this.urlProvider.getAuthenticatedUserInformationURL(), { method: 'GET', headers: this.authorizationHeader })
            .then(response => this.errorChecker.check(response))
            .then(() => 200)
            .catch(error => console.log(error));
    }

    async logOut(){
        return await fetch(this.urlProvider.getLogOutURL(), { method: 'DELETE', headers: this.authorizationHeader })
            .then(response => this.errorChecker.check(response))
            .then(() => 200)
            .catch(error => console.log(error));
    }

    async getUserInfo(userId){
        return await fetch(this.urlProvider.getUserInfoURL(userId), { method: 'GET'})
            .then(response => this.errorChecker.check(response))
            .then(response => response.json())
            .catch(error => console.log(error));
    }
}

class CommentRESTAPICaller extends RESTAPICaller {
    constructor() {
        super();
    }

    async getCommentsByArticle(articleId){
        return await fetch(this.urlProvider.getBaseCommentURL(articleId), { method: 'GET' })
            .then(response => this.errorChecker.check(response))
            .then(response => response.json())
            .catch(error => console.log(error));
    }

    async deleteComment(articleId, commentId) {
        return await fetch(this.urlProvider.getASingleCommentURL(articleId, commentId), { method: 'DELETE', headers: this.authorizationHeaderWithContentType })
            .then(response => this.errorChecker.check(response))
            .catch(error => console.log(error));
    }

    async updateComment(articleId, commentId, body) {
        return await fetch(this.urlProvider.getASingleCommentURL(articleId, commentId), { method: 'PUT', headers: this.authorizationHeaderWithContentType, body:body })
            .then(response => this.errorChecker.check(response))
            .catch(error => console.log(error));      
    }

    async createComment(articleId, body) {
        const response = await fetch(this.urlProvider.getBaseCommentURL(articleId), { method: 'POST', headers: this.authorizationHeaderWithContentType, body: body });
        if (response.headers.has('Location')) {
            const createdCommentURL = response.headers.get('Location');
            const createdComment = await fetch(createdCommentURL);
            return await createdComment.json();
        } else {
            console.log("Location header is not present!");
        }
    }
}

class FileRESTAPICaller extends RESTAPICaller {
    constructor() {
        super();

         this.uploadedFileURL = null;
         this.previousUploadFile = null;
         this.isFirstUpload = true;
    }

    async uploadFile(file){
        this.formData = new FormData();
        this.formData.append('file', file);
        await fetch(this.urlProvider.getUploadFileURL(), { method: 'POST', headers: this.authorizationHeader, body: this.formData,})
        .then(response => this.errorChecker.check(response))
        .then(async (response)  => {
                if(!this.isFirstUpload){
                    await this.deleteFile();
                }
                this.uploadedFileURL = response.headers.get('Location');
                ArticleData.imageURL = this.uploadedFileURL;
                this.isFirstUpload = false;

        })
        .catch(error => console.log(error));
    }

    async deleteFile(){
        this.previousUploadFile = this.uploadedFileURL.substring(this.uploadedFileURL.lastIndexOf("/")+1);
        await fetch(this.urlProvider.getDeleteFileURL(this.previousUploadFile), { method: 'DELETE', headers: this.authorizationHeader})
        .then(response => this.errorChecker.check(response))
        .catch(error => console.log(error));
    }    
}