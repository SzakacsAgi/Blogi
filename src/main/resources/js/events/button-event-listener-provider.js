class ButtonEventListenerProvider {

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

        let urlProvider = new URLProvider();
        let storedDataProvider = new StoredDataProvider();

        console.log(urlProvider.getBaseArticleURL());
        let caller = new ArticleRESTAPICaller(urlProvider.getBaseArticleURL());
        let articleToDelete = storedDataProvider.getItemFromLocalStorage("articleId");
        let displayer = new ArticlePreviewDisplayer();
        caller.sendDELETESingleRequest(articleToDelete);
        setTimeout(function () {
            document.getElementById('article-row').innerHTML = '';
            displayer.displayAllArticles();
        }, 500);

    }
}