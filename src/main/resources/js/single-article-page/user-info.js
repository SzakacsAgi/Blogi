class UserInfo {

    constructor(user){
        this.user = user;
    }

    getUserId(){
        return this.user.userId;
    }

    getUserName(){
        return this.user.name;
    }

    getUserImage(){
        return this.user.imageURL;
    }

}
