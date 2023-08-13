class SignedInUserViewDisplayer{

    elementModifier;
    header;

    constructor(){
        this.elementModifier = new ElementModifier();
        this.header = document.getElementsByTagName("my-header")[0];
    }

    displayUnAuthenticatedHeader(){
        let signedInButton = this.header.querySelector(".sign-in-button");
        this.elementModifier.removeElementClass(signedInButton, ["hide"]);
    }

    displayAuthenticatedHeader(){
        this.displayUserInfoInHeader();
        let signedInHeaderPart = this.header.querySelector("#signed-in-user");
        this.elementModifier.removeElementClass(signedInHeaderPart, ["hide"]);
    }

    async displayUserInfoInHeader(){
        let userNameElement = this.header.querySelector("#username");
        this.elementModifier.setElementText(userNameElement, AuthenticatedUserInfo.name);
        let imageElement = this.header.querySelector("#profile-picture");
        this.elementModifier.setElementAttributes(imageElement, {src:AuthenticatedUserInfo.imageURL});
    }
}