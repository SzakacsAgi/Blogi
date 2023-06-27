class ArticlePreviewDisplayer {

    queryParams = new FilterMethods().getFilterQueryParams();
    articlePreviewBuilder = new ArticlePreviewBuilder();
    caller = new ArticleRESTAPICaller();

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

    async displayFilteredArticles() {
        let filteredArticles = await this.getArticles(this.queryParams);
        filteredArticles.forEach(article => {
            this.articlePreviewBuilder.build(article);
        })
    }

}