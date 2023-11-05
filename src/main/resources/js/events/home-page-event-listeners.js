class HomePageEventListeners {

    constructor() {
        this.buttonEventListenerProvider = new ButtonEventListenerProvider();
        this.storedDataProvider = new StoredDataProvider();
    }

    registerEventListeners(){
        this.addFilterSearchListener();
        this.addResetFilterSearchListener();
        this.addSearchBarListener();
    }

    addFilterSearchListener() {
        let filterSearchButton = document.getElementById("filter-search");
        filterSearchButton.addEventListener("click", this.buttonEventListenerProvider.clickOnFilterSearchButton);
    }

    addResetFilterSearchListener() {
        let resetFilterSearchButton = document.getElementById("delete-filters");
        resetFilterSearchButton.addEventListener("click", this.buttonEventListenerProvider.clickOnResetFilterButton);
    }

    addSearchBarListener(){
        let articleSearcher = new ArticleSearcher();
        let searchBar = articleSearcher.searchBar;
        let timeout = null;

        searchBar.addEventListener('keyup', (event) => {
            if(timeout){
                clearTimeout(timeout);
            }
            articleSearcher.currentSearchText = articleSearcher.getCurrentSearchText(event);
            timeout = setTimeout(async () => {
                await articleSearcher.search();
            }, articleSearcher.waitTimeInMilliseconds);
        });
    }

}