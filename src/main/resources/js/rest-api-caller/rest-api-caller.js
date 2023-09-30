class RESTAPICaller {

    url;

    constructor(url="") {
        this.url = url;
    }

    async sendGETSingleRequest(id) {
        let errorChecker = new RESTAPIErrorChecker();

        return await fetch(this.url + "/" + id, { method: 'GET' })
            .then(errorChecker.check)
            .then(response => response.json())
            .then(function (json) {
                return { status: 200, payload: json };
            })
            .catch(function (error) {
                return { status: error.status };
            });
    }

    async sendGETAllRequest(queryParams) {
        let errorChecker = new RESTAPIErrorChecker();
        let queryParamFormatter = new QueryParamFormatter();
        let formattedQueryParams = queryParamFormatter.format(queryParams);

        return await fetch(this.url + "/?" + formattedQueryParams, { method: 'GET' })
            .then(errorChecker.check)
            .then(response => response.json())
            .then(function (json) { return { status: 200, payload: json }; })
            .catch(function (error) {
                return { status: error.status };
            });
    }

    async sendDELETESingleRequest(id) {
        let errorChecker = new RESTAPIErrorChecker();

        return await fetch(this.url + "/" + id, { method: 'DELETE' })
           .then(errorChecker.check)
           .then(response => response.json())
           .then(function (json) {
                return { status: 204, payload: json };
            })
           .catch(function (error) {
                return { status: error.status };
            });
    }

}

class ArticleRESTAPICaller extends RESTAPICaller {

    urlProvider;

    constructor(url) {
        super(url);
        this.urlProvider = new URLProvider();
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

    urlProvider;
    tokenProvider;
    userToken;
    header;

    constructor(url) {
        super(url);
        this.urlProvider = new URLProvider();
        this.tokenProvider = new TokenProvider();
        this.userToken = this.tokenProvider.getUserTokenAfterSignIn();
        this.header = { "Authorization":this.userToken };
    }

    async getAuthenticatedUser(){
        let errorChecker = new RESTAPIErrorChecker();

        return await fetch(this.urlProvider.getAuthenticatedUserInformationURL(), { method: 'GET', headers: this.header })
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

            return await fetch(this.urlProvider.getAuthenticatedUserInformationURL(), { method: 'GET', headers: this.header })
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

        return await fetch(this.urlProvider.getLogOutURL(), { method: 'DELETE', headers: this.header })
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

    urlProvider;
    storedDataProvider;
    articleId;

    constructor() {
        super();
        this.urlProvider = new URLProvider();
        this.tokenProvider = new TokenProvider();
        this.userToken = this.tokenProvider.getUserTokenAfterSignIn();
        this.header = {
            "Content-Type": "application/json",
            "Authorization":this.userToken
        };
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
        return await fetch(this.urlProvider.getASingleCommentURL(articleId, commentId), { method: 'DELETE', headers: this.header })
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

        return await fetch(this.urlProvider.getASingleCommentURL(articleId, commentId), { method: 'PUT', headers: this.header, body:body })
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
        const response = await fetch(this.urlProvider.getBaseCommentURL(articleId), { method: 'POST', headers: this.header, body: body });
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

    urlProvider;
    storedDataProvider;

    constructor() {
        super();
        this.urlProvider = new URLProvider();
        this.storedDataProvider = new StoredDataProvider();
        this.headers = {
            'Authorization': this.storedDataProvider.getItemFromLocalStorage('userToken')
         };

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
            headers: this.headers,
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
            headers: this.headers,
       })
        .then(errorChecker.check)
        .catch(function (error) {
            return { status: error.status };
        });
    }
}

class AdminOperationRESTAPICaller extends RESTAPICaller {

    urlProvider;
    storedDataProvider;

    constructor() {
        super();
        this.urlProvider = new URLProvider();
        this.storedDataProvider = new StoredDataProvider();
        this.headers = {
            'Content-Type': 'application/json',
            'Authorization': this.storedDataProvider.getItemFromLocalStorage('userToken')
         };
    }

     async createArticle(body){
         let errorChecker = new RESTAPIErrorChecker();
         await fetch(this.urlProvider.getBaseArticleURL()+"/", {
             method: 'POST',
             headers: this.headers,
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
             headers: this.headers,
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