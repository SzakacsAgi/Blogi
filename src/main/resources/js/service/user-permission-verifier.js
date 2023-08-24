class UserPermissionVerifier {

    constructor() {}

    hasPermissionForDeleteComment(comment) {
        return this.hasAdminRole() || this.isCommentAuthorYou(comment);
    }

    hasPermissionForUpdateComment(comment) {
        return this.isCommentAuthorYou(comment);
    }

    hasAdminRole() {
        return AuthenticatedUserInfo.isAdmin;
    }

    isCommentAuthorYou(comment) {
        let userID = AuthenticatedUserInfo.id;
        let commentAuthorID = comment.getUserId();

        return userID == commentAuthorID;
    }
}