class SessionSynchronizer {

    storedDataProvider;

    constructor() {
         this.storedDataProvider = new StoredDataProvider();
     }

    sync() {
        this.copyArticleIdToSessionStorage();
    }

    copyArticleIdToSessionStorage() {
        let firstArticlePageLoad = this.storedDataProvider.getItemFromLocalStorage("articleId") !== null;

        if(firstArticlePageLoad){
            sessionStorage.setItem("articleId", this.storedDataProvider.getItemFromLocalStorage("articleId"));
            this.storedDataProvider.clearSpecificItemFromLocalStorage("articleId");
        }
    }

}
