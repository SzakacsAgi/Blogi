class HomePageDynamicComponentsDisplayer {

    constructor() {}

    async display(){
        await this.displayLatestArticlePreview();
        await this.displayCategoriesInFilterBody();
    }

    async displayLatestArticlePreview(){
        let articlePreviewDisplayer = new ArticlePreviewDisplayer();
        await articlePreviewDisplayer.displayLatestArticles();
    }

    async displayCategoriesInFilterBody(){
        let filterBuilder = new FilterBuilder();
        let parentId;
        let categories = ["főétel", "előétel", "rakott", "vegeteriános", "desszert", "barack"]; //mock categories
        for (const categoryIndex in categories) {
            parentId = categoryIndex%3;
            filterBuilder.build(categories[categoryIndex], parentId);
        }
    }
}