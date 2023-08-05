class URLProvider {

    #serverOrigin;
    #apiPrefix;
    #authenticationServerOrigin;
    #authenticationWithGoogleApi;

    constructor() {
        this.#serverOrigin = window.location.origin;
        this.#apiPrefix = "/blogi";
        this.#authenticationServerOrigin = "http://localhost:8081/";
        this.#authenticationWithGoogleApi = "blogi/authentication/oauth2/authorize/google?redirect_uri=http://localhost:8080/blogi/redirect"
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

    getGoogleSignInUrl(){
        return this.#authenticationServerOrigin + this.#authenticationWithGoogleApi;
    }

}