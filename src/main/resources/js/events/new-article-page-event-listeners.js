class NewArticleEventListeners{

    constructor(){
        this.storedDataProvider = new StoredDataProvider();
        this.elementProvider = new ElementProvider();
        this.fileRESTAPICaller = new FileRESTAPICaller();
        this.adminOperationRESTAPICaller = new AdminOperationRESTAPICaller();

    }

    registerEventListeners(){
        this.addFileUploadListener();
        this.addSendContentListener();
    }

    addFileUploadListener(){
        let fileInput = this.elementProvider.getElementById('file-input');
        let filePreview = this.elementProvider.getElementById('file-preview');
        let file = null;

        fileInput.onchange =  async () =>{
            file = fileInput.files[0];
            let isFileSelected = typeof file !== 'undefined';
            if(isFileSelected){
                await this.fileRESTAPICaller.uploadFile(file);
                filePreview.src = NewArticleData.imageURL;
            }

        }
    }

    async addSendContentListener(){
        document.getElementById("create-article-form").addEventListener('submit', async () => {
            event.preventDefault();
            NewArticleData.title = this.elementProvider.getElementById('title').value;
            NewArticleData.author = AuthenticatedUserInfo.name;
            NewArticleData.categories = ["test", "test4"]
            NewArticleData.content = tinymce.activeEditor.getContent();
            NewArticleData.minutesToRead = this.elementProvider.getElementById('minutes-to-read').value;
            let body =
            JSON.stringify({
                          title: NewArticleData.title,
                          authorName: "NewArticleData.author",
                          minutesToRead: NewArticleData.minutesToRead,
                          content: NewArticleData.content,
                          imageURL: NewArticleData.imageURL,
                          categories: NewArticleData.categories,
                          summary: {
                            content: "",
                            imageURL: NewArticleData.imageURL
                          }
                        })

            console.log("Submit");
            await this.adminOperationRESTAPICaller.createArticle(body);


        })
    }

}