class HomePageEventListeners {

    constructor() {
        this.buttonEventListenerProvider = new ButtonEventListenerProvider();
        this.storedDataProvider = new StoredDataProvider();
        this.modalSetter = new ModalSetter();
        this.modalData = new ModalData();
    }

    registerEventListeners(){
        this.addFilterSearchListener();
        this.addResetFilterSearchListener();
        this.copyArticleId();
        this.addSearchBarListener();
    }

    addFilterSearchListener() {
        let filterSearchButton = document.getElementById("filter-search");
        filterSearchButton.addEventListener("click", this.buttonEventListenerProvider.clickOnFilterSearchButton);
    }

    addResetFilterSearchListener() {
        let resetFilterSearchButton = document.getElementById("delete-filters");
        resetFilterSearchButton.addEventListener("click", this.buttonEventListenerProvider.clickOnResetFilterButton);
    }

    addDeleteButtonListener(button, id) {
        button.addEventListener("click", async () => {
            this.storedDataProvider.setItemToSessionStorage("articleId", id);
            this.storedDataProvider.setItemToSessionStorage("modal", this.modalData.getData("deleteArticle"));
            this.modalSetter.setModalData();
            this.addDeleteArticleConfirmButtonListener();
        })
    }

    addDeleteArticleConfirmButtonListener() {
        let deleteArticleConfirmButton = document.getElementById("modal-confirm");
        deleteArticleConfirmButton.addEventListener("click", this.buttonEventListenerProvider.clickOnDeleteArticleConfirmButton);
    }

    copyArticleId() {
        let readMoreButtons = document.querySelectorAll('.read-more-button')
        readMoreButtons.forEach(button => {
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