class SingleArticlePageLoader {

    sessionSynchronizer;
    singleArticleLoader;
    authenticationStatusTracker;
    signedInUserViewDisplayer;
    storedDataProvider;
    headerEventListeners;

    constructor() {
        this.sessionSynchronizer = new SessionSynchronizer();
        this.sessionSynchronizer.sync();
        this.singleArticleLoader = new SingleArticleLoader();
        this.authenticationStatusTracker = new AuthenticationStatusTracker();
        this.signedInUserViewDisplayer = new SignedInUserViewDisplayer();
        this.storedDataProvider = new StoredDataProvider();
        this.headerEventListeners = new HeaderEventListeners();
    }

    async load() {
        await this.authenticationStatusTracker.detectAuthenticationStatus();
        if(this.storedDataProvider.getItemFromSessionStorage("authenticated") === "true"){
            await this.loadAuthenticatedUserView();
        }
        else{
            this.loadUnAuthenticatedUserView()
        }
        this.singleArticleLoader.load();
    }

    async loadAuthenticatedUserView(){
        await this.authenticationStatusTracker.storeUserInfoAboutAuthenticatedUser();
        this.signedInUserViewDisplayer.displayAuthenticatedHeader();
        this.headerEventListeners.registerEventListeners();
    }

    loadUnAuthenticatedUserView(){
        this.signedInUserViewDisplayer.displayUnAuthenticatedHeader();
        this.headerEventListeners.registerEventListeners();
    }

}

window.addEventListener('load', async () => {
    new SingleArticlePageLoader().load();
 })