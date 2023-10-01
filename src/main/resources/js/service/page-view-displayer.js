class PageViewDisplayer {

     elementModifier;
     elementProvider;
     header;

    constructor(){
        this.elementModifier = new ElementModifier();
        this.elementProvider = new ElementProvider();
        this.header = this.elementProvider.getComponent("blogi-header");
    }

    async initializeHeader(){
        await this.header.initialize();
    }

}