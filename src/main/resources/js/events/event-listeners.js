class EventListeners {

    buttonEventListenerProvider = new ButtonEventListenerProvider();
    storedDataProvider = new StoredDataProvider();

    constructor() {}

    registerEventListeners(){
        this.addFilterSearchListener();
        this.addResetFilterSearchListener();
        this.addDeleteArticleConfirmButtonListener();
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
            button.addEventListener("click", () => {
                this.storedDataProvider.setItemToLocalStorage("articleId", id);
        })
    }

    addDeleteArticleConfirmButtonListener() {
        let deleteArticleConfirmButton = document.getElementById("delete-article");
        deleteArticleConfirmButton.addEventListener("click", this.buttonEventListenerProvider.clickOnDeleteArticleConfirmButton);
    }

    copyArticleId(button, id) {
        button.addEventListener("click", () => {
            this.storedDataProvider.setItemToLocalStorage("articleId", id);
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

let eventListeners = new EventListeners();

window.onload = function afterWebPageLoad() {
    setTimeout(function(){
        eventListeners.registerEventListeners();
    }, 1000);
}