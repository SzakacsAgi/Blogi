class PageViewLoadPreconditionHandlerExecutor {

    handler;

    constructor(){
        this.handler = new PageViewLoadPreconditionHandler();
    }

    execute() {
        this.handler.handle();
    }
}

new PageViewLoadPreconditionHandlerExecutor().execute();