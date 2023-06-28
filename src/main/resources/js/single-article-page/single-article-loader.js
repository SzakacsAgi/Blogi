class SingleArticleLoader {

    elementModifier = new ElementModifier();
    singleArticleDataProvider = new SingleArticleDataProvider();

    constructor() { }

    async load(){
        await this.singleArticleDataProvider.setArticleInfo();
        this.loadArticleTitle();
        this.loadArticleImage();
        this.loadArticleContent();
    }

    findElement(id){
        let main = document.body.querySelector('main');
        return main.querySelector(id);
    }

     loadArticleTitle(){
        let titleContainer = this.findElement('#article-title');
        this.elementModifier.setElementText(titleContainer, this.singleArticleDataProvider.getArticleInfo().getTitle());
     }

     loadArticleImage(){
        let imageContainer = this.findElement('#article-image');
        this.modifyImageProperty(imageContainer);
     }

     modifyImageProperty(imageContainer){
        imageContainer.style.backgroundImage = "url("+this.singleArticleDataProvider.getArticleInfo().getImageURL();+")";
        imageContainer.style.height = "660px";
        imageContainer.style.backgroundSize = "100% 100%";
        imageContainer.style.backgroundPosition = "center";
        imageContainer.style.backgroundRepeat = "no-repeat";
     }

     loadArticleContent(){
         let contentContainer = this.findElement('.container #article-content');
         this.elementModifier.setElementText(contentContainer, this.singleArticleDataProvider.getArticleInfo().getContent());
     }
}