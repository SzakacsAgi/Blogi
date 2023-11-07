class ArticleExceptionHandler{

    constructor(){
        this.elementProvider = new ElementProvider();
        this.elementModifier = new ElementModifier();
        this.fileInput = this.elementProvider.getElementById('file-input');
        this.globalErrorMessageField = this.elementProvider.getElementById('errorMessage');
    }

    handleTitleIsNullException(){
        let titleInput =  this.elementProvider.getElementById('title');
        this.elementModifier.addElementClass(titleInput, ['invalid']);
        let titleIsNotValidMessageElement = this.elementProvider.getElementById("titleIsNotValidMessage");
        this.elementModifier.setElementText(titleIsNotValidMessageElement, "A cikk címét kötelező megadni!");
        this.elementModifier.setElementText(this.globalErrorMessageField, "A cikk címét kötelező megadni!");
        this.elementModifier.displayElement(titleIsNotValidMessageElement);
        this.elementModifier.displayElement(this.globalErrorMessageField);
    }

    handleFileIsTooBigException(){
        this.elementModifier.addElementClass(this.fileInput, ['invalid']);
        let fileIsNotValidMessageElement = this.elementProvider.getElementById("fileIsNotValidMessage");
        this.elementModifier.setElementText(fileIsNotValidMessage, "A megadott fájl túl nagy, maximum 5MB lehet!");
        this.elementModifier.displayElement(fileIsNotValidMessageElement);
    }

    handleFileFormatIsNotSupported(){
        let fileIsNotValidMessageElement = this.elementProvider.getElementById("fileIsNotValidMessage");
        fileIsNotValidMessage.innerHTML = "A megadott fájl formátum nem támogatott! <br> A támogatott formátumok: jpeg, jpg, png, gif";
        this.elementModifier.setElementText(fileIsNotValidMessage, "A megadott fájl formátum nem támogatott! <br> A támogatott formátumok: jpeg, jpg, png, gif");
        this.elementModifier.displayElement(fileIsNotValidMessageElement);
        this.elementModifier.addElementClass(this.fileInput, ['invalid']);
    }

    handleFileIsNullException(){
        let fileIsNotValidMessageElement = this.elementProvider.getElementById("fileIsNotValidMessage");
        fileIsNotValidMessage.innerHTML = "Egy fájl feltöltése kötelező!";
        this.elementModifier.setElementText(fileIsNotValidMessage, "Egy fájl feltöltése kötelező!");
        this.elementModifier.setElementText(this.globalErrorMessageField, "Egy fájl feltöltése kötelező!");
        this.elementModifier.displayElement(fileIsNotValidMessageElement);
        this.elementModifier.displayElement(this.globalErrorMessageField);
        this.elementModifier.addElementClass(this.fileInput, ['invalid']);
    }

    handelContentIsNullException(){
        let editor = this.elementProvider.getElementByClassName("tox-tinymce");
        let contentIsNullError = this.elementProvider.getElementById('contentIsNullMessage');
        this.elementModifier.setElementText(contentIsNullError, "A cikk tartalma nem lehet üres!");
        this.elementModifier.setElementText(this.globalErrorMessageField, "A cikk tartalma nem lehet üres!");
        this.elementModifier.addElementClass(editor, ['invalid']);
        this.elementModifier.displayElement(contentIsNullError);
        this.elementModifier.displayElement(this.globalErrorMessageField);
        editor.title = "A cikk tartalmát kötelező megadni!";
    }

}