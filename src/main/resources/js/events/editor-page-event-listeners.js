class EditorPageEventListeners{
    constructor(){
        this.storedDataProvider = new StoredDataProvider();
        this.elementProvider = new ElementProvider();
        this.elementModifier = new ElementModifier();
        this.fileRESTAPICaller = new FileRESTAPICaller();
        this.articleRESTAPICaller = new ArticleRESTAPICaller();
        this.requestBodyMaker = new RequestBodyMaker();
        this.articleExceptionHandler = new ArticleExceptionHandler();
        this.globalErrorMessageField = this.elementProvider.getElementById("errorMessage");
    }

    registerEventListeners(){
        this.addFileUploadListener();
        this.addSendContentListener();
        this.addTitleIsNotNullEventListener();
        this.addContentIsNotNullEventListener();
    }

    addFileUploadListener(){
        let fileInput = this.elementProvider.getElementById('file-input');
        this.filePreview = this.elementProvider.getElementById('file-preview');
        let fileIsNotValidMessageElement = this.elementProvider.getElementById("fileIsNotValidMessage");
        let file = null;
        this.maxSize = 5 * 1024 * 1024;

        fileInput.onchange =  async () =>{
            this.file = fileInput.files[0];
            this.elementModifier.hideElement(this.globalErrorMessageField);
            let isFileSelected = typeof this.file !== 'undefined';
            if(isFileSelected){
                let acceptedFileFormat = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
                let fileFormatIsNotSupported = !acceptedFileFormat.includes(this.file.type);
                if(fileFormatIsNotSupported){
                    this.articleExceptionHandler.handleFileFormatIsNotSupported();
                    this.filePreview.src = "";
                    return;
                }
                let isFileTooBig = this.file.size > this.maxSize;
                if(isFileTooBig){
                    this.articleExceptionHandler.handleFileIsTooBigException();
                    this.filePreview.src = "";
                    return;
                }
                this.elementModifier.removeElementClass(fileInput, ["invalid"]);
                this.elementModifier.hideElement(fileIsNotValidMessageElement);
                await this.fileRESTAPICaller.uploadFile(this.file);
                this.filePreview.src = ArticleData.imageURL;
            }
        }
    }

    async addSendContentListener() {
        let form = this.elementProvider.getElementById("update-article-form");
        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            if(this.isFormValid()) {
                this.setArticleData();
                let body = this.requestBodyMaker.makeRequestBodyToUpdateArticle();
                let articleId = this.storedDataProvider.getItemFromSessionStorage("articleId");
                await this.articleRESTAPICaller.updateArticle(articleId, body);
            }
        });
    }

    isFormValid() {
        let titleIsNull = this.elementProvider.getInputFieldContentById('title') === '';
        if (titleIsNull) {
            this.articleExceptionHandler.handleTitleIsNullException();
            return false;
        }

        let currentImageURL = this.storedDataProvider.getItemFromSessionStorage("currentImageURL");
        let fileWasChanged = this.filePreview.src !== currentImageURL;
        if(fileWasChanged){
            let isFileNull = typeof this.file === 'undefined';
            if (isFileNull) {
                this.articleExceptionHandler.handleFileIsNullException();
                return false;
            }

            let acceptedFileFormat = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
            let fileFormatIsNotSupported = !acceptedFileFormat.includes(this.file.type);
            if (fileFormatIsNotSupported) {
                this.articleExceptionHandler.handleFileFormatIsNotSupported();
                this.elementModifier.setElementText(this.globalErrorMessageField, "A megadott fájl formátum nem támogatott!<br> A támogatott formátumok: jpeg, jpg, png, gif");
                this.elementModifier.displayElement(this.globalErrorMessageField);
                return false;
            }

            let isFileTooBig = this.file.size > this.maxSize;
            if (isFileTooBig) {
                this.articleExceptionHandler.handleFileIsTooBigException();
                this.elementModifier.setElementText(this.globalErrorMessageField, "A megadott fájl túl nagy, maximum 5MB lehet!");
                this.elementModifier.displayElement(this.globalErrorMessageField);
                return false;
            }
        }
        else{
            ArticleData.imageURL = currentImageURL;
        }

        let isContentEmpty = tinymce.activeEditor.getContent() === '';
        if (isContentEmpty) {
             this.articleExceptionHandler.handelContentIsNullException();
             return false;
        }

        this.elementModifier.hideElement(this.globalErrorMessageField);

        return true;
    }

    setArticleData(){
        ArticleData.title = this.elementProvider.getInputFieldContentById('title');
        ArticleData.author = AuthenticatedUserInfo.name;
        let categories = this.elementProvider.getInputFieldContentById('categories');
        ArticleData.categories = Array.from(new Set(categories.split('\n').filter(category => category !== "")));
        ArticleData.content = tinymce.activeEditor.getContent();
        ArticleData.minutesToRead = this.estimateReadingTime();
    }

    estimateReadingTime() {
        let wordsPerMinute = 200;
        let text = tinymce.activeEditor.getContent({format : 'text'})
        const words = text.split(/\s+/).length;
        const minutes = Math.ceil(words / wordsPerMinute);
        return minutes;
    }

    addTitleIsNotNullEventListener(){
        let titleInput = this.elementProvider.getElementById('title');
        let titleIsNotValidMessageElement = this.elementProvider.getElementById("titleIsNotValidMessage");
        titleInput.addEventListener("input", () => {
            this.elementModifier.removeElementClass(titleInput, ["invalid"]);
            this.elementModifier.hideElement(titleIsNotValidMessageElement);
            this.elementModifier.hideElement(this.globalErrorMessageField);
        })
    }

    addContentIsNotNullEventListener(){
        let editorElement = this.elementProvider.getElementByClassName("tox-tinymce");
        let contentIsNullError = this.elementProvider.getElementById('contentIsNullMessage');
        tinymce.activeEditor.getBody().addEventListener('keydown', () =>{
            this.elementModifier.removeElementClass(editorElement, ["invalid"]);
            this.elementModifier.hideElement(contentIsNullError);
            this.elementModifier.hideElement(this.globalErrorMessageField);
        });
    }
}