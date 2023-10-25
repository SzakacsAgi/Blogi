class SingleArticleLoader {

     constructor() {
        this.elementModifier = new ElementModifier();
        this.storedDataProvider = new StoredDataProvider();
        this.articleId = this.storedDataProvider.getItemFromSessionStorage("articleId");
        this.elementProvider = new ElementProvider();
        this.singleArticleDataProvider = new SingleArticleDataProvider();
    }

    async loadArticleToSingleArticlePage(){
        let browserDataModifier = new BrowserDataModifier();
        let articleInfo = await this.singleArticleDataProvider.createArticle(this.articleId);
        this.loadArticleTitle(articleInfo.getTitle(), '#article-title');
        this.loadArticleImage(articleInfo.getImageURL(), '#article-image');
        this.loadArticleContent(articleInfo.getContent(), '#article-content');
        browserDataModifier.updateTitleWith(articleInfo.getTitle());
    }

    async loadArticleToArticleEditorPage(){
        let articleInfo = await this.singleArticleDataProvider.createArticle(this.articleId);
        let titleElement = this.elementProvider.getElementById('title');
        titleElement.value = articleInfo.getTitle();
        let filePreviewElement = this.elementProvider.getElementById('file-preview');
        filePreviewElement.src = articleInfo.getImageURL();
        this.storedDataProvider.setItemToSessionStorage("currentImageURL", articleInfo.getImageURL());
        this.loadArticleCategories(articleInfo.getCategories(), "#categories");
        tinymce.activeEditor.setContent(articleInfo.getContent());
    }

    loadArticleTitle(articleTitle, elementIdToLoadInto){
       let elementToLoadInto = this.findElement(elementIdToLoadInto);
       this.elementModifier.setElementText(elementToLoadInto, articleTitle);
    }

    loadArticleImage(imageURL, elementIdToLoadInto){
        let elementToLoadInto = this.findElement(elementIdToLoadInto);
        elementToLoadInto.style.backgroundImage = "url("+imageURL+")";
    }

    loadArticleContent(articleContent, elementIdToLoadInto){
        let elementToLoadInto = this.findElement(elementIdToLoadInto);
        this.elementModifier.setElementText(elementToLoadInto, articleContent);
    }

    loadArticleCategories(articleCategories, elementIdToLoadInto){
        let elementToLoadInto = this.findElement(elementIdToLoadInto);
        if(articleCategories.length > 0){
            articleCategories.forEach(category => elementToLoadInto.textContent = elementToLoadInto.textContent+category+"\n");
        }
    }

    findElement(id){
        let main = document.body.querySelector('main');
        return main.querySelector(id);
    }

}
