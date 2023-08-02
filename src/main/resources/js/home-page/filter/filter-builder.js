class FilterBuilder {

    elementCreator;
    elementModifier;
    category;
    checkboxAndCategoryNameContainer;
    checkbox;
    categoryName;
    mainParents;
    parentId;

    constructor() {
        this.elementCreator = new ElementCreator();
        this.elementModifier = new ElementModifier();
        let filterBody = document.getElementsByTagName("filter-body-part")[0];
        this.mainParents = filterBody.querySelectorAll(".category-col");
    }

    build(category, parentId) {
        this.category = category;
        this.parentId = parentId;
        this.buildCategoryPart();
    }

    buildCategoryPart() {
        this.createFilterCategoryComponents();
        this.addElementsToFilter();
        this.setFilterCategoryData();
    }

    createFilterCategoryComponents() {
        this.checkboxAndCategoryNameContainer = this.elementCreator.createElement('div', ['form-check', 'col-auto', 'checkbox-and-category-name-container']);
        this.checkbox = this.elementCreator.createElement('input', ['form-check-input']);
        this.elementModifier.setElementAttributes(this.checkbox, { 'type': 'checkbox', 'category-name': this.category });
        this.categoryName = this.elementCreator.createElement('div');
    }

    addElementsToFilter() {
        this.checkboxAndCategoryNameContainer.appendChild(this.checkbox);
        this.checkboxAndCategoryNameContainer.appendChild(this.categoryName);
        this.mainParents[this.parentId].appendChild(this.checkboxAndCategoryNameContainer);
    }

    setFilterCategoryData() {
        this.categoryName.innerHTML = this.category;
    }

}