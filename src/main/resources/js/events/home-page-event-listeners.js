class HomePageEventListeners {

    constructor() {
        this.buttonEventListenerProvider = new ButtonEventListenerProvider();
        this.storedDataProvider = new StoredDataProvider();
        this.modalSetter = new ModalSetter();
        this.modalData = new ModalData();
        this.modalLoader = new ModalLoader();
    }

    registerEventListeners(){
        this.addFilterSearchListener();
        this.addResetFilterSearchListener();
        this.copyArticleIdForSingleArticlePage();
        this.copyArticleIdForEditArticlePage();
        this.addSearchBarListener();
        this.addDeleteButtonListener();
    }

    addFilterSearchListener() {
        let filterSearchButton = document.getElementById("filter-search");
        filterSearchButton.addEventListener("click", this.buttonEventListenerProvider.clickOnFilterSearchButton);
    }

    addResetFilterSearchListener() {
        let resetFilterSearchButton = document.getElementById("delete-filters");
        resetFilterSearchButton.addEventListener("click", this.buttonEventListenerProvider.clickOnResetFilterButton);
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

    addSearchBarListener(){
        let articleSearcher = new ArticleSearcher();
        let searchBar = articleSearcher.searchBar;

        searchBar.addEventListener('keyup', (event) => {
            articleSearcher.currentSearchText = articleSearcher.getCurrentSearchText(event);
            setTimeout(() => {
                articleSearcher.search(articleSearcher.currentSearchText);
            }, articleSearcher.waitTimeInMilliseconds);
        });
    }

}