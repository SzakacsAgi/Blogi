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

    async storeUserInfoAboutMe(){
        let me = await this.authenticationRESTAPICaller.detectWhoIAm();
        Me.id = me.userId;
        Me.name = me.name;
        Me.email = me.email;
        Me.imageURL = me.imageURL;
        Me.role = me.role;
        Me.isAdmin = me.role === "ADMIN";
    }

}