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
