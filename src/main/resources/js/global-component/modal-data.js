class ModalData{

    constructor(){
        this.deleteArticle = 'deleteArticle';
        this.deleteComment = 'deleteComment';
        this.deleteArticleTitle = 'Biztosan törölni szeretnéd a cikket?';
        this.deleteCommentTitle = 'Biztosan törölni szeretnéd a hozzászólást?';
    }

    getData(name){
        return this[name];
    }
}