class CommentLoader{

    constructor(){
        this.urlProvider = new URLProvider();
        this.storedDataProvider = new StoredDataProvider();
        this.commentRESTAPICaller = new CommentRESTAPICaller();
        this.commentBuilder = new CommentBuilder();
        this.elementProvider = new ElementProvider();
        this.elementModifier = new ElementModifier();
        this.componentAdder = new ComponentAdder();
        this.authenticationRESTAPICaller = new AuthenticationRESTAPICaller();
        this.commentParent = this.elementProvider.getElementById("comments");
    }

    async load(){
        let comments = await this.getComments();
        let hasComments = comments.length > 0;
        if(hasComments){
            for(let comment of comments){
                 let user = await this.getUser(comment.userId);
                 let commentElement = await this.commentBuilder.build(comment, user);
                 this.componentAdder.add(this.commentParent, commentElement)
            }
        }
        else{
            let noCommentElement = this.elementProvider.getElementById("no-comment");
            this.elementModifier.removeElementClass(noCommentElement, ["hide"]);
        }
    }

    async getComments(){
        let articleId = this.storedDataProvider.getItemFromSessionStorage("articleId")
        return await this.commentRESTAPICaller.getCommentsByArticle(articleId);
    }

    async getUser(userId){
        return await this.authenticationRESTAPICaller.getUserInfo(userId);
    }

}