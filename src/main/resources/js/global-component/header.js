class MyHeader extends HTMLElement {

    constructor(){
        super();
        this.template = document.createElement("template");
        this.cssStyleSheet = new CSSStyleSheet();
        this.displayHeader();
    }

    async displayHeader(){
        let headerHtmlContent = await this.getHeaderHtmlContent();
        this.template.innerHTML = headerHtmlContent;

        let headerCssContent = await this.getHeaderCssContent();
        let shadowRoot = this.attachShadow({ mode: "open" });
        await this.cssStyleSheet.replace(headerCssContent);

        shadowRoot.adoptedStyleSheets = [this.cssStyleSheet];
        shadowRoot.appendChild(this.template.content.cloneNode(true));
    }

    async getHeaderHtmlContent(){
        return await fetch('header.html').then(response =>response.text());
    }

    async getHeaderCssContent(){
        return await fetch('header.css').then(response =>response.text());
    }

}

customElements.define("my-header", MyHeader);
