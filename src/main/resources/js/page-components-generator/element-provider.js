class ElementProvider{

    constructor(){}

    getComponent(name){
        return document.getElementsByTagName(name)[0];
    }

    getElementById(name){
        return document.getElementById(name)
    }

    getSubComponent(mainComponent, subComponent){
        return mainComponent.querySelector(subComponent);
    }

/*    getLastOccurrenceOfComponent(name){
        let lastIndex = document.getElementsByTagName(name).length -1;
        console.log(lastIndex)
        return document.getElementsByTagName(name)[lastIndex];
    }*/

    getElementFromHtmlFile(fileName){
        return fetch(fileName)
            .then(response => response.text())
            .then(htmlText => {
                let parser = new DOMParser();
                let htmlDoc = parser.parseFromString(htmlText, 'text/html');
                let commentElement = htmlDoc.querySelector("body > *");
                return commentElement;
        })
    }



}