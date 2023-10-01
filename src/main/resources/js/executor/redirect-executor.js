class RedirectExecutor {

    redirector;

    constructor(){
        this.redirector = new Redirector();
    }

    execute() {
        this.redirector.redirect();
    }
}

new RedirectExecutor().execute();