class ArticlePreviewDisplayer {

    queryParams = new FilterMethods().getFilterQueryParams();
    articlePreviewBuilder = new ArticlePreviewBuilder();
    caller = new ArticleRESTAPICaller();
    latestArticlesNumber = 6;

    constructor() { }

    async getArticles(queryParams = {}) {
        let response = await this.caller.sendGETAllRequest(queryParams);
        return response.payload;
    }

    async displayAllArticles() {
        let allArticles = await this.getArticles();
        allArticles.forEach(article => {
            this.articlePreviewBuilder.build(article);
        })
    }

    async displayLatestArticles() {
        let allArticles = await this.getArticles();
        if(allArticles.length > this.latestArticlesNumber){
            for(let i=0; i<this.latestArticlesNumber; i++){
                this.articlePreviewBuilder.build(allArticles[i]);
            }
        }
        else{
            this.displayAllArticles();
        }
    }

    async displayFilteredArticles() {
        let filteredArticles = await this.getArticles(this.queryParams);
        filteredArticles.forEach(article => {
            this.articlePreviewBuilder.build(article);
        })
    }

}