class ModalSetter{

    constructor(){
        this.storedDataProvider = new StoredDataProvider();
        this.elementProvider = new ElementProvider();
        this.elementModifier = new ElementModifier();
        this.componentAdder = new ComponentAdder();
        this.modalData = new ModalData();

        this.modal = this.elementProvider.getComponent("blogi-modal");
        this.titleElement = this.elementProvider.getSubComponent(this.modal, "#title");
        this.confirmNoButton = this.elementProvider.getSubComponent(this.modal, "#modal-cancel");
        this.confirmYesButton = this.elementProvider.getSubComponent(this.modal, "#modal-confirm");
    }

    setModalData(){
        this.modalType = this.storedDataProvider.getItemFromSessionStorage("modal");

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

        this.registerModalConfirmYesButtonClickDetection();
    }

    setModalTitle(title){
        this.elementModifier.setElementText(this.titleElement, title);
    }

    setModalButtonText(button, text){
        this.elementModifier.setElementText(button, text);
    }

    registerModalConfirmYesButtonClickDetection(){
        this.modal.addEventListener('shown.bs.modal', async () => await this.registerModalConfirmYesButton());
        this.modal.removeEventListener('shown.bs.modal', this.registerModalConfirmYesButton);
    }

    registerModalConfirmYesButton() {
        this.elementProvider.getClickedElement().then(clickedElement => {
            if(clickedElement.id === "modal-confirm"){
                this.executeConfirmButtonEvent();
            }
        });
    }

    setClickOnConfirmButtonEvent(eventParent, eventToExecute){
        this.eventParent = eventParent;
        this.eventToExecuteOnConfirmButtonClick = eventToExecute;
    }

    executeConfirmButtonEvent(){
        this.eventToExecuteOnConfirmButtonClick.bind(this.eventParent)();
    }

}