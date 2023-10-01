class HomePageLoader extends PageLoader{

    homePageDynamicComponentsDisplayer;
    homePageEventListeners;

    constructor(){
        super();
        this.homePageDynamicComponentsDisplayer = new HomePageDynamicComponentsDisplayer();
    }

    async load(){
        await super.load();
        this.homePageEventListeners = new HomePageEventListeners();
        await this.homePageDynamicComponentsDisplayer.display();
        this.homePageEventListeners.registerEventListeners();
    }

}

 window.addEventListener('load', async () => {
    new HomePageLoader().load();
 })