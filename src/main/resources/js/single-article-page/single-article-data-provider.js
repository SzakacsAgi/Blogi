class SingleArticleDataProvider {

      constructor() {
        this.caller = new ArticleRESTAPICaller();
      }

      async createArticle(articleId) {
        const articleData = await this.fetchArticleData(articleId);
        return new SingleArticle(articleId, articleData);
      }

      async fetchArticleData(articleId) {
        const response = await this.caller.sendGETSingleRequest(articleId);
        return response.payload;
      }

}