class ArticlePreviewBuilder {

    mainParent;
    articleInfo;
    elementModifier;
    elementCreator;
    buttonCreator;
    elementProvider;
    storedDataProvider;
    articlePart;

    articleId;
    articleElement;
    creationDate;
    viewersElement;
    authorElement;
    minutesToReadElement;
    titleElement;
    cardCategories;
    categoryDivContainer;
    articleEditButton;
    articleDeleteButton;

    constructor() {
        this.elementModifier = new ElementModifier();
        this.elementCreator = new ElementCreator();
        this.buttonCreator = new ButtonCreator();
        this.elementProvider = new ElementProvider();
        this.storedDataProvider = new StoredDataProvider();
        this.articlePart = this.elementProvider.getComponent('article-part');
        this.mainParent = this.elementProvider.getSubComponent(this.articlePart, "#article-row");
    }

    async build(article) {
        this.articleInfo = new ArticleInfo(article);
        this.articleId = this.articleInfo.getId();
        await this.getArticleElement();
        this.setElementsToModify();
        this.setArticlePreviewData();
        return this.articleElement;
    }

    async getArticleElement(){
        this.articleElement = await this.elementProvider.getElementFromHtmlFile('article.html');
    }

    setElementsToModify(){
        this.articleImage = this.elementProvider.getSubComponent(this.articleElement, "#image")
        this.creationDateElement = this.elementProvider.getSubComponent(this.articleElement, "#date");
        this.viewersElement = this.elementProvider.getSubComponent(this.articleElement, "#viewers");
        this.authorElement = this.elementProvider.getSubComponent(this.articleElement, "#author");
        this.minutesToReadElement = this.elementProvider.getSubComponent(this.articleElement, "#minutes-to-read");
        this.titleElement = this.elementProvider.getSubComponent(this.articleElement, "#title");
        this.cardCategories = this.elementProvider.getSubComponent(this.articleElement, "#card-categories");
        this.readMoreButtonElement = this.elementProvider.getSubComponent(this.articleElement, "#read-more-button");
        this.categoryDivContainer = this.elementProvider.getSubComponent(this.articleElement, "#card-categories");
        this.articleEditButton = this.elementProvider.getSubComponent(this.articleElement, ".edit-button");
        this.articleDeleteButton = this.elementProvider.getSubComponent(this.articleElement, ".delete-button");
    }

    setArticlePreviewData() {
        this.elementModifier.setElementAttributes(this.articleImage, {'src' : this.articleInfo.getImageURL()});
        this.elementModifier.setElementText(this.creationDateElement, this.articleInfo.getLastModificationDate())
        this.elementModifier.setElementText(this.viewersElement, this.articleInfo.getVisitorCount());
        this.elementModifier.setElementText(this.authorElement, this.articleInfo.getAuthorName());
        this.elementModifier.setElementText(this.minutesToReadElement, this.articleInfo.getMinutesToRead()+' perc');
        this.elementModifier.setElementText(this.titleElement, this.articleInfo.getTitle());
        this.elementModifier.setElementAttributes(this.readMoreButtonElement, {"article-id":this.articleId});
        this.elementModifier.setElementAttributes(this.articleEditButton, {"article-id":this.articleId});
        this.elementModifier.setElementAttributes(this.articleDeleteButton, {"article-id":this.articleId});
        this.addCategories();
    }

    addCategories() {
        let categories = this.articleInfo.getCategories();
        categories.forEach(categoryName => {
            this.category = this.createACategory(categoryName);
            this.categoryDivContainer.appendChild(this.category);
        })
    }

    createACategory(categoryName) {
        this.categoryDiv = this.elementCreator.createElement('div', ['col-auto']);
        this.hashTag = this.elementCreator.createElement('span');
        this.hashTag.innerHTML = '#';
        this.categoryDiv.appendChild(this.hashTag);
        this.categoryDiv.append(categoryName);
        return this.categoryDiv;
    }

}