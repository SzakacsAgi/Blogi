class NewArticlePageEventListeners{

    constructor(){
        this.elementProvider = new ElementProvider();
        this.elementModifier = new ElementModifier();
        this.fileRESTAPICaller = new FileRESTAPICaller();
        this.adminOperationRESTAPICaller = new AdminOperationRESTAPICaller();
        this.requestBodyMaker = new RequestBodyMaker();
        this.articleExceptionHandler = new ArticleExceptionHandler();
    }

    registerEventListeners(){
        this.addFileUploadListener();
        this.addSendContentListener();
        this.addTitleIsNotNullEventListener();
        this.addContentIsNotNullEventListener();
    }

    addFileUploadListener(){
        let fileInput = this.elementProvider.getElementById('file-input');
        let filePreview = this.elementProvider.getElementById('file-preview');
        let fileIsNotValidMessageElement = this.elementProvider.getElementById("fileIsNotValidMessage");
        let file = null;

        fileInput.onchange =  async () =>{
            this.file = fileInput.files[0];
            let isFileSelected = typeof this.file !== 'undefined';
            if(isFileSelected){
                this.elementModifier.removeElementClass(fileInput, ["invalid"]);
                this.elementModifier.hideElement(fileIsNotValidMessageElement);
                await this.fileRESTAPICaller.uploadFile(this.file);
                filePreview.src = ArticleData.imageURL;
            }
        }
    }

    async addSendContentListener(){
        let form = this.elementProvider.getElementById("create-article-form");
        form.addEventListener('submit', async (event) => {
            event.preventDefault();

            let isFileNull = typeof this.file === 'undefined';
            if(isFileNull){
                this.articleExceptionHandler.handleFileIsNullException();
                return;
            }
            let titleIsNull = this.elementProvider.getInputFieldContentById('title') === '';
            if(titleIsNull){
                this.articleExceptionHandler.handleTitleIsNullException();
                return;
            }
            let isContentEmpty = tinymce.activeEditor.getContent() === '';
            if(isContentEmpty){
                 this.articleExceptionHandler.handelContentIsNullException();
                 return;
            }
            let isFileTooBig = this.file.size > 5000000;
            if(isFileTooBig){
                this.articleExceptionHandler.handleFileIsTooBigException();
                return;
            }
            let acceptedFileFormat = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
            let fileFormatIsNotSupported = !acceptedFileFormat.includes(this.file.type);

            if(fileFormatIsNotSupported){
                this.articleExceptionHandler.handleFileFormatIsNotSupported();
                return;
            }

            ArticleData.title = this.elementProvider.getInputFieldContentById('title');
            ArticleData.author = AuthenticatedUserInfo.name;
            let categories = this.elementProvider.getInputFieldContentById('categories');
            ArticleData.categories = Array.from(new Set(categories.split('\n').filter(category => category !== "")));
            ArticleData.content = tinymce.activeEditor.getContent();
            ArticleData.minutesToRead = this.estimateReadingTime();

            let body = this.requestBodyMaker.makeRequestBodyToCreateArticle();
            await this.adminOperationRESTAPICaller.createArticle(body);
        })
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
        })
    }

    addContentIsNotNullEventListener(){
        let editorElement = this.elementProvider.getElementByClassName("tox-tinymce");
        let contentIsNullError = this.elementProvider.getElementById('contentIsNullMessage');
        tinymce.activeEditor.getBody().addEventListener('keydown', () =>{
            this.elementModifier.removeElementClass(editorElement, ["invalid"]);
            this.elementModifier.hideElement(contentIsNullError);
        });
    }

}