class ElementModifier {

    constructor(){}

    setElementText(element, text){
        element.innerHTML = text;
    }

    setElementAttributes(element, attributesPairObject){
        Object.entries(attributesPairObject).forEach(([attributeName, attributeValue]) => {
            element.setAttribute(attributeName, attributeValue);
        })
    }

}