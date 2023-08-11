class TokenProvider {

    storedDataProvider;

    constructor(){
        this.storedDataProvider = new StoredDataProvider();
    }

    getUserTokenDuringRedirect(){
         let urlSearchPart =  window.location.search;
         return "Bearer " + urlSearchPart.slice(urlSearchPart.indexOf("=") +1);
    }

    getUserTokenAfterSignIn(){
        return this.storedDataProvider.getItemFromSessionStorage("userToken");
    }

}