class PageViewLoadPreconditionHandler {

    authenticationStatusTracker;
    pageViewPermissionRoleVerifier;
    redirector;

    constructor() {
        this.authenticationStatusTracker = new AuthenticationStatusTracker();
        this.pageViewPermissionRoleVerifier = new PageViewPermissionRoleVerifier();
        this.redirector = new Redirector();
    }

    async handle() {
        await this.authenticationStatusTracker.detectAuthenticationStatus();

        let isPermissionDenied = this.pageViewPermissionRoleVerifier.hasNoPermission();
        if (isPermissionDenied) {
            this.redirector.redirectWhenPermissionIsDenied();
        }
    }
}