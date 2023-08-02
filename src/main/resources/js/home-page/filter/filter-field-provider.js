class FilterFieldProvider {

    constructor(){}

    getSelectedOrderOption(inputFields) {
        let id;
        inputFields.forEach(inputField => {
            if (inputField.checked) {
                id = inputField.id;
            };
        })
        return id;
    }

    getFilteredAuthorName() {
        return document.getElementById("author-search-bar").value;
    }

    getLastModificationDateRange(value) {
        return document.getElementById("modification-date-range-" + value).value;
    }

    getMinutesToReadCondition() {
        return document.getElementById("minutes-to-read-select").selectedOptions[0].id;
    }

    getMinutesToMinutesToReadCondition() {
        return document.getElementById("how-many-minutes").value;
    }

    getSelectedCategory(categoryOptions) {
        let selectedCategory = [];
        categoryOptions.forEach(category => {
            if (category.checked) {
                selectedCategory.push(category.getAttribute("category-name"));
            }
        });
        return selectedCategory;
    }

}