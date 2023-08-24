class ModalSetter{

    constructor(){
        this.storedDataProvider = new StoredDataProvider();
        this.elementProvider = new ElementProvider();
        this.elementModifier = new ElementModifier();
        this.componentAdder = new ComponentAdder();
        this.modalData = new ModalData();


        this.modal = this.elementProvider.getElementById("modal-element");
        this.titleElement = this.elementProvider.getSubComponent(this.modal, "#title");
        this.confirmNoButton = this.elementProvider.getSubComponent(this.modal, "#modal-cancel");
    }

    setModalData(){
        this.modalType = this.storedDataProvider.getItemFromSessionStorage("modal");
        this.confirmYesButton = this.createConfirmYesButton();

        switch(this.modalType){
            case this.modalData.getData("deleteArticle"):
                this.setModalTitle(this.modalData.getData("deleteArticleTitle"));
                this.setModalButtonText(this.confirmYesButton, 'Igen');
                this.setModalButtonText(this.confirmNoButton, 'Nem');
                break;
            case this.modalData.getData("deleteComment"):
                this.setModalTitle(this.modalData.getData("deleteCommentTitle"));
                this.setModalButtonText(this.confirmYesButton, 'Igen');
                this.setModalButtonText(this.confirmNoButton, 'Nem');
                break;
        }

        this.addConfirmYesButton(this.confirmYesButton);
        this.modal.addEventListener('hidden.bs.modal', () => {
            this.storedDataProvider.clearSpecificItemFromSessionStorage("modal");
            this.elementModifier.removeElement(this.confirmYesButton);
        });

    }

    setModalTitle(title){
        this.elementModifier.setElementText(this.titleElement, title);
    }

    setModalButtonText(button, text){
        this.elementModifier.setElementText(button, text);
    }

    createConfirmYesButton(){
        let confirmYesButton = document.createElement("button")
        this.elementModifier.setElementAttributes(confirmYesButton, {"type":"button", "data-bs-dismiss":"modal", "id":"modal-confirm"});
        this.elementModifier.addElementClass(confirmYesButton, ["button", "confirm-yes"]);
        return confirmYesButton;
    }

    addConfirmYesButton(){
        this.componentAdder.addBeforeOtherComponent(this.confirmNoButton, this.confirmYesButton);
    }

    clickOnConfirmButton(event){
        this.confirmYesButton.addEventListener('click', () => {

        })
    }

}