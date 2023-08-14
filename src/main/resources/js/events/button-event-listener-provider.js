class ButtonEventListenerProvider {

    storedDataProvider;
    urlProvider;

    constructor() {
        this.storedDataProvider = new StoredDataProvider();
        this.urlProvider = new URLProvider();
    }

    clickOnFilterSearchButton() {
        document.getElementById('article-row').innerHTML = '';
        let displayer = new ArticlePreviewDisplayer();
        displayer.displayFilteredArticles();
    }

    clickOnResetFilterButton() {
        let filterMethods = new FilterMethods();
        filterMethods.resetFilters();
    }

    clickOnDeleteArticleConfirmButton() {
        console.log("clicked")
        let caller = new ArticleRESTAPICaller(this.urlProvider.getBaseArticleURL());
        let articleToDelete = this.storedDataProvider.getItemFromLocalStorage("articleId");
        let displayer = new ArticlePreviewDisplayer();
        caller.sendDELETESingleRequest(articleToDelete);
        setTimeout(function () {
            document.getElementById('article-row').innerHTML = '';
            displayer.displayAllArticles();
        }, 500);

    }
}