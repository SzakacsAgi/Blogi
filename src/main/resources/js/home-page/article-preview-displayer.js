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
        this.caller = new ArticleRESTAPICaller(this.urlProvider.getBaseArticleURL());
        this.latestArticlesNumber = 6;
        this.componentAdder = new ComponentAdder();
        this.elementProvider = new ElementProvider();
        let articlePart = this.elementProvider.getComponent('article-part');
        this.articleParent = this.elementProvider.getSubComponent(articlePart, '#article-row');
    }

    async getArticles(queryParams = {}) {
        let response = await this.caller.sendGETAllRequest(queryParams);
        return response.payload;
    }

    async displayAllArticles() {
        let allArticles = await this.getArticles();
        for(let article of allArticles){
            let articlePreview = await this.articlePreviewBuilder.build(article);
            this.componentAdder.add(this.articleParent, articlePreview);
        }
    }

    async displayLatestArticles() {

        let allArticles = await this.getArticles();
        if(allArticles.length > 0){
            if(allArticles.length > this.latestArticlesNumber){
                for(let i=0; i<this.latestArticlesNumber; i++){
                    let articlePreview = await this.articlePreviewBuilder.build(allArticles[i]);
                    this.componentAdder.add(this.articleParent, articlePreview);
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
        }
    }

}