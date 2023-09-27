class NewArticlePageExceptionHandler{

    constructor(){}

    registerExceptionHandlers(){
        this.handleTitleIsNullException();
        this.handelMinutesToReadIsNotValidNumberException();
        this.handleMinutesToReadIsNullException();
        this.handleCategoryIsNullException();
        this.handleFileIsNullException();
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
        let fileInput =  document.getElementById('file-input');
        fileInput.setCustomValidity('Egy kép feltöltése kötelező!');
        fileInput.addEventListener("click", () =>{
            let isSubmitWithoutFileUpload = document.getElementById("file-preview").src === '';
            if(isSubmitWithoutFileUpload){
                document.body.onfocus = this.checkIt;
            }
        })
    }

    checkIt() {
        let fileInput =  document.getElementById('file-input');
        if (fileInput.value.length) {
            fileInput.title = "";
            fileInput.setCustomValidity("");
            fileInput.classList.remove("invalid");
        }
        else {
            fileInput.title = 'Egy kép feltöltése kötelező!';
            fileInput.setCustomValidity('Egy kép feltöltése kötelező!');
            fileInput.classList.add("invalid");
        }
        document.body.onfocus = null;
    }
}