class SingleArticlePageEventListeners{

    constructor(){
        this.elementProvider = new ElementProvider();
        this.elementModifier = new ElementModifier();
        this.requestBodyMaker = new RequestBodyMaker();
        this.commentRESTAPICaller = new CommentRESTAPICaller();
        this.storedDataProvider = new StoredDataProvider();
        this.commentBuilder = new CommentBuilder();
        this.authenticationRESTAPICaller = new AuthenticationRESTAPICaller();
        this.componentAdder = new ComponentAdder();
        this.findNeededElements();
    }

    registerEvents(){
        this.addWriteCommentSubmitButtonListener();
        this.addCommentInputContentChangeListener();
    }

    registerEventForSignInHrefButton() {
        this.addRedirectLogicForSignInHrefButtonListener();
    }

    async addWriteCommentSubmitButtonListener(){
        this.writeCommentSubmitButton.addEventListener('click', async () =>{
            let commentContent = this.inputField.value;
            let requestBody = this.requestBodyMaker.makeRequestBodyToCreateComment(commentContent, AuthenticatedUserInfo.id);
            let createdComment = await this.commentRESTAPICaller.createComment(this.articleId, requestBody);
            let authenticatedUser = await this.getAuthenticatedUser();
            let commentElement = await this.commentBuilder.build(createdComment, authenticatedUser);
            this.elementModifier.displayElement(this.elementProvider.getSubComponent(commentElement, "#edit-comment"));
            this.componentAdder.addAfterOtherComponent(commentElement, this.firstComment);
            this.elementModifier.clearInputField(this.inputField);
            this.elementModifier.hideElement(this.noCommentElement);
        });
    }

    async getAuthenticatedUser(){
        return await this.authenticationRESTAPICaller.getAuthenticatedUser();
    }

    addCommentInputContentChangeListener() {
        this.inputField.addEventListener('keyup', () => {
            let inputContent = this.inputField.value.trim();
            if (inputContent === "") {
                this.writeCommentSubmitButton.setAttribute("disabled", "disabled");
            } else {
                this.writeCommentSubmitButton.removeAttribute("disabled");
            }
        });
    }

    addRedirectLogicForSignInHrefButtonListener() {
        let signInHrefButton = document.getElementById("sign-in-href-button");
        signInHrefButton.addEventListener("click", () => {
            let locationPathname = window.location.pathname;
            let pageToRedirect = this.getPageToRedirect(locationPathname);
            this.storedDataProvider.setItemToLocalStorage("pageToRedirect", pageToRedirect);
        })
    }

    getPageToRedirect(locationPathname){
        return locationPathname.substr(locationPathname.lastIndexOf("/")+1);
    }

    findNeededElements(){
        this.writeCommentSubmitButton = this.elementProvider.getElementById('submit-write-comment');
        this.articleId = this.storedDataProvider.getItemFromSessionStorage('articleId');
        this.inputField = this.elementProvider.getElementById("write-comment-input");
        this.firstComment = this.elementProvider.getSubComponent(document, "#comments div");
        this.noCommentElement = this.elementProvider.getElementById("no-comment");
    }

}