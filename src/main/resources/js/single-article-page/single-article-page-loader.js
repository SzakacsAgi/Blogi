class SingleArticlePageLoader {

    storedDataProvider = new StoredDataProvider();
    sessionSynchronizer = new SessionSynchronizer();
    singleArticleLoader;

    constructor() { }

     load() {
        this.sessionSynchronizer.sync();
        this.singleArticleLoader = new SingleArticleLoader();
        this.singleArticleLoader.load();
    }

}

let singleArticlePageLoader = new SingleArticlePageLoader().load();