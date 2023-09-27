class BlogiModal extends HTMLElement {

    constructor(){
        super();
        this.template = document.createElement("template");
        this.cssStyleSheet = document.createElement("style");
        this.displayModal();
    }

    async displayModal(){
        await this.addModalHtmlContent();
        await this.applyStyles();
        this.appendChild(this.template.content.cloneNode(true));
    }

     async addModalHtmlContent(){
        let modalHtmlContent = await this.getModalHtmlContent();
        this.template.innerHTML = modalHtmlContent;
     }

     async applyStyles() {
        let modalCssContent = await this.getModalCssContent();
        this.cssStyleSheet.textContent = modalCssContent;
        this.appendChild(this.cssStyleSheet);
     }

    async getModalHtmlContent(){
        return await fetch('modal.html').then(response =>response.text());
    }

    async getModalCssContent(){
        return await fetch('modal.css').then(response =>response.text());
    }

}

customElements.define("blogi-modal", BlogiModal);
