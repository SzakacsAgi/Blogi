class UserInfo {

    urlProvider;
    authenticationRESTAPICaller;
    userInfo;

    constructor(){
        this.urlProvider = new URLProvider();
        this.authenticationRESTAPICaller = new AuthenticationRESTAPICaller(this.urlProvider.getBaseAuthenticationURL());
    }

    async getUserInfo(userId){
        let userInfoList = await this.authenticationRESTAPICaller.getUserInfo(userId);
        if(userInfoList.length > 0){
            this.userInfo = userInfoList[0];
        }
    }

    getUserId(){
        return this.userInfo.userId;
    }

    getUserName(){
    if(this.userInfo){
        return this.userInfo.name;
        }
    }

    getUserImage(){
if(this.userInfo){
        return this.userInfo.imageURL;
        }
    }

}