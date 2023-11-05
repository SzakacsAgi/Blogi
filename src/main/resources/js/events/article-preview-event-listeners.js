class ArticlePreviewEventListeners {

    constructor() {
        this.buttonEventListenerProvider = new ButtonEventListenerProvider();
        this.storedDataProvider = new StoredDataProvider();
        this.modalSetter = new ModalSetter();
        this.modalData = new ModalData();
        this.userPermissionVerifier = new UserPermissionVerifier();
        this.adminUserViewDisplayer = new AdminUserViewDisplayer();
    }

    registerEventListeners(){
        this.copyArticleIdForSingleArticlePage();
        if(this.userPermissionVerifier.hasAdminRole()) {
            this.adminUserViewDisplayer.displayArticleModifierButtons();
            this.addDeleteButtonListener();
            this.copyArticleIdForEditArticlePage();
        }
    }

    addDeleteButtonListener() {
        let articleDeleteButtons = document.querySelectorAll('.delete-button');
        articleDeleteButtons.forEach(deleteButton =>{
            deleteButton.addEventListener("click", () => {
                let articleId = deleteButton.getAttribute("article-id");
                this.storedDataProvider.setItemToSessionStorage("articleId", articleId);
                this.storedDataProvider.setItemToSessionStorage("modal", this.modalData.getData("deleteArticle"));
                this.modalSetter.setModalData();
                this.modalSetter.setClickOnConfirmButtonEvent(this.buttonEventListenerProvider, (() => this.buttonEventListenerProvider.clickOnDeleteArticleConfirmButton)());

            })
        })
    }

    addDeleteArticleConfirmButtonListener() {
        let deleteArticleConfirmButton = document.getElementById("modal-confirm");
        deleteArticleConfirmButton.addEventListener("click", this.buttonEventListenerProvider.clickOnDeleteArticleConfirmButton);
    }

    copyArticleIdForSingleArticlePage() {
        let readMoreButtons = document.querySelectorAll('.read-more-button')
        readMoreButtons.forEach(button => {
            button.addEventListener("click", () => {
                this.storedDataProvider.setItemToLocalStorage("articleId", button.getAttribute('article-id'));
            })
        })
    }

    copyArticleIdForEditArticlePage() {
        let editButtons = document.querySelectorAll('.edit-button')
        editButtons.forEach(button => {
            button.addEventListener("click", () => {
                this.storedDataProvider.setItemToLocalStorage("articleId", button.getAttribute('article-id'));
            })
        })
    }

}