class Redirector {

    tokenSaver;
    storedDataProvider;
    whichPageICame;

    constructor(){
        this.tokenSaver = new TokenSaver();
        this.storedDataProvider = new StoredDataProvider();
        this.whichPageICame = this.storedDataProvider.getItemFromLocalStorage("pageToRedirect");
    }

    redirect(){
        this.tokenSaver.saveUserToken();
        switch(this.whichPageICame){
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

}

new Redirector().redirect();