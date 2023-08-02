class NewArticleButtonPart extends HTMLElement {

    constructor(){
        super();
        this.template = document.createElement("template");
        this.cssStyleSheet = document.createElement("style");
        this.displayNewArticleButtonPart();
    }

    async displayNewArticleButtonPart(){
        await this.addNewArticleButtonPartHtmlContent();
        await this.applyStyles();
        this.appendChild(this.template.content.cloneNode(true));
    }

     async addNewArticleButtonPartHtmlContent(){
        let newArticleButtonPartHtmlContent = await this.getNewArticleButtonPartHtmlContent();
        this.template.innerHTML = newArticleButtonPartHtmlContent;
     }

     async applyStyles() {
        let newArticleButtonPartCssContent = await this.getNewArticleButtonPartCssContent();
        this.cssStyleSheet.textContent = newArticleButtonPartCssContent;
        this.appendChild(this.cssStyleSheet);
     }

    async getNewArticleButtonPartHtmlContent(){
        return await fetch('new-article-button-part.html').then(response =>response.text());
    }

    async getNewArticleButtonPartCssContent(){
        return await fetch('new-article-button-part.css').then(response =>response.text());
    }

}

customElements.define("new-article-button-part", NewArticleButtonPart);
