class FilterBodyPart extends HTMLElement {

    constructor() {
        super();
        this.template = document.createElement("template");
        this.cssStyleSheet = document.createElement("style");
        this.displayFilterBodyPart();
        console.log("Filter-body");
    }


    displayFilterBodyPart() {
        return Promise.all([
            this.addFilterBodyPartHtmlContent(),
            this.applyStyles(),
        ]).then(() => {
            this.appendChild(this.template.content.cloneNode(true));
        });
    }

    async addFilterBodyPartHtmlContent() {
        let filterBodyPartHtmlContent = await this.getFilterBodyPartHtmlContent();
        this.template.innerHTML = filterBodyPartHtmlContent;
    }

    async applyStyles() {
        let filterBodyPartCssContent = await this.getFilterBodyPartCssContent();
        this.cssStyleSheet.textContent = filterBodyPartCssContent;
        this.appendChild(this.cssStyleSheet);
    }

    async getFilterBodyPartHtmlContent() {
        return await fetch('filter-body-part.html').then(response => response.text());
    }

    async getFilterBodyPartCssContent() {
        return await fetch('filter-body-part.css').then(response => response.text());
    }

}

customElements.define("filter-body-part", FilterBodyPart);