class AboutMePart extends HTMLElement {

    constructor(){
        super();
        this.template = document.createElement("template");
        this.cssStyleSheet = document.createElement("style");
        this.displayAboutMePart();
    }

    async displayAboutMePart(){
        await this.addAboutMePartHtmlContent();
        await this.applyStyles();
        this.appendChild(this.template.content.cloneNode(true));
    }

     async addAboutMePartHtmlContent(){
        let aboutMePartHtmlContent = await this.getAboutMePartHtmlContent();
        this.template.innerHTML = aboutMePartHtmlContent;
     }

     async applyStyles() {
        let aboutMePartCssContent = await this.getAboutMePartCssContent();
        this.cssStyleSheet.textContent = aboutMePartCssContent;
        this.appendChild(this.cssStyleSheet);
     }

    async getAboutMePartHtmlContent(){
        return await fetch('about-me-part.html').then(response =>response.text());
    }

    async getAboutMePartCssContent(){
        return await fetch('about-me-part.css').then(response =>response.text());
    }

}

customElements.define("about-me-part", AboutMePart);
