class ArticlePreviewDisplayer {

    urlProvider;
    queryParams;
    articlePreviewBuilder;
    caller;
    latestArticlesNumber;
    componentAdder;
    elementProvider;
    articleParent;

    constructor() {
        this.urlProvider = new URLProvider();
        this.queryParams = new FilterMethods().getFilterQueryParams();
        this.articlePreviewBuilder = new ArticlePreviewBuilder();
        this.caller = new ArticleRESTAPICaller();
        this.latestArticlesNumber = 6;
        this.componentAdder = new ComponentAdder();
        this.elementProvider = new ElementProvider();
        let articlePart = this.elementProvider.getComponent('article-part');
        this.articleParent = this.elementProvider.getSubComponent(articlePart, '#article-row');
        this.homePageEventListeners = new HomePageEventListeners();
        this.userPermissionVerifier = new UserPermissionVerifier();
        this.adminUserViewDisplayer = new AdminUserViewDisplayer();
    }

    async getArticles(queryParams = {}) {
        return await this.caller.getAllArticles(queryParams);
    }

    async displayAllArticles() {
        let allArticles = await this.getArticles();
        for(let article of allArticles){
            let articlePreview = await this.articlePreviewBuilder.build(article);
            this.componentAdder.add(this.articleParent, articlePreview);
            this.addEventListeners();
        }
    }

    async displayLatestArticles() {
        let allArticles = await this.getArticles();
        if(allArticles.length > 0){
            if(allArticles.length > this.latestArticlesNumber){
                for(let i=0; i<this.latestArticlesNumber; i++){
                    let articlePreview = await this.articlePreviewBuilder.build(allArticles[i]);
                    this.componentAdder.add(this.articleParent, articlePreview);
                    this.addEventListeners();
                }
            }
            else{
                await this.displayAllArticles();
            }
        }
        else{
            let articlesContainer = this.elementProvider.getElementById("article-row");
            articlesContainer.innerHTML = "Nincsenek cikkek!";
        }
    }

    async displayFilteredArticles() {
        let filteredArticles = await this.getArticles(this.queryParams);
        for(let article of filteredArticles){
            let articlePreview = await this.articlePreviewBuilder.build(article);
            this.componentAdder.add(this.articleParent, articlePreview);
            this.addEventListeners();
        }
    }

    async displaySearchedArticle(searchResults){
        for(let i=0; i<searchResults.length; i++){
            let articlePreview = await this.articlePreviewBuilder.build(searchResults[i]);
            this.componentAdder.add(this.articleParent, articlePreview);
            this.addEventListeners();
        }
    }

    addEventListeners(){
        this.homePageEventListeners.copyArticleIdForSingleArticlePage();
        if (this.userPermissionVerifier.hasAdminRole()) {
            this.adminUserViewDisplayer.displayArticleModifierButtons();
            this.homePageEventListeners.addDeleteButtonListener();
        }
    }

}