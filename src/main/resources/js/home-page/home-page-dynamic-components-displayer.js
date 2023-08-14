class HomePageDynamicComponentsDisplayer {

    constructor() {}

    display(){
        this.displayLatestArticlePreview();
        this.displayCategoriesInFilterBody();
    }

    async displayLatestArticlePreview(){
        let articlePreviewDisplayer = new ArticlePreviewDisplayer();
        articlePreviewDisplayer.displayLatestArticles();
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