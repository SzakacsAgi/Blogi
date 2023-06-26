class ArticlePreviewDisplayer {

    constructor() { }

    async getAllArticles() {
        let caller = new ArticleRESTAPICaller();
        let response = await caller.sendGETAllRequest({});
        return response.payload;
    }

    async display() {
        let articlePreviewBuilder = new ArticlePreviewBuilder();
        let allArticles = await this.getAllArticles();
        allArticles.forEach(article => {
            articlePreviewBuilder.build(article);
        })
    }

}