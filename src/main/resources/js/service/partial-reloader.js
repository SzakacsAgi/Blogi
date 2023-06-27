class PartialReloader {

    #contentId;

    constructor(){}

    reloadPreviewArticle(){
        this.#contentId = "article-row";
        this.deleteContent(this.#contentId);
    }

    deleteContent(){
        document.getElementById(this.#contentId).innerHTML = '';
    }

}