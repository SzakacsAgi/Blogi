class ButtonEventListenerProvider {

    storedDataProvider = new StoredDataProvider();

    constructor() { }

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
        let caller = new ArticleRESTAPICaller();
        let articleToDelete = this.storedDataProvider.getItemFromLocalStorage("articleId");
        let displayer = new ArticlePreviewDisplayer();
        caller.sendDELETESingleRequest(articleToDelete);
        setTimeout(function () {
            document.getElementById('article-row').innerHTML = '';
            displayer.displayAllArticles();
        }, 500);

    }
}