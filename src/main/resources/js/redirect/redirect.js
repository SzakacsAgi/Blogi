class Redirect {

    tokenSaver;

    constructor(){
        this.tokenSaver = new TokenSaver();
    }

    redirect(){
        this.tokenSaver.saveUserToken();
        this.redirectToTheHomePage();
    }



    redirectToTheHomePage(){
        let homeButton = document.getElementById("home-button");
        homeButton.click();
    }

}

new Redirect().redirect();