class HeaderEventListeners{

    header;
    storedDataProvider;

    constructor(){
        this.header = document.getElementsByTagName("my-header")[0];
        this.storedDataProvider = new StoredDataProvider();
    }

    registerEventListeners(){
        this.addEventListenersToSignInPage();
    }

    addEventListenersToSignInPage(){
        let signInButton = this.header.querySelector(".sign-in-button");
        signInButton.addEventListener("click", () => {
            let locationPathname = window.location.pathname;
            let pageToRedirect = locationPathname.substr(locationPathname.lastIndexOf("/")+1);
            this.storedDataProvider.setItemToLocalStorage("pageToRedirect", pageToRedirect);
        })
    }

}