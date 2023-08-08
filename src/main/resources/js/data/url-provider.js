class URLProvider {

    #serverOrigin;
    #apiPrefix;
    #authenticationServerOrigin;
    #authenticationApi;
    #redirectUri;

    constructor() {
        this.#serverOrigin = window.location.origin;
        this.#apiPrefix = "/blogi";
        this.#authenticationServerOrigin = "http://localhost:8081/";
        this.#authenticationApi = "blogi/authentication/oauth2/authorize/";
        this.#redirectUri = "?redirect_uri=http://localhost:8080/blogi/redirect";
    }

    getArticlePageURL() {
        return this.getBaseURL() + "/article";
    }

    getHomePageURL() {
        return this.getBaseURL() + "/home";
    }

    getArticleEditorURL() {
        return this.getBaseURL() + "/editor";
    }

    getBaseURL() {
        return this.#serverOrigin + this.#apiPrefix;
    }

    getSignInUrl(socialMediaName){
        return this.#authenticationServerOrigin + this.#authenticationApi + socialMediaName + this.#redirectUri;
    }

}