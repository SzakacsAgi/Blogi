class Redirector {

    tokenSaver;
    storedDataProvider;
    redirectTo;

    constructor(){
        this.tokenSaver = new TokenSaver();
        this.storedDataProvider = new StoredDataProvider();
        this.redirectTo = this.storedDataProvider.getItemFromLocalStorage("pageToRedirect");
    }

    redirect(){
        this.tokenSaver.saveUserToken();
        switch(this.redirectTo){
            case 'home': this.redirectToPage("home");
                break;
            case 'article': this.redirectToPage("article");
                break;
        }
        this.storedDataProvider.clearSpecificItemFromLocalStorage("pageToRedirect");
    }

    redirectToPage(page){
        let pageButtonRedirector = document.getElementById(page+"-button");
        pageButtonRedirector.click();
    }

    redirectWhenPermissionIsDenied() {
        window.location.pathname = "/blogi/permission-denied";
    }

    redirectWhenArticleIdIsNotDefined(){
        window.location.pathname = "/blogi/error";
    }
}