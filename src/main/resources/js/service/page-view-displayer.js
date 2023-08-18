class PageViewDisplayer {

     elementModifier;
     elementProvider;
     header;

    constructor(){
        this.elementModifier = new ElementModifier();
        this.elementProvider = new ElementProvider();
        this.header = this.elementProvider.getComponent("blogi-header");
    }

    displayElement(element){
        this.elementModifier.removeElementClass(element, ["hide"]);
    }

}