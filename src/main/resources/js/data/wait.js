class Wait{

    halfSecond = 500;
    oneSecond = 1000;

    constructor(){}

    forServerResponse(task){
        setTimeout(task, this.halfSecond);
    }

    forPageLoad(task){
        setTimeout(task, this.oneSecond);
    }

}