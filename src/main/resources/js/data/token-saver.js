class TokenSaver {

    storedDataProvider;

    constructor(){
        this.storedDataProvider = new StoredDataProvider();
    }

     saveUserToken(){
        this.storedDataProvider.setItemToLocalStorage("userToken", this.getUserToken())
     }

     getUserToken(){
        let urlSearchPart =  window.location.search;
        return "Bearer " + urlSearchPart.slice(urlSearchPart.indexOf("=") +1);
     }
}