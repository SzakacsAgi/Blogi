class EventListeners {

    buttonClickEvent = new ButtonEventListenerProvider();

    constructor() {}

    registerEventListeners(){
        this.addFilterSearchListener();
        this.addResetFilterSearchListener();
    }

    addFilterSearchListener() {
        let filterSearchButton = document.getElementById("filter-search");
        filterSearchButton.addEventListener("click", this.buttonClickEvent.clickOnFilterSearchButton);
    }

    addResetFilterSearchListener() {
        let resetFilterSearchButton = document.getElementById("delete-filters");
        resetFilterSearchButton.addEventListener("click", this.buttonClickEvent.clickOnResetFilterButton);
    }

}

let eventListeners = new EventListeners();
eventListeners.registerEventListeners();