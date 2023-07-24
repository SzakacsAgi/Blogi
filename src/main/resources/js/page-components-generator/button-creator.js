class ButtonCreator {

    elementCreator = new ElementCreator();
    elementModifier = new ElementModifier();
    eventListeners = new EventListeners();
    URLProvider = new URLProvider();


    constructor(){}

    createEditButton(id){
        let editButton = this.elementCreator.createElement('a', ['edit-button'])
        this.elementModifier.setElementAttributes(editButton, {oncontextmenu:"return false;"});
        this.elementModifier.setElementAttributes(editButton, {href:this.URLProvider.getArticleEditorURL(), target:"_blank"});
        let editButtonIcon =  this.elementCreator.createElement('i', ['fa-regular', 'fa-pen-to-square']);
        editButton.appendChild(editButtonIcon);
        this.eventListeners.copyArticleId(editButton, id);
        return editButton;
    }

    createDeleteButton(modalId, id){
        let deleteButton = this.elementCreator.createElement('button', ['delete-button'])
        let deleteButtonIcon =  this.elementCreator.createElement('i', ['fa-regular', 'fa-trash-can']);
        this.elementModifier.setElementAttributes(deleteButton, { 'data-bs-toggle': 'modal', 'data-bs-target': modalId });
        deleteButton.appendChild(deleteButtonIcon);
        this.eventListeners.addDeleteButtonListener(deleteButton, id);
        return deleteButton;
    }

    createReadMoreButton(id){
        let readMoreButton = this.elementCreator.createElement('a', ['read-more-button']);
        this.elementModifier.setElementAttributes(readMoreButton, {href:this.URLProvider.getArticlePageURL(), target:"_blank"});
        this.elementModifier.setElementAttributes(readMoreButton, {oncontextmenu:"return false;"});
        this.eventListeners.copyArticleId(readMoreButton, id);
        return readMoreButton;
    }

}