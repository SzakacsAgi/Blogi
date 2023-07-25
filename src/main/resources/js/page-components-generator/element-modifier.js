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

    removeElementClass(element, listOfClasses){
        listOfClasses.forEach(property => {
           element.classList.remove(property);
        })
    }

    addElementClass(element, listOfClasses){
        listOfClasses.forEach(property => {
           element.classList.add(property);
        })
    }

}