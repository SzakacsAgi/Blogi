class SingleArticleDataProvider {

    articleId;
    article;
    articleInfo;
    caller;
    storedDataProvider;

    constructor(){
        this.caller = new ArticleRESTAPICaller();
        this.storedDataProvider = new StoredDataProvider();
        this.setArticleId();
    }

    getArticleId(){
        return this.articleId;
    }

    setArticleId(){
        this.articleId = this.storedDataProvider.getItemFromSessionStorage("articleId");
    }

    getArticle(){
        return this.article;
    }

    async getArticleResponse(){
        let response = await this.caller.sendGETSingleRequest(this.articleId);
        return response.payload;
    }

    getArticleInfo(){
        return this.articleInfo;
    }

    async setArticleInfo(){
        this.article = await this.getArticleResponse();
        this.articleInfo = new ArticleInfo(this.article);
    }

}