class UnauthenticatedUserViewDisplayer extends PageViewDisplayer{

    constructor(){
        super();
    }

     async displayUnAuthenticatedHeader(){
         await this.initializeHeader();
         let signedInButton = this.elementProvider.getSubComponent(this.header, ".sign-in-button");
         this.elementModifier.displayElement(signedInButton);
     }

     displayUnAuthenticatedArticlePage(){
         let needToAuthenticateElement = this.elementProvider.getElementById("need-to-sign-in");
         this.elementModifier.displayElement(needToAuthenticateElement);
     }

}