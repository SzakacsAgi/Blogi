class HomePageDynamicComponentsDisplayer {

    articleRESTAPICaller = new ArticleRESTAPICaller();

    constructor() {}

    async display(){
        await this.displayLatestArticlePreview();
        await this.displayCategoriesInFilterBody();
    }

    async displayLatestArticlePreview(){
        let articlePreviewDisplayer = new ArticlePreviewDisplayer();
        await articlePreviewDisplayer.displayLatestArticles();
    }

    async displayCategoriesInFilterBody() {
        let categories = await this.articleRESTAPICaller.getAllCategories();
        let filterBuilder = new FilterBuilder();

        for (const categoryIndex in categories) {
            let parentId = categoryIndex%3;
            filterBuilder.build(categories[categoryIndex], parentId);
        }
    }
}