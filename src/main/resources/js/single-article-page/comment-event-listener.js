class UpdateCommentEventListener {

    constructor() {
        this.commentRESTAPICaller = new CommentRESTAPICaller();
        this.storedDataProvider = new StoredDataProvider();
        this.elementProvider = new ElementProvider();
        this.elementModifier = new ElementModifier();
        this.requestBodyMaker = new RequestBodyMaker();
    }

    clickOnButton(updateButton, commentID) {

    this.commentElement = this.elementProvider.getAncestor(updateButton, '.comment-container');
                        this.editCommentView =  this.elementProvider.getSubComponent(this.commentElement, '.edit-comment-view');
                        this.commentContent = this.elementProvider.getSubComponent(this.commentElement, '.comment-content');
        console.log(this.commentElement)
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

    findNeededElements(){

        this.articleId = this.storedDataProvider.getItemFromSessionStorage('articleId');
    }

}

class DeleteCommentEventListener {

    constructor() {
        this.commentRESTAPICaller = new CommentRESTAPICaller();
        this.storedDataProvider = new StoredDataProvider();
        this.modalSetter = new ModalSetter();
        this.modalData = new ModalData();
        this.elementProvider = new ElementProvider();
        this.elementModifier = new ElementModifier();
    }

    clickOnButton(button, commentID) {
        this.storedDataProvider.setItemToSessionStorage("modal", this.modalData.getData("deleteComment"));
        this.modalSetter.setModalData();
        this.storedDataProvider.setItemToSessionStorage("commentId", commentID);
        this.clickOnDeleteCommentConfirmButton(button, commentID);
    }

    clickOnDeleteCommentConfirmButton(button, commentID) {
    let deleteCommentConfirmButton = this.elementProvider.getElementById("modal-confirm");
        deleteCommentConfirmButton.addEventListener("click",  () => {
            let commentsElement = this.elementProvider.getElementById("comments");
            let  lastComment = commentsElement.childElementCount == 2 ;
            let commentElement = this.elementProvider.getAncestor(button, '.comment-container');

            this.commentRESTAPICaller.deleteComment(this.articleId, commentID);
            this.elementModifier.removeElement(commentElement);
            if(lastComment){
                this.elementModifier.displayElement(this.noCommentElement);
            }

        });
    }

    findNeededElements(){

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
        this.updateCommentEventListener.findNeededElements();

        button.addEventListener("click", () => this.updateCommentEventListener.clickOnButton(button, commentID));
    }

    registerDeleteButton(button) {
        console.log(button)
        let commentID = parseInt(button.getAttribute("comment-id"));
        this.deleteCommentEventListener.findNeededElements();

        button.addEventListener("click", () => this.deleteCommentEventListener.clickOnButton(button, commentID));
    }

}