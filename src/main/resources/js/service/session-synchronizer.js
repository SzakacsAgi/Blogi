class SessionSynchronizer {

    storedDataProvider;

    constructor() {
         this.storedDataProvider = new StoredDataProvider();
     }

    sync() {
        this.moveArticleIdToSessionStorage();
    }

    moveArticleIdToSessionStorage() {
        let firstArticlePageLoad = this.storedDataProvider.getItemFromLocalStorage("articleId") !== null;

        if(firstArticlePageLoad){
            sessionStorage.setItem("articleId", this.storedDataProvider.getItemFromLocalStorage("articleId"));
            this.storedDataProvider.clearSpecificItemFromLocalStorage("articleId");
        }
    }

}
