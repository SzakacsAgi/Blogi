class UnauthenticatedUserViewDisplayer extends PageViewDisplayer{

    constructor(){
        super();
    }

     displayUnAuthenticatedHeader(){
         let signedInButton = this.elementProvider.getSubComponent(this.header, ".sign-in-button");
         this.elementModifier.displayElement(signedInButton);
     }

     displayUnAuthenticatedArticlePage(){
         let needToAuthenticateElement = this.elementProvider.getElementById("need-to-sign-in");
         this.elementModifier.displayElement(needToAuthenticateElement);
     }

}