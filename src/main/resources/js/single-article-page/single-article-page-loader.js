class SingleArticlePageLoader {

    sessionSynchronizer;
    singleArticleLoader;
    authenticationStatusTracker;
    signedInUserViewDisplayer;
    storedDataProvider;

    constructor() {
        this.sessionSynchronizer = new SessionSynchronizer();
        this.sessionSynchronizer.sync();
        this.singleArticleLoader = new SingleArticleLoader();
        this.authenticationStatusTracker = new AuthenticationStatusTracker();
        this.signedInUserViewDisplayer = new SignedInUserViewDisplayer();
        this.storedDataProvider = new StoredDataProvider();
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
        await this.authenticationStatusTracker.storeUserInfoAboutMe();
        this.signedInUserViewDisplayer.displayAuthenticatedHeader();
    }

    loadUnAuthenticatedUserView(){
        this.signedInUserViewDisplayer.displayUnAuthenticatedHeader();
    }

}

window.addEventListener('load', async () => {
    new SingleArticlePageLoader().load();
})
