class Wait{


    constructor(){}

    forServerResponse(task){
        setTimeout(task, 500);
    }

    forPageLoad(task){
        setTimeout(task, 1000);
    }


}