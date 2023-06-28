class SingleArticleLoader {

    elementModifier = new ElementModifier();
    storedDataProvider = new StoredDataProvider();
    articleId = this.storedDataProvider.getItemFromSessionStorage("articleId");

    constructor() { }

    async load(){
        let singleArticleDataProvider = new SingleArticleDataProvider();
        singleArticleDataProvider.createArticle(this.articleId)
          .then(articleInfo => {
            this.loadArticleTitle(articleInfo.getTitle());
            this.loadArticleImage(articleInfo.getImageURL());
            this.loadArticleContent(articleInfo.getContent());
          })
          .catch(error => {
            console.error("Error fetching article:", error);
          });
    }

    loadArticleTitle(articleTitle){
       let titleContainer = this.findElement('#article-title');
       this.elementModifier.setElementText(titleContainer, articleTitle);
    }

    loadArticleImage(imageURL){
        let imageContainer = this.findElement('#article-image');
        this.modifyImageProperty(imageContainer, imageURL);
     }

    loadArticleContent(articleContent){
        let contentContainer = this.findElement('.container #article-content');
        this.elementModifier.setElementText(contentContainer, articleContent);
    }

    modifyImageProperty(imageContainer, imageURL){
        imageContainer.style.backgroundImage = "url("+imageURL+")";
        imageContainer.style.height = "660px";
        imageContainer.style.backgroundSize = "100% 100%";
        imageContainer.style.backgroundPosition = "center";
        imageContainer.style.backgroundRepeat = "no-repeat";
    }

    findElement(id){
        let main = document.body.querySelector('main');
        return main.querySelector(id);
    }

}