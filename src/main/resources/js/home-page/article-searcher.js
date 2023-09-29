class ArticleSearcher {

    searchBar;
    articleSection;
    timer;
    waitTimeInMilliseconds;
    currentSearchResult;
    previousSearchResult;
    articlePreviewDisplayer;
    elementModifier = new ElementModifier();
    componentAdder;
    elementProvider;
    articleParent;

    constructor(){
        this.searchBar = document.getElementById('input-search');
        this.articleSection = document.getElementById('article-row');
        this.waitTimeInMilliseconds = 800;
        this.articlePreviewDisplayer = new ArticlePreviewDisplayer();
        this.componentAdder = new ComponentAdder();
        this.elementProvider = new ElementProvider();
        let articlePart = this.elementProvider.getComponent('article-part');
        this.articleParent = this.elementProvider.getSubComponent(articlePart, '#article-row');
    }

    async search() {
        this.currentSearchResult = await this.articlePreviewDisplayer.getArticles({filterByTitle:this.currentSearchText, orderField:"LAST_MODIFICATION_DATE"});
        if(!this.isEqual(this.previousSearchResult, this.currentSearchResult)){
            this.deleteArticleSection();
            this.thereIsNoMatchingArticle() ? this.handleThereIsNoMatchingArticle() : await this.handleThereIsMatchingArticle(this.currentSearchResult);
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

    async handleThereIsMatchingArticle(){
        this.removeChangesFromArticleSectionAppearance();
        await this.displayMatchedArticle();
    }

    displayNoMatchingArticleText(){
        this.articleSection.innerHTML = "Nincs a keresésnek megfelelő cikk!";
    }

    changeArticleSectionAppearance(){
        this.elementModifier.addElementClass(this.articleSection, ["justify-content-center", "fs-5", "fw-medium", "py-5"]);
        this.elementModifier.removeElementClass(this.articleSection, ["justify-content-between"]);
    }

    removeChangesFromArticleSectionAppearance(){
        this.elementModifier.removeElementClass(this.articleSection, ["fs-5", "fw-medium", "py-5"]);
    }

    async displayMatchedArticle(){
        for(let i=0; i<this.currentSearchResult.length; i++){
            let articlePreview = await this.articlePreviewDisplayer.articlePreviewBuilder.build(this.currentSearchResult[i]);
            this.componentAdder.add(this.articleParent, articlePreview);
        }
    }

    getCurrentSearchText(event){
        return event.currentTarget.value.trim();
    }

    deleteArticleSection(){
        this.articleSection.innerHTML = '';
    }

}