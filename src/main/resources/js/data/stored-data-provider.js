class StoredDataProvider {

    constructor() { }

    getItemFromLocalStorage(key) {
        return localStorage.getItem(key);
    }

    setItemToLocalStorage(key, value) {
        localStorage.setItem(key, value);
    }

    getItemFromSessionStorage(key) {
        return sessionStorage.getItem(key);
    }

    setItemToSessionStorage(key, value) {
        sessionStorage.setItem(key, value);
    }

    clearLocalStorage(){
        localStorage.clear();
    }
    
    clearSessionStorage(){
        sessionStorage.clear();
    }

}