class BrowserDataModifier {

    constructor() { }

    updateTitleWith(title){
        title = title.charAt(0).toUpperCase() + title.slice(1);
        document.title = title;
    }
}