class URLProvider {

    #serverOrigin;
    #apiPrefix;
    #authenticationServerOrigin;
    #authenticationApi;
    #redirectUri;
    #authenticationApiPrefix;
    #userApi;

    constructor() {
        this.#serverOrigin = window.location.origin;
        this.#apiPrefix = "/blogi";
        this.#authenticationServerOrigin = "http://localhost:8081/";
        this.#authenticationApiPrefix = "blogi/authentication/"
        this.#authenticationApi = "oauth2/authorize/";
        this.#redirectUri = "?redirect_uri=http://localhost:8080/blogi/redirect";
        this.#userApi = "user/me"
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
        return this.#authenticationServerOrigin + this.#authenticationApiPrefix + this.#authenticationApi + socialMediaName + this.#redirectUri;
    }

    getSignedInUserInformation(){
        return this.#authenticationServerOrigin + this.#authenticationApiPrefix + this.#userApi;
    }

}