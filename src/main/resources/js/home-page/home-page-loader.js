class HomePageLoader extends PageLoader{

    homePageDynamicComponentsDisplayer;
    homePageEventListeners;

    constructor(){
        super();
        this.homePageDynamicComponentsDisplayer = new HomePageDynamicComponentsDisplayer();
        this.homePageEventListeners = new HomePageEventListeners();
    }

    async load(){
        await super.load();
        this.homePageDynamicComponentsDisplayer.display();
        this.homePageEventListeners.registerEventListeners();
    }

}

 window.addEventListener('load', async () => {
    new HomePageLoader().load();
 })