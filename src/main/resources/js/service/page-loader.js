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
        this.modalLoader = new ModalLoader();
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
        await this.authenticatedUserViewDisplayer.displayAuthenticatedHeader();
        await this.modalLoader.load();
    }

    async loadUnAuthenticatedUserView(){
        await this.unauthenticatedUserViewDisplayer.displayUnAuthenticatedHeader();
        await this.modalLoader.load();
    }

    addEventListeners(){
        this.headerEventListeners.registerEventListeners();
    }

}
