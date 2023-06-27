class HomePageDynamicComponentsDisplayer {

    constructor() {}

    display(){
        this.displayArticlePreview();
        this.displayCategoriesInFilterBody();
    }

    async displayArticlePreview(){
        let articlePreviewDisplayer = new ArticlePreviewDisplayer();
        articlePreviewDisplayer.displayAllArticles();
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

let displayHomePageDynamicComponents = new HomePageDynamicComponentsDisplayer();
displayHomePageDynamicComponents.display();