class SingleArticlePageLoader {

    articleId;
    storedDataProvider = new StoredDataProvider();
    sessionSynchronizer = new SessionSynchronizer();

    constructor() { }

    load() {
        this.sessionSynchronizer.sync();
        this.articleId = this.storedDataProvider.getItemFromSessionStorage("articleId");

    }

}

let singleArticlePageLoader = new SingleArticlePageLoader().load();