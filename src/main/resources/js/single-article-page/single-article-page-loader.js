class SingleArticlePageLoader extends PageLoader{

    sessionSynchronizer;
    singleArticleLoader;
    commentLoader;

     constructor() {
        super();
        this.sessionSynchronizer = new SessionSynchronizer();
        this.sessionSynchronizer.sync();
        this.articleId = sessionStorage.getItem("articleId");
        this.singleArticleLoader = new SingleArticleLoader();
        this.redirector = new Redirector();
    }

    async load() {
        let articleWasOpenedThroughNormalFlow = this.articleId !== null;
        console.log(articleWasOpenedThroughNormalFlow)
        if(articleWasOpenedThroughNormalFlow){
            await this.singleArticleLoader.loadArticleToSingleArticlePage();
            await super.load();
        }
        else{
            this.redirector.redirectWhenArticleIdIsNotDefined();
        }
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