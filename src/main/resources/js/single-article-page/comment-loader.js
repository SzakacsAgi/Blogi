class CommentLoader{

    urlProvider;
    storedDataProvider;
    commentRESTAPICaller;
    commentBuilder;
    elementProvider;
    elementModifier;

    constructor(){
        this.urlProvider = new URLProvider();
        this.storedDataProvider = new StoredDataProvider();
        this.commentRESTAPICaller = new CommentRESTAPICaller();
        this.commentBuilder = new CommentBuilder();
        this.elementProvider = new ElementProvider();
        this.elementModifier = new ElementModifier();
    }

    async load(){
        let comments = await this.getComments();
        let thereIsComment = comments.length > 0;
        if(thereIsComment){
            for(let comment of comments){
                 await this.commentBuilder.build(comment);
            }
        }
        else{
            let noCommentElement = this.elementProvider.getElementById("no-comment");
            this.elementModifier.removeElementClass(noCommentElement, ["hide"]);
        }
    }

    async getComments(){
        return await this.commentRESTAPICaller.getCommentForAnArticle();
    }

}