class SingleArticle {

      constructor(articleId, articleData) {
        this.articleId = articleId;
        this.articleData = articleData;
        this.articleInfo = new ArticleInfo(articleData);
      }

      getArticleId() {
        return this.articleId;
      }

      getArticleData() {
        return this.articleData;
      }

      getArticleInfo() {
        return this.articleInfo;
      }

}