class URLProvider {

    #frontendServerOrigin;
    #frontendApiPrefix;
    #authenticationServerOrigin;
    #authenticationApi;
    #redirectUri;
    #authenticationApiPrefix;
    #articleServerOrigin;
    #articleApiPrefix;
    #fileServerOrigin;
    #fileApiPrefix;

    constructor() {
        this.#frontendServerOrigin = window.location.origin;
        this.#frontendApiPrefix = "/blogi";
        this.#authenticationServerOrigin = "http://192.168.100.14:8081/";
        this.#authenticationApiPrefix = "blogi/authentication"
        this.#authenticationApi = "/oauth2/authorize/";
        this.#redirectUri = "?redirect_uri=http://localhost:8080/blogi/redirect";
        this.#articleServerOrigin = "http://192.168.100.14:8082/";
        this.#articleApiPrefix = "blogi/article";
        this.#fileServerOrigin = "http://192.168.100.14:8083/";
        this.#fileApiPrefix = "blogi/file";
    }

    getArticlePageURL() {
        return this.getBaseFrontendURL() + "/article";
    }

    getHomePageURL() {
        return this.getBaseFrontendURL() + "/home";
    }

    getArticleEditorURL() {
        return this.getBaseFrontendURL() + "/editor";
    }

    getBaseFrontendURL() {
        return this.#frontendServerOrigin + this.#frontendApiPrefix;
    }

    getBaseAuthenticationURL(){
        return this.#authenticationServerOrigin + this.#authenticationApiPrefix;
    }

    getAuthenticationURL(socialMediaName){
        return this.getBaseAuthenticationURL() + this.#authenticationApi + socialMediaName + this.#redirectUri;
    }

    getAuthenticatedUserInformationURL(){
        return this.getBaseAuthenticationURL() + "/user/me";
    }

     getBaseArticleURL(){
        return this.#articleServerOrigin + this.#articleApiPrefix;
     }

     getBaseCommentURL(articleId){
        return this.getBaseArticleURL() + "/" + articleId + "/comments";
     }

     getLogOutURL(){
        return this.getBaseAuthenticationURL() + "/signout";
     }

     getUserInfoURL(userId){
        return this.getBaseAuthenticationURL() + '/user/' + userId;
     }

    getBaseFileURL(){
        return this.#fileServerOrigin + this.#fileApiPrefix;
    }

    getUploadFileURL(){
        return this.getBaseFileURL() + "/upload";
    }

    getDeleteFileURL(file){
        return this.getBaseFileURL() + "/" + file;
    }

}