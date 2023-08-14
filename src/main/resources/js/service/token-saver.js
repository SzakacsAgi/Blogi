class TokenSaver {

    tokenProvider;
    storedDataProvider;

    constructor(){
        this.storedDataProvider = new StoredDataProvider();
        this.tokenProvider = new TokenProvider();
    }

    saveUserToken(){
        this.storedDataProvider.setItemToLocalStorage("userToken", this.tokenProvider.getUserTokenDuringRedirect());
    }

}