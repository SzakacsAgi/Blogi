class CommentBuilder {

    commentInfo;
    userInfo;
    elementCreator;
    elementModifier;
    elementProvider;

    commentElement;
    creationDateElement;
    contentElement;
    userImageElement;
    userNameElement;
    editCommentButtons;
    deleteCommentButton;
    submitUpdateCommentButton;


    constructor(){
        this.elementCreator = new ElementCreator();
        this.elementModifier = new ElementModifier();
        this.elementProvider = new ElementProvider();
    }

    async build(comment, userId){
       this.commentInfo = new CommentInfo(comment);
       this.userInfo =  new UserInfo(userId);
       await this.getCommentElement();
       this.setElementsToModify();
       this.setCommentData();
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
        this.elementModifier.setElementAttributes(this.submitUpdateCommentButton, {"comment-id":this.commentInfo.getId()});
    }

}