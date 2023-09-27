class UpdateCommentEventListener {

    constructor() {
        this.commentRESTAPICaller = new CommentRESTAPICaller();
        this.storedDataProvider = new StoredDataProvider();
        this.elementProvider = new ElementProvider();
        this.elementModifier = new ElementModifier();
        this.requestBodyMaker = new RequestBodyMaker();
    }

    clickOnButton(updateButton, commentID) {
        this.articleId = this.storedDataProvider.getItemFromSessionStorage('articleId');
        this.commentElement = this.elementProvider.getAncestor(updateButton, '.comment-container');
        this.editCommentView =  this.elementProvider.getSubComponent(this.commentElement, '.edit-comment-view');
        this.commentContent = this.elementProvider.getSubComponent(this.commentElement, '.comment-content');
        this.elementModifier.displayElement(this.editCommentView);
        this.elementModifier.hideElement(this.commentContent);
        this.clickOnUpdateCommentConfirmButton(commentID);
        this.clickOnUpdateCancelationButton();
    }

    clickOnUpdateCommentConfirmButton(commentID){
        let updateCommentConfirmButton = this.elementProvider.getSubComponent(this.commentElement, "#submit-update-comment");
        updateCommentConfirmButton.addEventListener("click", async () => {
            let modifiedCommentContent = this.elementProvider.getSubComponent(this.commentElement, "#edit-comment-content").value;
            let userId = updateCommentConfirmButton.getAttribute('user-id');
            let body = this.requestBodyMaker.makeRequestBodyToUpdateComment(modifiedCommentContent, userId);
            await this.commentRESTAPICaller.updateComment(this.articleId, commentID, body);
            this.elementModifier.setElementText(this.commentContent, modifiedCommentContent);
            this.elementModifier.hideElement(this.editCommentView);
            this.elementModifier.displayElement(this.commentContent);
        });
    }

    clickOnUpdateCancelationButton(){
     let updateCommentCancelButton = this.elementProvider.getSubComponent(this.commentElement, "#cancel-update-comment");
        updateCommentCancelButton.addEventListener("click",  () => {
            this.elementModifier.hideElement(this.editCommentView);
            this.elementModifier.displayElement(this.commentContent);
        });
    }

}

class DeleteCommentEventListener {

    constructor() {
        this.commentRESTAPICaller = new CommentRESTAPICaller();
        this.storedDataProvider = new StoredDataProvider();
        this.elementProvider = new ElementProvider();
        this.elementModifier = new ElementModifier();
        this.modalSetter = new ModalSetter();
        this.modalData = new ModalData();
    }

    clickOnButton(button, commentID) {
        this.button = button;
        this.commentID = commentID;
        this.findNeededElementsForDeletion();
        this.storedDataProvider.setItemToSessionStorage("modal", this.modalData.getData("deleteComment"));
        this.modalSetter.setModalData();
        this.modalSetter.setClickOnConfirmButtonEvent(this, (() => this.clickOnDeleteCommentConfirmButton)());
    }

    clickOnDeleteCommentConfirmButton() {
        let commentsElement = this.elementProvider.getElementById("comments");
        let lastComment = commentsElement.children.length == 1;
        let commentElement = this.elementProvider.getAncestor(this.button, '.comment-container');
        this.commentRESTAPICaller.deleteComment(this.articleId, this.commentID);
        this.elementModifier.removeElement(commentElement);
        if(lastComment){
            this.elementModifier.displayElement(this.noCommentElement);
        }
    }

    findNeededElementsForDeletion(){
        this.articleId = this.storedDataProvider.getItemFromSessionStorage('articleId');
        this.noCommentElement = this.elementProvider.getElementById("no-comment");
        this.commentsElement = this.elementProvider.getElementById("comments");
        this.lastComment = this.commentsElement.childElementCount == 1 ;
    }

}

class CommentEventListenerRegister {

    constructor() {
        this.updateCommentEventListener = new UpdateCommentEventListener();
        this.deleteCommentEventListener = new DeleteCommentEventListener();
    }

    registerUpdateButton(button) {
        let commentID = parseInt(button.getAttribute("comment-id"));
        button.addEventListener("click",  () => this.updateCommentEventListener.clickOnButton(button, commentID));
    }

    registerDeleteButton(button) {
        let commentID = parseInt(button.getAttribute("comment-id"));
        button.addEventListener("click", () => this.deleteCommentEventListener.clickOnButton(button, commentID));
    }

}