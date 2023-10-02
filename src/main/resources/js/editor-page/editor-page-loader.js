class EditorPageLoader {

    constructor() {
        this.sessionSynchronizer = new SessionSynchronizer();
        this.sessionSynchronizer.sync();

        this.storedDataProvider = new StoredDataProvider();
        this.articleId = this.storedDataProvider.getItemFromSessionStorage("articleId");
        this.singleArticleLoader = new SingleArticleLoader();
        this.editorPageEventListeners = new EditorPageEventListeners();
        this.authenticationStatusTracker = new AuthenticationStatusTracker();
        this.componentInitializer = new ComponentInitializer();
        this.redirector = new Redirector();
    }

    async load() {
        let pageWasOpenedThroughNormalFlow = this.articleId !== null;
        if(pageWasOpenedThroughNormalFlow){
            await this.componentInitializer.init();
            await this.singleArticleLoader.loadArticleToArticleEditorPage();
            this.editorPageEventListeners.registerEventListeners();
        }
        else{
            this.redirector.redirectWhenArticleIdIsNotDefined();
        }


    }

}

window.addEventListener('load', async () => {
    new EditorPageLoader().load();
 })