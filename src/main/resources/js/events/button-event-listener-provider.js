class ButtonEventListenerProvider {

    storedDataProvider = new StoredDataProvider();
    caller = new ArticleRESTAPICaller();
    wait = new Wait();
    
    constructor() { }
    
    clickOnFilterSearchButton() {
        let displayer = new ArticlePreviewDisplayer();
        document.getElementById('article-row').innerHTML = '';
        displayer.displayFilteredArticles();
    }
    
    clickOnResetFilterButton() {
        let filterMethods = new FilterMethods();
        filterMethods.resetFilters();
    }

    clickOnDeleteArticleConfirmButton() {
        let articleId = this.storedDataProvider.getItemFromSessionStorage("articleId");
        let displayer = new ArticlePreviewDisplayer();
        this.caller.sendDELETESingleRequest(articleId);
        this.wait.forServerResponse(() => {
            document.getElementById('article-row').innerHTML = '';
            displayer.displayAllArticles();
        });
    }
}