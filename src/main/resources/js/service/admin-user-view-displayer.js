class AdminUserViewDisplayer extends PageViewDisplayer {

    constructor(){
        super();
    }

    displayArticleModifierButtons(){
        let newArticleButton = this.elementProvider.getElementByClassName("new-article-button-container");
        let modifyButtons = this.elementProvider.getElementsByClassName("edit-buttons");

        this.elementModifier.displayElement(newArticleButton);

        Array.from(modifyButtons).forEach((modifyButton) => {
            this.elementModifier.displayElement(modifyButton);
        });

    }
}