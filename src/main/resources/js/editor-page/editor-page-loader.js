class EditorPageLoader {

    constructor() {
        this.sessionSynchronizer = new SessionSynchronizer();
        this.sessionSynchronizer.sync();

        this.storedDataProvider = new StoredDataProvider();
        this.singleArticleLoader = new SingleArticleLoader();
        this.editorPageEventListeners = new EditorPageEventListeners();
        this.authenticationStatusTracker = new AuthenticationStatusTracker();
        this.componentInitializer = new ComponentInitializer();
    }

    async load() {
        await this.singleArticleLoader.loadArticleToArticleEditorPage();
        await this.componentInitializer.init();
        this.editorPageEventListeners.registerEventListeners();
    }

}

window.addEventListener('load', async () => {
    new EditorPageLoader().load();
 })