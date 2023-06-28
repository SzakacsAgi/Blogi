class SingleArticlePageLoader {

    sessionSynchronizer;
    singleArticleLoader;

    constructor() {
        this.sessionSynchronizer = new SessionSynchronizer();
        this.sessionSynchronizer.sync();
        this.singleArticleLoader = new SingleArticleLoader();
    }

    load() {
        this.singleArticleLoader.load();
    }

}

let singleArticlePageLoader = new SingleArticlePageLoader().load();