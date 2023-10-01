class PageLoader{

    authenticationStatusTracker;
    authenticatedUserViewDisplayer;
    unauthenticatedUserViewDisplayer;
    storedDataProvider;
    headerEventListeners;

    constructor(){
        this.authenticationStatusTracker = new AuthenticationStatusTracker();
        this.authenticatedUserViewDisplayer = new AuthenticatedUserViewDisplayer();
        this.unauthenticatedUserViewDisplayer = new UnauthenticatedUserViewDisplayer();
        this.storedDataProvider = new StoredDataProvider();
        this.headerEventListeners = new HeaderEventListeners();
    }

    async load(){
        await this.authenticationStatusTracker.detectAuthenticationStatus();
        let isAuthenticated = this.storedDataProvider.getItemFromSessionStorage("authenticated") === "true";

        if(isAuthenticated){
             await this.loadAuthenticatedUserView();
        }
        else{
            await this.loadUnAuthenticatedUserView()
        }
        this.addEventListeners();
    }

    async loadAuthenticatedUserView(){
        await this.authenticationStatusTracker.storeUserInfoAboutAuthenticatedUser();
        await this.authenticatedUserViewDisplayer.displayAuthenticatedHeader();
    }

    async loadUnAuthenticatedUserView(){
        await this.unauthenticatedUserViewDisplayer.displayUnAuthenticatedHeader();
    }

    addEventListeners(){
        this.headerEventListeners.registerEventListeners();
    }

}
