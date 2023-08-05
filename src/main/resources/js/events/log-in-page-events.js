class LogInPageEvents {

    urlProvider;

    constructor(){
        this.urlProvider = new URLProvider();
    }

    registerEvents(){
        window.addEventListener('load', () => {
            this.addGoogleSignInButtonEventListener();
        })
    }

    addGoogleSignInButtonEventListener(){
        let googleButton = document.getElementById("google-log-in");
        googleButton.addEventListener("click", () => {
            googleButton.href = this.urlProvider.getGoogleSignInUrl();
            googleButton.click();
        })
    }

    addGoogleSignInButtonEventListener(){
        let googleButton = document.getElementById("google-log-in");
        googleButton.addEventListener("click", () => {
            googleButton.href = this.urlProvider.getGoogleSignInUrl();
            googleButton.click();
        })
    }
}

new LogInPageEvents().registerEvents();