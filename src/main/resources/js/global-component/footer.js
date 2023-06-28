class MyFooter extends HTMLElement {

    constructor(){
        super();
        this.template = document.createElement("template");
        this.cssStyleSheet = new CSSStyleSheet();
        this.displayFooter();
    }

    async displayFooter(){
        let footerHtmlContent = await this.getFooterHtmlContent();
        this.template.innerHTML = footerHtmlContent;

        let footerCssContent = await this.getFooterCssContent();
        let shadowRoot = this.attachShadow({ mode: "open" });
        await this.cssStyleSheet.replace(footerCssContent);

        shadowRoot.adoptedStyleSheets = [this.cssStyleSheet];
        shadowRoot.appendChild(this.template.content.cloneNode(true));
    }

    async getFooterHtmlContent(){
        return await fetch('footer.html').then(response =>response.text());
    }

    async getFooterCssContent(){
        return await fetch('footer.css').then(response =>response.text());
    }

}

customElements.define("my-footer", MyFooter);
