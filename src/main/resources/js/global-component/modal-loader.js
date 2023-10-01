class ModalLoader{

    constructor(){
        this.elementProvider = new ElementProvider();
        this.componentAdder = new ComponentAdder();
    }

    async load(){
        this.modalElement = await this.getModal();
        await this.displayModal();
    }

     async displayModal(){
        let modal = this.elementProvider.getComponent("blogi-modal");
        await modal.displayModal();
    }

    async getModal(){
        return await this.elementProvider.getElementFromHtmlFile('modal.html');
    }

}