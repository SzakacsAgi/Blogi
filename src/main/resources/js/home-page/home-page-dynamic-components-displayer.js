class HomePageDynamicComponentsDisplayer {
    constructor() {
        this.displayArticlePreview();
    }

    async displayArticlePreview(){
        let articlePreviewDisplayer = new ArticlePreviewDisplayer();
        articlePreviewDisplayer.display();
    }
}

let displayHomePageDynamicComponents = new HomePageDynamicComponentsDisplayer();