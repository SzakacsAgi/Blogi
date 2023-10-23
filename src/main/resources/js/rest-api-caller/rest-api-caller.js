class RESTAPICaller {

    constructor() {
        this.urlProvider = new URLProvider();
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
        let errorChecker = new RESTAPIErrorChecker();

        return await fetch(this.urlProvider.getBaseArticleURL() + "/" + id, { method: 'GET' })
            .then(errorChecker.check)
            .then(response => response.json())
            .then(function (json) {
                return { status: 200, payload: json };
            })
            .catch(function (error) {
                return { status: error.status };
            });
    }

    async getAllArticles(queryParams) {
        let errorChecker = new RESTAPIErrorChecker();
        let queryParamFormatter = new QueryParamFormatter();
        let formattedQueryParams = queryParamFormatter.format(queryParams);

        return await fetch(this.urlProvider.getBaseArticleURL() + "/?" + formattedQueryParams, { method: 'GET' })
            .then(errorChecker.check)
            .then(response => response.json())
            .then(function (json) { return { status: 200, payload: json }; })
            .catch(function (error) {
                return { status: error.status };
            });
        }

    async deleteArticle(id, header) {
        let errorChecker = new RESTAPIErrorChecker();
        return await fetch(this.urlProvider.getBaseArticleURL() + "/" + id, { method: 'DELETE',  headers: header})
           .then(errorChecker.check)
           .then(response => response.json())
           .then(function (json) {
                return { status: 204, payload: json };
           })
           .catch(function (error) {
               return { status: error.status };
           });
    }

    async getAllCategories() {
        let errorChecker = new RESTAPIErrorChecker();

        return await fetch(this.urlProvider.getCategoriesURL(), { method: 'GET' })
            .then(errorChecker.check)
            .then(response => response.json())
            .then(function (json) {
                 return { status: 200, payload: json };
            })
            .catch(function (error) {
                return { status: error.status };
            });
    }
}

class AuthenticationRESTAPICaller extends RESTAPICaller {

    constructor() {
        super();
    }

    async getAuthenticatedUser(){
        let errorChecker = new RESTAPIErrorChecker();

        return await fetch(this.urlProvider.getAuthenticatedUserInformationURL(), { method: 'GET', headers: this.authorizationHeader })
           .then(errorChecker.check)
           .then(response => response.json())
           .then(function (json) {
              return  json;
           })
           .catch(function (error) {
              return { status: error.status };
           });
    }

    async detectAuthenticationStatus(){
        let errorChecker = new RESTAPIErrorChecker();

            return await fetch(this.urlProvider.getAuthenticatedUserInformationURL(), { method: 'GET', headers: this.authorizationHeader })
                .then(errorChecker.check)
                .then(response => response.json())
                .then(function (json) {
                    return 200;
                })
                .catch(function (error) {
                    return { status: error.status };
                });
    }

    async logOut(){
        let errorChecker = new RESTAPIErrorChecker();

        return await fetch(this.urlProvider.getLogOutURL(), { method: 'DELETE', headers: this.authorizationHeader })
            .then(errorChecker.check)
            .then(response => response.json())
            .then(function (json) {
                return 200;
            })
            .catch(function (error) {
                return { status: error.status };
            });
    }

    async getUserInfo(userId){
        let errorChecker = new RESTAPIErrorChecker();

        return await fetch(this.urlProvider.getUserInfoURL(userId), { method: 'GET'})
            .then(errorChecker.check)
            .then(response => response.json())
            .then(function (json) {
                return json;
            })
            .catch(function (error) {
                return { status: error.status };
            });
    }
}

class CommentRESTAPICaller extends RESTAPICaller {

    constructor() {
        super();
    }

    async getCommentsByArticle(articleId){
        let errorChecker = new RESTAPIErrorChecker();

        return await fetch(this.urlProvider.getBaseCommentURL(articleId), { method: 'GET' })
            .then(errorChecker.check)
            .then(response => response.json())
            .then(function (json) {
                return json;
            })
            .catch(function (error) {
                return { status: error.status };
            });
    }

    async deleteComment(articleId, commentId) {
        let errorChecker = new RESTAPIErrorChecker();
        return await fetch(this.urlProvider.getASingleCommentURL(articleId, commentId), { method: 'DELETE', headers: this.authorizationHeaderWithContentType })
           .then(errorChecker.check)
           .then(response => response.json())
           .then(function (json) {
                return { status: 204, payload: json };
            })
           .catch(function (error) {
               return { status: error.status };
           });
    }

    async updateComment(articleId, commentId, body) {
        let errorChecker = new RESTAPIErrorChecker();

        return await fetch(this.urlProvider.getASingleCommentURL(articleId, commentId), { method: 'PUT', headers: this.authorizationHeaderWithContentType, body:body })
           .then(errorChecker.check)
           .then(response => response.json())
           .then(function (json) {
                return { status: 204, payload: json };
            })
           .catch(function (error) {
               return { status: error.status };
           });
    }

    async createComment(articleId, body) {
        const response = await fetch(this.urlProvider.getBaseCommentURL(articleId), { method: 'POST', headers: this.authorizationHeaderWithContentType, body: body });
        if (response.headers.has('Location')) {
            const locationURL = response.headers.get('Location');
            const contentResponse = await fetch(locationURL);
            return contentResponse.json();
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
        let errorChecker = new RESTAPIErrorChecker();
        this.formData = new FormData();
        this.formData.append('file', file);
        await fetch(this.urlProvider.getUploadFileURL(), {
            method: 'POST',
            headers: this.authorizationHeader,
            body: this.formData,
        })
        .then(errorChecker.check)
        .then(async (response)  => {
            if (response.status === 201) {
                if(!this.isFirstUpload){
                    await this.deleteFile();
                }
                this.uploadedFileURL = response.headers.get('Location');
                ArticleData.imageURL = this.uploadedFileURL;
                this.isFirstUpload = false;
            }
        })
        .catch(function (error) {
            return { status: error.status };
        });
    }

    async deleteFile(){
        let errorChecker = new RESTAPIErrorChecker();
        this.previousUploadFile = this.uploadedFileURL.substring(this.uploadedFileURL.lastIndexOf("/")+1);
        await fetch(this.urlProvider.getDeleteFileURL(this.previousUploadFile), {
            method: 'DELETE',
            headers: this.authorizationHeader,
       })
        .then(errorChecker.check)
        .catch(function (error) {
            return { status: error.status };
        });
    }
}

class AdminOperationRESTAPICaller extends RESTAPICaller {

    constructor() {
        super();
    }

     async createArticle(body){
         let errorChecker = new RESTAPIErrorChecker();
         await fetch(this.urlProvider.getBaseArticleURL()+"/", {
             method: 'POST',
             headers: this.authorizationHeaderWithContentType,
             body:body
         })
         .then(errorChecker.check)
         .then(response => {
             if (response.status === 201) {
                 location.href = this.urlProvider.getHomePageURL();
             } else {
                 console.log('Request problems');
             }
         })
         .catch(function (error) {
             return { status: error.status };
         });
     }

    async updateArticle(articleId, body){
         let errorChecker = new RESTAPIErrorChecker();
         await fetch(this.urlProvider.getUpdateArticleURL(articleId), {
             method: 'PUT',
             headers: this.authorizationHeaderWithContentType,
             body:body
         })
         .then(errorChecker.check)
         .then(response => {
             if (response.status === 204) {
                 location.href = this.urlProvider.getHomePageURL();
             } else {
                 console.log('Request problems');
             }
         })
         .catch(function (error) {
             return { status: error.status };
         });
     }

}