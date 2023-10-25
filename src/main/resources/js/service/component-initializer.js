class ComponentInitializer{

    constructor(){
        this.elementProvider = new ElementProvider();
        this.articleRESTAPICaller = new ArticleRESTAPICaller();
    }

    async init(){
        this.#initCategoriesInputField();
    }

     async #initCategoriesInputField(){
         const categoriesInputField = this.elementProvider.getElementById('categories');
         const autocompleteList = this.elementProvider.getElementById('autocomplete-list');
         let categories = await this.articleRESTAPICaller.getAllCategories();

         categoriesInputField.addEventListener('input', function () {
         autocompleteList.innerHTML = '';
         const lines = this.value.split('\n');
         const currentLine = lines[lines.length - 1].trim().toLowerCase();
         const filteredData = categories.filter(item => item.toLowerCase().includes(currentLine));

             filteredData.forEach(item => {
                 const listItem = document.createElement('li');
                 listItem.textContent = item;
                 listItem.addEventListener('click', function () {
                     lines[lines.length - 1] = item;
                     categoriesInputField.value = lines.join('\n');
                     autocompleteList.innerHTML = '';
                 });
                 autocompleteList.appendChild(listItem);
             });

             if (filteredData.length > 0) {
                 autocompleteList.style.display = 'block';
             } else {
                 autocompleteList.style.display = 'none';
               }
         });

         document.addEventListener('click', function (e) {
             if (!autocompleteList.contains(e.target) && e.target !== categoriesInputField) {
                 autocompleteList.style.display = 'none';
             }
         });
     }
}