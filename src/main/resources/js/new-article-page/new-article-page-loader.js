class NewArticlePageLoader {

    constructor() {
        this.newArticlePageEventListeners = new NewArticleEventListeners();
        this.newArticlePageExceptionHandler = new NewArticlePageExceptionHandler();
        this.authenticationStatusTracker = new AuthenticationStatusTracker();
        this.storedDataProvider = new StoredDataProvider();
    }

    async load() {
        await this.authenticationStatusTracker.detectAuthenticationStatus();
        let isAuthenticated = this.storedDataProvider.getItemFromSessionStorage("authenticated") === "true";
        this.newArticlePageEventListeners.registerEventListeners();
        this.newArticlePageExceptionHandler.registerExceptionHandlers();
    }

}

window.addEventListener('load', async () => {
    new NewArticlePageLoader().load();
 })