class BlogiFooter extends HTMLElement {

    constructor(){
        super();
        this.template = document.createElement("template");
        this.cssStyleSheet = document.createElement("style");
        this.displayFooter();
    }

    async displayFooter(){
        await this.addFooterHtmlContent();
        await this.applyStyles();
        this.appendChild(this.template.content.cloneNode(true));
    }

     async addFooterHtmlContent(){
        let footerHtmlContent = await this.getFooterHtmlContent();
        this.template.innerHTML = footerHtmlContent;
     }

     async applyStyles() {
        let footerCssContent = await this.getFooterCssContent();
        this.cssStyleSheet.textContent = footerCssContent;
        this.appendChild(this.cssStyleSheet);
     }

    async getFooterHtmlContent(){
        return await fetch('footer.html').then(response =>response.text());
    }

    async getFooterCssContent(){
        return await fetch('footer.css').then(response =>response.text());
    }

}

customElements.define("blogi-footer", BlogiFooter);
