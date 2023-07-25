class ArticleSearcher {

    searchBar;
    articleSection;
    timer;
    waitTimeInMilliseconds;
    currentSearchResult;
    previousSearchResult;
    articlePreviewDisplayer;
    elementModifier = new ElementModifier();

    constructor(){
        this.searchBar = document.getElementById('input-search');
        this.articleSection = document.getElementById('article-row');
        this.waitTimeInMilliseconds = 800;
        this.articlePreviewDisplayer = new ArticlePreviewDisplayer();
    }

    async search() {
        this.currentSearchResult = await this.articlePreviewDisplayer.getArticles({filterByTitle:this.currentSearchText, orderField:"LAST_MODIFICATION_DATE"});
        if(!this.isEqual(this.previousSearchResult, this.currentSearchResult)){
            this.deleteArticleSection();
            this.thereIsNoMatchingArticle() ? this.handleThereIsNoMatchingArticle() : this.handleThereIsMatchingArticle(this.currentSearchResult);
        }
        this.previousSearchResult = this.currentSearchResult;
    }

    isEqual(first, second){
        return first === second;
    }

    thereIsNoMatchingArticle(){
        return this.currentSearchResult.length === 0;
    }

    handleThereIsNoMatchingArticle(){
        this.displayNoMatchingArticleText();
        this.changeArticleSectionAppearance();
    }

    handleThereIsMatchingArticle(){
        this.removeChangesFromArticleSectionAppearance();
        this.displayMatchedArticle();
    }

    displayNoMatchingArticleText(){
        this.articleSection.innerHTML = "Nincs a keresésnek megfelelő cikk!";
    }

    changeArticleSectionAppearance(){
        this.elementModifier.addElementClass(this.articleSection, ["justify-content-center", "fs-5", "fw-medium", "py-5"]);
        this.elementModifier.removeElementClass(this.articleSection, ["justify-content-between"]);
    }

    removeChangesFromArticleSectionAppearance(){
        this.elementModifier.removeElementClass(this.articleSection, ["justify-content-center", "fs-5", "fw-medium", "py-5"]);
        this.elementModifier.addElementClass(this.articleSection, ["justify-content-between"]);
    }

    displayMatchedArticle(){
        for(let i=0; i<this.currentSearchResult.length; i++){
            this.articlePreviewDisplayer.articlePreviewBuilder.build(this.currentSearchResult[i]);
        }
    }

    getCurrentSearchText(event){
        return event.currentTarget.value.trim();
    }

    deleteArticleSection(){
        this.articleSection.innerHTML = '';
    }

}