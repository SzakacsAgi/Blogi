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

    displayElement(element){
        this.removeElementClass(element, ["hide"]);
    }

    removeElement(element){
        console.log(element)
        console.log("delete from dom...")
        element.remove();
    }

    hideElement(element){
        this.addElementClass(element, ["hide"]);
    }

    clearInputField(inputField){
        inputField.value = '';
    }

}