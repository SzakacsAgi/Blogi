class CommentBuilder {

    constructor(){
        this.elementCreator = new ElementCreator();
        this.elementModifier = new ElementModifier();
        this.elementProvider = new ElementProvider();
        this.userPermissionVerifier = new UserPermissionVerifier();
        this.commentEventListenerRegister = new CommentEventListenerRegister();
    }

    async build(comment, userId){
       this.commentInfo = new CommentInfo(comment);
       this.userInfo =  new UserInfo(userId);
       await this.getCommentElement();
       this.setElementsToModify();
       this.setCommentData();
       this.addEventListener();
       return this.commentElement;
    }

    async getCommentElement(){
       this.commentElement = await this.elementProvider.getElementFromHtmlFile('comment.html');
    }

    setElementsToModify(){
        this.creationDateElement = this.elementProvider.getSubComponent(this.commentElement, "#comment-date");
        this.contentElement = this.elementProvider.getSubComponent(this.commentElement, "#comment-content");
        this.editCommentContentElement = this.elementProvider.getSubComponent(this.commentElement, "#edit-comment-content");
        this.userImageElement = this.elementProvider.getSubComponent(this.commentElement, "#user-image");
        this.userNameElement = this.elementProvider.getSubComponent(this.commentElement, "#user-name");
        this.editCommentButtons = this.elementProvider.getSubComponent(this.commentElement, "#edit-comment");
        this.deleteCommentButton = this.elementProvider.getSubComponent(this.commentElement, "#delete-comment");
        this.updateCommentButton = this.elementProvider.getSubComponent(this.commentElement, "#update-comment");
        this.submitUpdateCommentButton = this.elementProvider.getSubComponent(this.commentElement, "#submit-update-comment");
    }

    setCommentData(){
        this.elementModifier.setElementText(this.creationDateElement, this.commentInfo.getCreationDate());
        this.elementModifier.setElementText(this.contentElement, this.commentInfo.getContent());
        this.elementModifier.setElementAttributes(this.editCommentContentElement, {"value":this.commentInfo.getContent()});
        this.elementModifier.setElementAttributes(this.userImageElement, {"src":this.userInfo.getUserImage()});
        this.elementModifier.setElementText(this.userNameElement, this.userInfo.getUserName());
        this.elementModifier.setElementAttributes(this.editCommentButtons, {"user-id":this.commentInfo.getUserId()});
        this.elementModifier.setElementAttributes(this.deleteCommentButton, {"comment-id":this.commentInfo.getId()});
        this.elementModifier.setElementAttributes(this.updateCommentButton, {"comment-id":this.commentInfo.getId()});
        this.elementModifier.setElementAttributes(this.submitUpdateCommentButton, {"user-id":this.userInfo.getUserId()});
    }

    addEventListener(){

        let hasPermissionToDelete = this.userPermissionVerifier.hasPermissionForDeleteComment(this.commentInfo);
        let hasPermissionToUpdate = this.userPermissionVerifier.hasPermissionForUpdateComment(this.commentInfo);
        if (hasPermissionToUpdate) {
                    console.log("Got permission to update");

            this.commentEventListenerRegister.registerUpdateButton(this.updateCommentButton);
        }
        if(hasPermissionToDelete){
            console.log("Got permission to delete");
            this.commentEventListenerRegister.registerDeleteButton(this.deleteCommentButton);
        }
        else{
            this.deleteCommentButton.removeAttribute("data-bs-toggle");
            this.deleteCommentButton.removeAttribute("data-bs-target");
        }
    }

}