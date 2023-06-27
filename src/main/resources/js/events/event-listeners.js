class EventListeners {

    buttonEventListenerProvider = new ButtonEventListenerProvider();
    storedDataProvider = new StoredDataProvider();

    constructor() { }

    registerEventListeners() {
        this.addFilterSearchListener();
        this.addResetFilterSearchListener();
        this.addDeleteArticleConfirmButtonListener();
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
            this.storedDataProvider.setItemToSessionStorage("articleId", id);
        })
    }

    addDeleteArticleConfirmButtonListener() {
        let deleteArticleConfirmButton = document.getElementById("delete-article");
        deleteArticleConfirmButton.addEventListener("click", () => this.buttonEventListenerProvider.clickOnDeleteArticleConfirmButton());
    }

    migrateArticleId(button, id) {
        button.addEventListener("click", () => {
            this.storedDataProvider.setItemToLocalStorage("articleId", id);
        })
    }

}

let eventListeners = new EventListeners();
let wait = new Wait();

window.onload = function afterWebPageLoad() {
    wait.forPageLoad(eventListeners.registerEventListeners());
}