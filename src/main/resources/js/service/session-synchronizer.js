class SessionSynchronizer {

    storedDataProvider = new StoredDataProvider();

    constructor() { }

    sync() {
        this.copyStoredDataToSessionStorage();
    }

    copyStoredDataToSessionStorage() {
        Object.entries(localStorage).forEach(([key, value]) => {
            sessionStorage.setItem(key, value);
        })
        this.storedDataProvider.clearSpecificItemFromLocalStorage("articleId");
    }

}
