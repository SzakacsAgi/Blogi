class HomePageLoader extends PageLoader{

    homePageDynamicComponentsDisplayer;
    homePageEventListeners;
    userPermissionVerifier;
    adminUserViewDisplayer;

    constructor(){
        super();
        this.homePageDynamicComponentsDisplayer = new HomePageDynamicComponentsDisplayer();
        this.userPermissionVerifier = new UserPermissionVerifier();
        this.adminUserViewDisplayer = new AdminUserViewDisplayer();
    }

    async load(){
        await super.load();
        this.homePageEventListeners = new HomePageEventListeners();
        await this.homePageDynamicComponentsDisplayer.display();
        this.homePageEventListeners.registerEventListeners();

        if (this.userPermissionVerifier.hasAdminRole()) {
            this.adminUserViewDisplayer.displayArticleModifierButtons();
        }
    }

}

 window.addEventListener('load', async () => {
    new HomePageLoader().load();
 })