class ButtonCreator {

    elementCreator = new ElementCreator();

    constructor(){}

    createEditButton(){
        let editButton = document.createElement('button');
        editButton.classList.add('edit-button');
        editButton.href = '#';
        let editButtonIcon =  this.elementCreator.createElement('i', ['fa-solid', 'fa-pen-to-square']);
        editButton.appendChild(editButtonIcon);
        return editButton;
    }

    createDeleteButton(modalId){
        let deleteButton = document.createElement('button');
        deleteButton.classList.add('edit-button');
        deleteButton.href = '#';
        let deleteButtonIcon =  this.elementCreator.createElement('i', ['fa-solid', 'fa-trash']);
        deleteButton.setAttribute('data-bs-toggle', 'modal');
        deleteButton.setAttribute('data-bs-target', modalId);
        deleteButton.appendChild(deleteButtonIcon);
        return deleteButton;
    }

}