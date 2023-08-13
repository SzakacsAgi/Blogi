class AuthenticationStatusTracker {

    authenticationRestApiCaller;
    tokenSaver;

    constructor(){
        this.authenticationRESTAPICaller = new AuthenticationRESTAPICaller();
        this.tokenSaver = new TokenSaver();
    }

    async detectAuthenticationStatus(){
        let statusCode = await this.authenticationRESTAPICaller.detectAuthenticationStatus();
        let isAuthenticated = statusCode === 200 ? true : false;
        this.tokenSaver.saveAuthenticatedToken(isAuthenticated);
    }

    async storeUserInfoAboutAuthenticatedUser(){
        let authenticatedUser = await this.authenticationRESTAPICaller.getAuthenticatedUser();
        AuthenticatedUserInfo.id = authenticatedUser.userId;
        AuthenticatedUserInfo.name = authenticatedUser.name;
        AuthenticatedUserInfo.email = authenticatedUser.email;
        AuthenticatedUserInfo.imageURL = authenticatedUser.imageURL;
        AuthenticatedUserInfo.isAdmin = authenticatedUser.role === "ADMIN";
    }

}