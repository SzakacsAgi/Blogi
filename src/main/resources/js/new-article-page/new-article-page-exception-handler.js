class NewArticlePageExceptionHandler{

    constructor(){}

    registerExceptionHandlers(){
        this.handleTitleIsNullException();
        this.handelMinutesToReadIsNotValidNumberException();
       this.handleMinutesToReadIsNullException();
        this.handleCategoryIsNullException();
        this.handleFileIsNullException();
       // this.handelSubmitWithoutFieldFillException();
    }

    handleTitleIsNullException(){
        let titleInput =  document.getElementById('title');
        titleInput.setCustomValidity('A mező kitöltése kötelező!');
        titleInput.addEventListener('input', function(){
            if(this.validity.valueMissing) {
                this.title = "A mező kitöltése kötelező!";
                this.setCustomValidity("A mező kitöltése kötelező!");
                this.classList.add("invalid");
            }
            else{
                this.title = "";
                this.setCustomValidity("");
                this.classList.remove("invalid");
            }
        })
    }

    handelMinutesToReadIsNotValidNumberException(){
        let minutesToReadInput =  document.getElementById('minutes-to-read');
        let notValidNumberRegex = new RegExp("^[0+]|[^0-9]");
        minutesToReadInput.addEventListener('input',() => {
            minutesToReadInput.value = minutesToReadInput.value.replace(notValidNumberRegex, '');
        })
    }

    handleMinutesToReadIsNullException(){
         let minutesToReadInput = document.getElementById('minutes-to-read');
         minutesToReadInput.setCustomValidity('A mező kitöltése kötelező!');

         minutesToReadInput.addEventListener('input',() => {
             if(minutesToReadInput.value.length == 0) {
                 minutesToReadInput.title = "A mező kitöltése kötelező!";
                 minutesToReadInput.setCustomValidity("A mező kitöltése kötelező!");
                 minutesToReadInput.classList.add("invalid");
             }
             else{
                 minutesToReadInput.title = "";
                 minutesToReadInput.setCustomValidity("");
                 minutesToReadInput.classList.remove("invalid");
             }
        })
    }

    handleCategoryIsNullException(){
        let categoryInput = document.getElementById('categories');
        categoryInput.setCustomValidity('A mező kitöltése kötelező!');

        categoryInput.addEventListener('input',() => {
             if(categoryInput.value.length == 0) {
                 categoryInput.title = "A mező kitöltése kötelező!";
                 categoryInput.setCustomValidity("A mező kitöltése kötelező!");
                 categoryInput.classList.add("invalid");
             }
             else{
                 categoryInput.title = "";
                 categoryInput.setCustomValidity("");
                 categoryInput.classList.remove("invalid");
             }
        })
    }

    handleFileIsNullException(){
        this.fileInput = document.getElementById('file-input');
        this.fileInput.setCustomValidity('Egy kép feltöltése kötelező!');
        this.fileInput.addEventListener("click", () =>{
            this.isFileUploaded = document.getElementById("file-preview").src !== '';
            console.log(document.getElementById("file-preview").src);
            console.log(this.isFileUploaded)
            if(!this.isFileUploaded){
                document.body.onfocus = () => this.checkIfFileWillBeUpload;
            }
            else{
                this.fileInput.removeAttribute("required");
                this.fileInput.classList.remove("invalid-focus");
            }
        })
    }

    checkIfFileWillBeUpload() {
        let isUserClickedUploadButton = this.fileInput.value.length !== 0;
        this.isFileUploaded = document.getElementById("file-preview").src !== '';
        console.log(isUserClickedUploadButton)
        if (isUserClickedUploadButton || this.isFileUploaded) {
            this.fileInput.title = "";
            this.fileInput.setCustomValidity("");
            this.fileInput.classList.remove("invalid");
                            this.fileInput.classList.remove("invalid-focus");
        }
        else {
            this.fileInput.title = 'Egy kép feltöltése kötelező!';
            this.fileInput.setCustomValidity('Egy kép feltöltése kötelező!');
            this.fileInput.classList.add("invalid");
        }
        document.body.onfocus = null;
    }

    handelContentIsNullException(){
        let editor = document.getElementsByClassName("tox-tinymce")[0];
        let isContentNull = tinymce.activeEditor.getContent() === '';
        if(isContentNull){
            editor.classList.add("invalid");
            editor.title = "A cikk tartalmát kötelező megadni!";
        }
    }

    handelSubmitWithoutFieldFillException(){
        let submitButton = document.getElementById('submit');
        submitButton.addEventListener('click', () =>{
            this.isFileUploaded ? this.fileInput.classList.remove("invalid-focus") : this.fileInput.classList.add("invalid-focus");
        })
    }
}