class SearchBarAndFilterPart extends HTMLElement {

    constructor(){
        super();
        this.template = document.createElement("template");
        this.cssStyleSheet = document.createElement("style");
        this.displaySearchBarAndFilterPart();
    }

    async displaySearchBarAndFilterPart(){
        await this.addSearchBarAndFilterPartHtmlContent();
        await this.applyStyles();
        this.appendChild(this.template.content.cloneNode(true));
    }

     async addSearchBarAndFilterPartHtmlContent(){
        let searchBarAndFilterPartHtmlContent = await this.getSearchBarAndFilterPartHtmlContent();
        this.template.innerHTML = searchBarAndFilterPartHtmlContent;
     }

     async applyStyles() {
        let searchBarAndFilterPartCssContent = await this.getSearchBarAndFilterPartCssContent();
        this.cssStyleSheet.textContent = searchBarAndFilterPartCssContent;
        this.appendChild(this.cssStyleSheet);
     }

    async getSearchBarAndFilterPartHtmlContent(){
        return await fetch('search-bar-and-filter-part.html').then(response =>response.text());
    }

    async getSearchBarAndFilterPartCssContent(){
        return await fetch('search-bar-and-filter-part.css').then(response =>response.text());
    }

}

customElements.define("search-bar-and-filter-part", SearchBarAndFilterPart);
