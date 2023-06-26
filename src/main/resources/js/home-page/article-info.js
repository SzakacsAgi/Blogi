class ArticleInfo {

    constructor(article) {
        this.article = article;
    }

    getId() {
        return this.article.id;
    }

    getTitle() {
        return this.article.title;
    }

    getAuthorName() {
        return this.article.authorName;
    }

    getMinutesToRead() {
        return this.article.minutesToRead;
    }

    getLastModificationDate() {
        return this.article.lastModificationDate;
    }

    getImageURL() {
        return this.article.imageURL;
    }

    getCategories() {
        return this.article.categories;
    }

}