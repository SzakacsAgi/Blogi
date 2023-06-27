class SessionSynchronizer {

    storedDataProvider = new StoredDataProvider();

    constructor() { }

    sync() {
        this.copyStoredDataToSessionStorage();
        let articleId;
        articleId = this.storedDataProvider.getItemFromSessionStorage("articleId");
        document.getElementById('article-id').innerHTML = articleId;
    }

    copyStoredDataToSessionStorage() {
        Object.entries(localStorage).forEach(([key, value]) => {
            sessionStorage.setItem(key, value);
        })
        this.storedDataProvider.clearLocalStorage();
    }

}
