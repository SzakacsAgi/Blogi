class CommentInfo {

    constructor(comment) {
        this.comment = comment;
    }

    getId() {
        return this.comment.id;
    }

    getArticleId() {
        return this.comment.articleId;
    }

    getUserId() {
        return this.comment.userId;
    }

    getCreationDate() {
        return this.comment.creationDate;
    }

    getContent() {
        return this.comment.content;
    }

}