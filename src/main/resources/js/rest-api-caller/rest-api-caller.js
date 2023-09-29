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