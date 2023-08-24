class ModalLoader{

    constructor(){
        this.elementProvider = new ElementProvider();
        this.componentAdder = new ComponentAdder();
    }

    async load(){
        this.modalElement = await this.getModal();
        this.displayModal();
    }

    displayModal(){
        let modalParent = this.elementProvider.getElementById("modal-element");
        this.componentAdder.add(modalParent, this.modalElement);
    }

    async getModal(){
        return await this.elementProvider.getElementFromHtmlFile('modal.html');
    }

}