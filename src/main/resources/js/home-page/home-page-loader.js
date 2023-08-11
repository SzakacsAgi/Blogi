class HomePageLoader {

    authenticationStatusTracker;
    displayHomePageDynamicComponents;
    eventListeners;
    signedInUserViewDisplayer;
    storedDataProvider;

    constructor(){
        this.authenticationStatusTracker = new AuthenticationStatusTracker();
        this.displayHomePageDynamicComponents = new HomePageDynamicComponentsDisplayer();
        this.eventListeners = new EventListeners();
        this.signedInUserViewDisplayer = new SignedInUserViewDisplayer();
        this.storedDataProvider = new StoredDataProvider();
    }

    async load(){
        await this.authenticationStatusTracker.detectAuthenticationStatus();

        if(this.storedDataProvider.getItemFromSessionStorage("authenticated") === "true"){
            await this.loadAuthenticatedUserView();
        }
        else{
            this.loadUnAuthenticatedUserView()
        }
    }

     async loadAuthenticatedUserView(){
         await this.authenticationStatusTracker.storeUserInfoAboutMe();
         this.signedInUserViewDisplayer.displayAuthenticatedHeader();
         this.displayHomePageDynamicComponents.display();
         this.eventListeners.registerEventListeners();
    }

     loadUnAuthenticatedUserView(){
         this.signedInUserViewDisplayer.displayUnAuthenticatedHeader();
         this.displayHomePageDynamicComponents.display();
         this.eventListeners.registerEventListeners();
    }

}

 window.addEventListener('load', async () => {
    new HomePageLoader().load();
 })