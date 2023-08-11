class TokenSaver {

    tokenProvider;
    storedDataProvider;

    constructor(){
        this.storedDataProvider = new StoredDataProvider();
        this.tokenProvider = new TokenProvider();
    }

    saveUserToken(){
        this.storedDataProvider.setItemToSessionStorage("userToken", this.tokenProvider.getUserTokenDuringRedirect());
        this.storedDataProvider.setItemToLocalStorage("userToken", this.tokenProvider.getUserTokenDuringRedirect());
    }

    saveAuthenticatedToken(authenticated){
        this.storedDataProvider.setItemToSessionStorage("authenticated", authenticated);
    }

}