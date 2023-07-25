class ArticleSearcher {

    searchBar;
    articleSection;
    timer;
    waitTimeInMilliseconds;
    currentSearchResult;
    previousSearchResult;
    articlePreviewDisplayer;

    constructor(){
        this.searchBar = document.getElementById('input-search');
        this.articleSection = document.getElementById('article-row');
        this.waitTimeInMilliseconds = 800;
        this.articlePreviewDisplayer = new ArticlePreviewDisplayer();
        this.removeBuiltInEnterEventListenerFromSearchBar();
    }

    removeBuiltInEnterEventListenerFromSearchBar(){
        this.searchBar.addEventListener('keypress', (event) => {
            if (event.which == 13) {
               event.preventDefault();
            }
        })
    }

    async search() {
        this.currentSearchResult = await this.articlePreviewDisplayer.getArticles({filterByTitle:this.currentSearchText, orderField:"LAST_MODIFICATION_DATE"});
        if(!this.isPreviousSearchedResultIsTheSameAsTheCurrent()){
            this.articleSection.innerHTML = '';
            this.thereIsNoMatchingArticle() ? this.handleThereIsNoMatchingArticle() : this.handleThereIsMatchingArticle(this.currentSearchResult);
        }
        this.previousSearchResult = this.currentSearchResult;
    }

    isPreviousSearchedResultIsTheSameAsTheCurrent(){
        return this.previousSearchResult === this.currentSearchResult;
    }

    thereIsNoMatchingArticle(){
        return this.currentSearchResult.length === 0;
    }

    handleThereIsNoMatchingArticle(){
        this.displayNoMatchingArticleText();
        this.styleArticleSectionIfThereIsNoMatchingArticle();
    }

    handleThereIsMatchingArticle(){
        this.styleArticleSectionIfThereIsMatchingArticle();
        this.displayMatchedArticle();
    }

    displayNoMatchingArticleText(){
        this.articleSection.innerHTML = "Nincs a keresésnek megfelelő cikk!";
    }

    styleArticleSectionIfThereIsNoMatchingArticle(){
        this.articleSection.classList.add("justify-content-center", "fs-5", "fw-medium", "py-5");
        this.articleSection.classList.remove("justify-content-between");
    }

    styleArticleSectionIfThereIsMatchingArticle(){
        this.articleSection.classList.remove("justify-content-center", "fs-5", "fw-medium", "py-5");
        this.articleSection.classList.add("justify-content-between");
    }

    displayMatchedArticle(){
        for(let i=0; i<this.currentSearchResult.length; i++){
            this.articlePreviewDisplayer.articlePreviewBuilder.build(this.currentSearchResult[i]);
        }
    }

    getCurrentSearchText(event){
        return event.currentTarget.value.trim();
    }

}