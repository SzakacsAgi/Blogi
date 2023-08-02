class ArticlePart extends HTMLElement {

    constructor(){
        super();
        this.template = document.createElement("template");
        this.cssStyleSheet = document.createElement("style");
        this.displayArticlePart();
    }

    displayArticlePart() {
        return Promise.all([
          this.addArticlePartHtmlContent(),
          this.applyStyles(),
        ]).then(() => {
          this.appendChild(this.template.content.cloneNode(true));
        });
      }

     async addArticlePartHtmlContent(){
        let articlePartHtmlContent = await this.getArticlePartHtmlContent();
        this.template.innerHTML = articlePartHtmlContent;
     }

     async applyStyles() {
        let articlePartCssContent = await this.getArticlePartCssContent();
        this.cssStyleSheet.textContent = articlePartCssContent;
        this.appendChild(this.cssStyleSheet);
     }

    async getArticlePartHtmlContent(){
        return await fetch('article-part.html').then(response =>response.text());
    }

    async getArticlePartCssContent(){
        return await fetch('article-part.css').then(response =>response.text());
    }

}

customElements.define("article-part", ArticlePart);
