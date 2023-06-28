class URLProvider {

    #serverOrigin;
    #apiPrefix;

    constructor() {
        this.#serverOrigin = window.location.origin;
        this.#apiPrefix = "/blogi";
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

}