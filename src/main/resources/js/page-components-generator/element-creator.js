class ElementCreator{

    constructor(){}

    createElement(elementType, classes=[]){
        let element = document.createElement(elementType);
        element.classList.add(...classes);
        return element;
    }

}