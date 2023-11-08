class LogInPageEvents {

    urlProvider;

    constructor(){
        this.urlProvider = new URLProvider();
    }

    registerEvents(){
        window.addEventListener('load', () => {
            this.addSocialButtonEventListener("google");
            this.addSocialButtonEventListener("github");
        })
    }

    addSocialButtonEventListener(socialMediaName){
        let socialMediaButton = document.getElementById(socialMediaName+"-log-in");
        socialMediaButton.addEventListener("click", () => {
            socialMediaButton.href = this.urlProvider.getAuthenticationURL(socialMediaName);
        })
    }
}

new LogInPageEvents().registerEvents();