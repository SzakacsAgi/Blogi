class SingleArticlePageLoader extends PageLoader{

    sessionSynchronizer;
    singleArticleLoader;
    commentLoader;

    constructor() {
        super();
        this.sessionSynchronizer = new SessionSynchronizer();
        this.sessionSynchronizer.sync();
        this.singleArticleLoader = new SingleArticleLoader();
        this.commentLoader = new CommentLoader();
    }

    async load() {
        await super.load();
        this.singleArticleLoader.load();
    }

    async loadAuthenticatedUserView(){
        await super.loadAuthenticatedUserView();
        await this.commentLoader.load();
        this.authenticatedUserViewDisplayer.displayAuthenticatedArticlePage();
    }

    async loadUnAuthenticatedUserView(){
        await super.loadUnAuthenticatedUserView();
        await this.commentLoader.load();
        this.unauthenticatedUserViewDisplayer.displayUnAuthenticatedArticlePage();
    }

}

window.addEventListener('load', async () => {
    new SingleArticlePageLoader().load();
 })