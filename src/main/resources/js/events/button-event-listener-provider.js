class ButtonEventListenerProvider {

    constructor() {
        this.urlProvider = new URLProvider();
        this.storedDataProvider = new StoredDataProvider();
        this.elementProvider = new ElementProvider();
        this.elementModifier = new ElementModifier();
        this.articleRESTAPICaller = new ArticleRESTAPICaller();
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
        let articleToDelete = this.storedDataProvider.getItemFromSessionStorage("articleId");
        let header = {
            "Authorization":this.storedDataProvider.getItemFromLocalStorage("userToken")
        }
        this.articleRESTAPICaller.deleteArticle(articleToDelete, header);
        let button = document.querySelector(`.delete-button[article-id="${articleToDelete}"]`);
        if(button !== null){
            let articleElement = this.elementProvider.getAncestor(button, '.article');
            this.elementModifier.removeElement(articleElement);
        }

        let articlesContainer = this.elementProvider.getElementById("article-row");
        if(articlesContainer.children.length === 0){
            this.elementModifier.setElementText(articlesContainer, "Nincsenek cikkek!");
        }
    }
}