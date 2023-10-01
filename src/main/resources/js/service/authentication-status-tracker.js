class AuthenticationStatusTracker {

    urlProvider;
    authenticationRestApiCaller;
    tokenSaver;
    storedDataProvider;

    constructor(){
        this.urlProvider = new URLProvider();
        this.authenticationRESTAPICaller = new AuthenticationRESTAPICaller(this.urlProvider.getBaseAuthenticationURL());
        this.tokenSaver = new TokenSaver();
        this.storedDataProvider = new StoredDataProvider();
    }

    async detectAuthenticationStatus(){
        let statusCode = await this.authenticationRESTAPICaller.detectAuthenticationStatus();
        let isAuthenticated = statusCode === 200 ? true : false;
        if (isAuthenticated) {
            await this.storeUserInfoAboutAuthenticatedUser();
        }
        this.storedDataProvider.setItemToSessionStorage("authenticated", isAuthenticated);
    }

    async storeUserInfoAboutAuthenticatedUser(){
        let authenticatedUser = await this.authenticationRESTAPICaller.getAuthenticatedUser();
        AuthenticatedUserInfo.id = authenticatedUser.userId;
        AuthenticatedUserInfo.name = authenticatedUser.name;
        AuthenticatedUserInfo.email = authenticatedUser.email;
        AuthenticatedUserInfo.imageURL = authenticatedUser.imageURL;
        AuthenticatedUserInfo.role = authenticatedUser.role;
        AuthenticatedUserInfo.isAdmin = authenticatedUser.role === "ADMIN";
    }

}