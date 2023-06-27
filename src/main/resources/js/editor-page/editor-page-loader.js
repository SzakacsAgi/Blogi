class EditorPageLoader {

    sessionSynchronizer = new SessionSynchronizer();

    constructor() { }

    load() {
        this.sessionSynchronizer.sync();
    }
}

let editorPageLoader = new EditorPageLoader().load();