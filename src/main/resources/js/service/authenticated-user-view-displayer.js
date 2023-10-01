class AuthenticatedUserViewDisplayer extends PageViewDisplayer{

    constructor(){
        super();
    }

    displayAuthenticatedArticlePage(){
        this.displayCommentEditButtons();
        this.displayWriteCommentSection();
    }

    async displayAuthenticatedHeader(){
        await this.initializeHeader();
        this.displayUserNameInHeader();
        this.displayProfilePicture(this.elementProvider.getSubComponent(this.header, ".profile-picture"));
        let signedInHeaderPart = this.elementProvider.getSubComponent(this.header, "#signed-in-user");
        this.elementModifier.displayElement(signedInHeaderPart);
    }

    displayUserNameInHeader(){
        let userNameElement = this.elementProvider.getSubComponent(this.header, "#username");
        this.elementModifier.setElementText(userNameElement, AuthenticatedUserInfo.name);
    }

    displayProfilePicture(imageElement){
       this.elementModifier.setElementAttributes(imageElement, {src:AuthenticatedUserInfo.imageURL});
    }

    displayCommentEditButtons(){
        let editCommentButtonsWrittenByAuthenticatedUser = Array.from(this.elementProvider.getAllSubComponent(document, `div[user-id="${AuthenticatedUserInfo.id}"]`));
        let allEditCommentButtons = Array.from(this.elementProvider.getAllSubComponent(document, "#edit-comment"));
        let isAuthenticatedUserWroteComment = editCommentButtonsWrittenByAuthenticatedUser !== null;
        let authenticatedUserIsNotTheWriter =  allEditCommentButtons.filter(x => !editCommentButtonsWrittenByAuthenticatedUser.includes(x));
        if(AuthenticatedUserInfo.isAdmin){
            allEditCommentButtons.forEach(editCommentButton => this.elementModifier.displayElement(editCommentButton));
            if(authenticatedUserIsNotTheWriter){
                authenticatedUserIsNotTheWriter.forEach(button => {
                    this.elementModifier.hideElement(this.elementProvider.getSubComponent(button, "#update-comment"));
                })
            }
        }
        else if(isAuthenticatedUserWroteComment){
            editCommentButtonsWrittenByAuthenticatedUser.forEach(editCommentButton => this.elementModifier.displayElement(editCommentButton))
        }
    }

    displayWriteCommentSection(){
        let writeCommentElement = this.elementProvider.getElementById("write-comment");
        this.displayProfilePicture(this.elementProvider.getSubComponent(writeCommentElement, ".profile-picture"));
        this.elementModifier.displayElement(writeCommentElement);
    }

}