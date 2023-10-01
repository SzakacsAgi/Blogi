class PageViewPermissionRoleVerifier {

    ADMIN_USER_ROLE = "ADMIN";
    SIGNED_IN_USER_ROLE = "USER";
    ANONYMOUS_USER_ROLE = "ANONYMOUS";

    permissionRoleForPageViews = new Map();

    constructor() {
        this.initPermissionRoleForPageViews();
    }

    initPermissionRoleForPageViews() {
        this.permissionRoleForPageViews.set("/blogi/home", this.allRoleGroup());
        this.permissionRoleForPageViews.set("/blogi/article", this.allRoleGroup());
        this.permissionRoleForPageViews.set("/blogi/error", this.allRoleGroup());
        this.permissionRoleForPageViews.set("/blogi/redirect", this.allRoleGroup());
        this.permissionRoleForPageViews.set("/blogi/editor", this.adminOnlyGroup());
        this.permissionRoleForPageViews.set("/blogi/new-article", this.adminOnlyGroup());
    }

    allRoleGroup() {
        return [this.ANONYMOUS_USER_ROLE, this.SIGNED_IN_USER_ROLE, this.ADMIN_USER_ROLE];
    }

    adminOnlyGroup() {
            return [this.ADMIN_USER_ROLE];
    }

    hasNoPermission() {
        return !this.hasPermission();
    }

    hasPermission() {
        let pageViewURL = window.location.pathname;
        let role = AuthenticatedUserInfo.role;
        let roleGroup = this.permissionRoleForPageViews.get(pageViewURL);;
        return roleGroup.includes(role);
    }


}