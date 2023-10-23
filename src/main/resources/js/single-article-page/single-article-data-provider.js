class SingleArticleDataProvider {

     urlProvider;
     caller;

      constructor() {
        this.urlProvider = new URLProvider();
        this.caller = new ArticleRESTAPICaller(this.urlProvider.getBaseArticleURL());
      }

      async createArticle(articleId) {
        const articleData = await this.fetchArticleData(articleId);
        return new ArticleInfo(articleData);
      }

      async fetchArticleData(articleId) {
        const response = await this.caller.getASingleArticle(articleId);
        return response.payload;
      }

}