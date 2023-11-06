class ArticleSearcher {

    constructor(){
        this.searchBar = document.getElementById('input-search');
        this.elementModifier = new ElementModifier();
        this.articleSection = document.getElementById('article-row');
        this.waitTimeInMilliseconds = 800;
        this.articlePreviewDisplayer = new ArticlePreviewDisplayer();
        this.componentAdder = new ComponentAdder();
        this.elementProvider = new ElementProvider();
        let articlePart = this.elementProvider.getComponent('article-part');
        this.articleParent = this.elementProvider.getSubComponent(articlePart, '#article-row');
        this.previousSearchResult = [null];
    }

    async search() {
        this.currentSearchResult = await this.articlePreviewDisplayer.getArticles({filterByTitle:this.currentSearchText, orderField:"LAST_MODIFICATION_DATE"});
        if(!this.isEqual(this.previousSearchResult, this.currentSearchResult)){
            this.deleteArticleSection();
            this.thereIsNoMatchingArticle() ? this.handleThereIsNoMatchingArticle() : await this.handleThereIsMatchingArticle();
        }
        this.previousSearchResult = this.currentSearchResult;
    }

    isEqual(first, second){
        if(first.length !== second.length){
            return false;
        }
        else if(first[0] !== null){
            first.every((article, index) => article.id === second[index].id);
        }
        else return false;
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
        await this.articlePreviewDisplayer.displaySearchedArticle(this.currentSearchResult);
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

    getCurrentSearchText(event){
        return event.currentTarget.value.trim();
    }

    deleteArticleSection(){
        this.articleSection.innerHTML = '';
    }

}