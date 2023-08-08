class TokenProvider {

    constructor(){}

    getUserToken(){
         let urlSearchPart =  window.location.search;
         return "Bearer " + urlSearchPart.slice(urlSearchPart.indexOf("=") +1);
    }

}