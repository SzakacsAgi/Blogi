class ElementProvider{

    constructor(){}

    getComponent(name){
        return document.getElementsByTagName(name)[0];
    }

    getElementById(id){
        return document.getElementById(id);
    }

    getSubComponent(mainComponent, subComponent){
        return mainComponent.querySelector(subComponent);
    }

    getElementByClassName(name){
       return document.getElementsByClassName(name)[0];
    }

    getElementsByClassName(name){
        return document.getElementsByClassName(name);
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

    getAncestor(element, ancestorSelector){
       return element.closest(ancestorSelector);
    }

    getAllSubComponent(mainComponent, subComponent){
        return mainComponent.querySelectorAll(subComponent);
    }

    getClickedElement(){
        return new Promise(resolve => {
            function handleClick(event) {
                let clickedElement = event.target;
                document.removeEventListener('click', handleClick);
                resolve(clickedElement);
            }
            document.addEventListener('click', handleClick);
        });
    }

    getInputFieldContentById(id){
        return this.getElementById(id).value;
    }
}
