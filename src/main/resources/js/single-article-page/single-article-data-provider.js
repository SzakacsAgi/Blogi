class SingleArticleDataProvider {

     urlProvider;
     caller;

      constructor() {
        this.urlProvider = new URLProvider();
        this.caller = new ArticleRESTAPICaller(this.urlProvider.getBaseArticleURL());
      }

      async getArticleInfo(articleId) {
        const articleData = await this.fetchArticleData(articleId);
        return new ArticleInfo(articleData);
      }

      async fetchArticleData(articleId) {
        return await this.caller.getASingleArticle(articleId);
      }

}