class HeaderEventListeners{

    header;
    storedDataProvider;
    urlProvider;
    authenticationRESTAPICaller;

    constructor(){
        this.header = document.getElementsByTagName("blogi-header")[0];
        this.storedDataProvider = new StoredDataProvider();
        this.urlProvider = new URLProvider();
        this.authenticationRESTAPICaller = new AuthenticationRESTAPICaller(this.urlProvider.getBaseAuthenticationURL());
    }

    registerEventListeners(){
        this.addEventListenersToSignInButton();
        this.addEventListenersToSignOutButton()
    }

    addEventListenersToSignInButton(){
        let signInButton = this.header.querySelector(".sign-in-button");
        signInButton.addEventListener("click", () => {
            let locationPathname = window.location.pathname;
            let pageToRedirect = this.getPageToRedirect(locationPathname);
            this.storedDataProvider.setItemToLocalStorage("pageToRedirect", pageToRedirect);
        })
    }

     addEventListenersToSignOutButton(){
        let signOutButton = this.header.querySelector("#sign-out");
        signOutButton.addEventListener("click", async () => {
            await this.authenticationRESTAPICaller.logOut();
            this.storedDataProvider.clearSpecificItemFromLocalStorage("userToken");
        })
    }

    getPageToRedirect(locationPathname){
        return locationPathname.substr(locationPathname.lastIndexOf("/")+1);
    }

}