class NewArticlePageLoader {

    constructor() {
        this.newArticlePageEventListeners = new NewArticlePageEventListeners();
        this.authenticationStatusTracker = new AuthenticationStatusTracker();
        this.componentInitializer = new ComponentInitializer();
        this.storedDataProvider = new StoredDataProvider();
    }

    async load() {
        await this.authenticationStatusTracker.detectAuthenticationStatus();
        await this.authenticationStatusTracker.storeUserInfoAboutAuthenticatedUser();
        let isAuthenticated = this.storedDataProvider.getItemFromSessionStorage("authenticated") === "true";
        await this.componentInitializer.init();
        this.newArticlePageEventListeners.registerEventListeners();
    }

}

window.addEventListener('load', async () => {
    new NewArticlePageLoader().load();
 })