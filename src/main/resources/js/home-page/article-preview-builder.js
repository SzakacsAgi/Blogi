class ArticlePreviewBuilder {

    mainParent = document.getElementById('article-row');
    cardBodysParent;
    editButtonsParent;
    elementCreator = new ElementCreator();
    buttonCreator = new ButtonCreator();
    articleInfo;
    articlePositionIndex;

    articleDiv;
    cardDiv;
    articleImage;

    bodyParent;
    articleInfosDiv;
    dateAndViewersCol;
    dateDivContainer;
    dateIcon;
    date;
    viewersDivContainer;
    viewersIcon;
    viewers;
    authorAndMinutesToReadCol;
    authorDivContainer;
    authorIcon;
    author;
    minutesToReadDivContainer;
    minutesToReadIcon;
    minutesToRead;

    articleTitle;
    readMoreButton;
    categoryDivContainer;
    category;
    categoryDiv;
    hashTag;

    editButtonsRow;
    editButtonsContainer;
    editButton;
    deleteButton;

    constructor() { }

    build(article) {
        this.articleInfo = new ArticleInfo(article);
        this.createArticlePreviewHeadComponents();
        this.addElementsToArticlePreviewHead();

        this.articlePositionIndex = document.getElementsByClassName('article').length - 1;
        this.editButtonsParent = document.getElementsByClassName('article')[this.articlePositionIndex];
        this.cardBodysParent = document.getElementsByClassName('card')[this.articlePositionIndex];

        this.createArticlePreviewBodyComponents();
        this.addElementsToArticlePreviewBody();
        this.setArticlePreviewData();
        this.createArticlePreviewEditButtonComponents();
        this.addElementsToArticlePreviewEditButtonPart();
    }

    createArticlePreviewHeadComponents() {
        this.articleDiv = this.elementCreator.createElement('div', ['col-auto', 'article']);
        this.cardDiv = this.elementCreator.createElement('div', ['card', 'mx-2']);
        this.articleImage = this.elementCreator.createElement('img', ['card-img-top']);
    }

    addElementsToArticlePreviewHead() {
        this.mainParent.appendChild(this.articleDiv);
        this.articleDiv.appendChild(this.cardDiv);
        this.cardDiv.appendChild(this.articleImage);
    }

    createArticlePreviewBodyComponents() {
        this.createArticlePreviewInfosComponents();
        this.articleTitle = this.elementCreator.createElement('h5', ['card-title']);
        this.readMoreButton = this.elementCreator.createElement('a', ['read-more-button']);
        this.categoryDivContainer = this.elementCreator.createElement('div', ['card-categories', 'd-flex', 'row']);
    }

    addElementsToArticlePreviewBody() {
        this.addElementsToArticlePreviewInfos();
        this.bodyParent.appendChild(this.articleTitle);
        this.bodyParent.appendChild(this.readMoreButton);
        this.addCategories();
    }

    createArticlePreviewEditButtonComponents() {
        this.editButtonsRow = this.elementCreator.createElement('div', ['edit-buttons', 'container', 'row', 'mb-2']);
        this.editButtonsContainer = this.elementCreator.createElement('div', ['edit-buttons-container', 'col', 'd-flex', 'justify-content-center']);
        this.editButton = this.buttonCreator.createEditButton();
        this.deleteButton = this.buttonCreator.createDeleteButton('#delete-article-modal');
    }

    addElementsToArticlePreviewEditButtonPart() {
        this.editButtonsParent.appendChild(this.editButtonsRow);
        this.editButtonsRow.appendChild(this.editButtonsContainer);
        this.editButtonsContainer.appendChild(this.editButton);
        this.editButtonsContainer.appendChild(this.deleteButton);
    }

    createArticlePreviewInfosComponents() {
        this.bodyParent = this.elementCreator.createElement('div', ['card-body']);
        this.articleInfosDiv = this.elementCreator.createElement('div', ['article-infos', 'd-flex']);
        this.dateAndViewersCol = this.elementCreator.createElement('div', ['date-and-viewers-col', 'col']);
        this.dateDivContainer = this.elementCreator.createElement('div', ['date-container', 'd-flex', 'align-items-end']);
        this.dateIcon = this.elementCreator.createElement('i', ['bi', 'bi-app']);
        this.date = this.elementCreator.createElement('div', ['date']);
        this.viewersDivContainer = this.elementCreator.createElement('div', ['viewers-container', 'd-flex', 'col']);
        this.viewersIcon = this.elementCreator.createElement('i', ['bi', 'bi-app']);
        this.viewers = this.elementCreator.createElement('div', ['viewers']);
        this.authorAndMinutesToReadCol = this.elementCreator.createElement('div', ['author-and-minutes-to-read', 'col']);
        this.authorDivContainer = this.elementCreator.createElement('div', ['author', 'd-flex', 'col']);
        this.authorIcon = this.elementCreator.createElement('i', ['bi', 'bi-app']);
        this.author = this.elementCreator.createElement('div', ['author']);
        this.minutesToReadDivContainer = this.elementCreator.createElement('div', ['minutes-to-read-container', 'd-flex', 'col']);
        this.minutesToReadIcon = this.elementCreator.createElement('i', ['bi', 'bi-app'],);
        this.minutesToRead = this.elementCreator.createElement('div', ['minutes-to-read']);
    }

    addElementsToArticlePreviewInfos() {
        this.bodyParent.appendChild(this.articleInfosDiv);
        this.articleInfosDiv.appendChild(this.dateAndViewersCol);
        this.dateAndViewersCol.appendChild(this.dateDivContainer);
        this.dateDivContainer.appendChild(this.dateIcon);
        this.dateDivContainer.appendChild(this.date);
        this.dateAndViewersCol.appendChild(this.viewersDivContainer);
        this.viewersDivContainer.append(this.viewersIcon);
        this.viewersDivContainer.appendChild(this.viewers);
        this.articleInfosDiv.appendChild(this.authorAndMinutesToReadCol);
        this.authorAndMinutesToReadCol.appendChild(this.authorDivContainer);
        this.authorDivContainer.appendChild(this.authorIcon);
        this.authorDivContainer.appendChild(this.author);
        this.authorAndMinutesToReadCol.appendChild(this.minutesToReadDivContainer);
        this.minutesToReadDivContainer.appendChild(this.minutesToReadIcon);
        this.minutesToReadDivContainer.appendChild(this.minutesToRead);
        this.cardBodysParent.appendChild(this.bodyParent);
    }

    setArticlePreviewData() {
        this.articleImage.src = this.articleInfo.getImageURL();
        this.date.innerText = this.articleInfo.getLastModificationDate();
        this.viewers.innerText = '0';
        this.author.innerText = this.articleInfo.getAuthorName();
        this.minutesToRead.innerText = this.articleInfo.getMinutesToRead();
        this.articleTitle.innerText = this.articleInfo.getTitle();
        this.readMoreButton.innerHTML = 'Olvass tovább';
        this.readMoreButton.href = '#';
    }

    addCategories() {
        let categories = this.articleInfo.getCategories();
        categories.forEach(categoryName => {
            this.category = this.createACategory(categoryName);
            this.categoryDivContainer.appendChild(this.category);
        })
        this.bodyParent.appendChild(this.categoryDivContainer);
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