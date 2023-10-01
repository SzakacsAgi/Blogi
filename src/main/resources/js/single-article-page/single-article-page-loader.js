class SingleArticlePageLoader extends PageLoader{

    sessionSynchronizer;
    singleArticleLoader;
    commentLoader;

     constructor() {
        super();
        this.sessionSynchronizer = new SessionSynchronizer();
        this.sessionSynchronizer.sync();
        this.singleArticleLoader = new SingleArticleLoader();
    }

    async load() {
        await super.load();
        await this.singleArticleLoader.loadArticleToSingleArticlePage();
    }

    async loadAuthenticatedUserView(){
        await super.loadAuthenticatedUserView();
        this.singleArticlePageEventListeners = new SingleArticlePageEventListeners();
        this.commentLoader = new CommentLoader();
        await this.commentLoader.load();
        this.authenticatedUserViewDisplayer.displayAuthenticatedArticlePage();
        this.singleArticlePageEventListeners.registerEvents();
    }

    async loadUnAuthenticatedUserView(){
        await super.loadUnAuthenticatedUserView();
        this.singleArticlePageEventListeners = new SingleArticlePageEventListeners();
        this.commentLoader = new CommentLoader();
        await this.commentLoader.load();
        this.unauthenticatedUserViewDisplayer.displayUnAuthenticatedArticlePage();
        this.singleArticlePageEventListeners.registerEventForSignInHrefButton();
    }

}

window.addEventListener('load', async () => {
    new SingleArticlePageLoader().load();
 })