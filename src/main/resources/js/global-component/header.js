class BlogiHeader extends HTMLElement {

    constructor() {
        super();
        this.template = document.createElement("template");
        this.cssStyleSheet = document.createElement("style");
    }

    async initialize(){
        await this.displayHeader();
    }

    async displayHeader() {
        await this.addHeaderHtmlContent();
        await this.applyStyles();
        this.appendChild(this.template.content.cloneNode(true));
    }

    async addHeaderHtmlContent(){
        let headerHtmlContent = await this.getHeaderHtmlContent();
        this.template.innerHTML = headerHtmlContent;
    }

    async applyStyles() {
        let headerCssContent = await this.getHeaderCssContent();
        this.cssStyleSheet.textContent = headerCssContent;
        this.appendChild(this.cssStyleSheet);
    }

    async getHeaderHtmlContent() {
        return await fetch('header.html').then(response => response.text());
    }

    async getHeaderCssContent() {
        return await fetch('header.css').then(response => response.text());
    }

}

customElements.define("blogi-header", BlogiHeader);
