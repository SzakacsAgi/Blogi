class AuthenticatedUserViewDisplayer extends PageViewDisplayer{

    constructor(){
        super();
    }

    displayAuthenticatedArticlePage(){
        this.displayCommentEditButtons();
        this.displayWriteCommentSection();
    }

    displayAuthenticatedHeader(){
        this.displayUserNameInHeader();
        this.displayProfilePicture(this.elementProvider.getSubComponent(this.header, ".profile-picture"));
        let signedInHeaderPart = this.elementProvider.getSubComponent(this.header, "#signed-in-user");
        this.displayElement(signedInHeaderPart);
    }

    displayUserNameInHeader(){
        let userNameElement = this.elementProvider.getSubComponent(this.header, "#username");
        this.elementModifier.setElementText(userNameElement, AuthenticatedUserInfo.name);
    }

    displayProfilePicture(imageElement){
       this.elementModifier.setElementAttributes(imageElement, {src:AuthenticatedUserInfo.imageURL});
    }

    displayCommentEditButtons(){
        let editCommentButtons = this.elementProvider.getSubComponent(document, `div[user-id="${AuthenticatedUserInfo.id}"]`);
        let isAuthenticatedUserWroteComment = editCommentButtons !== null;
        if(isAuthenticatedUserWroteComment){
            this.displayElement(editCommentButtons);
        }
    }

    displayWriteCommentSection(){
        let writeCommentElement = this.elementProvider.getElementById("write-comment");
        this.displayProfilePicture(this.elementProvider.getSubComponent(writeCommentElement, ".profile-picture"));
        this.displayElement(writeCommentElement);
    }

}