class ArticleExceptionHandler{

    constructor(){
        this.elementProvider = new ElementProvider();
        this.elementModifier = new ElementModifier();
        this.fileInput = this.elementProvider.getElementById('file-input');
    }

    handleTitleIsNullException(){
        let titleInput =  this.elementProvider.getElementById('title');
        this.elementModifier.addElementClass(titleInput, ['invalid']);
        let titleIsNotValidMessageElement = this.elementProvider.getElementById("titleIsNotValidMessage");
        titleIsNotValidMessageElement.innerHTML = "A cikk címét kötelező megadni!";
        this.elementModifier.displayElement(titleIsNotValidMessageElement);
    }

    handleFileIsTooBigException(){
        this.elementModifier.addElementClass(this.fileInput, ['invalid']);
        let fileIsNotValidMessageElement = this.elementProvider.getElementById("fileIsNotValidMessage");
        fileIsNotValidMessage.innerHTML = "A megadott fájl túl nagy, maximum 5MB lehet!";
        this.elementModifier.displayElement(fileIsNotValidMessageElement);
    }

    handleFileFormatIsNotSupported(){
        let fileIsNotValidMessageElement = this.elementProvider.getElementById("fileIsNotValidMessage");
        fileIsNotValidMessage.innerHTML = "A megadott fájl formátum nem támogatott! A támogatott formátumok: jpeg, jpg, png, gif";
        this.elementModifier.displayElement(fileIsNotValidMessageElement);
        this.elementModifier.addElementClass(this.fileInput, ['invalid']);
    }

    handleFileIsNullException(){
        let fileIsNotValidMessageElement = this.elementProvider.getElementById("fileIsNotValidMessage");
        fileIsNotValidMessage.innerHTML = "Egy fájl feltöltése kötelező!";
        this.elementModifier.displayElement(fileIsNotValidMessageElement);
        this.elementModifier.addElementClass(this.fileInput, ['invalid']);
    }

    handelContentIsNullException(){
        let editor = this.elementProvider.getElementByClassName("tox-tinymce");
        let contentIsNullError = this.elementProvider.getElementById('contentIsNullMessage');
        this.elementModifier.addElementClass(editor, ['invalid']);
        this.elementModifier.displayElement(contentIsNullError);
        editor.title = "A cikk tartalmát kötelező megadni!";
    }

}