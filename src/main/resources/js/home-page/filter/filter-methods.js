class FilterMethods {

    orderFields;
    orderDirectionFields;
    categoryOptions;

    filterFieldProvider = new FilterFieldProvider();

    initOrderRelatedAndCategoryFields = this.#initOrderRelatedAndCategoryFields();
    orderField = this.filterFieldProvider.getSelectedOrderOption(this.orderFields);
    orderDirection = this.filterFieldProvider.getSelectedOrderOption(this.orderDirectionFields);
    authorName = this.filterFieldProvider.getFilteredAuthorName();
    lastModificationDateRangeStart = this.filterFieldProvider.getLastModificationDateRange('start');
    lastModificationDateRangeEnd = this.filterFieldProvider.getLastModificationDateRange('end');
    minutesToReadCondition = this.filterFieldProvider.getMinutesToReadCondition();
    minutesToMinutesToReadCondition = this.filterFieldProvider.getMinutesToMinutesToReadCondition();
    selectedCategory = this.filterFieldProvider.getSelectedCategory(this.categoryOptions);

    constructor() {}

    filterQueryParams = {
        orderField: '',
        orderDirection: '',
        filterByAuthorName: '',
        filterByLastModificationDateRangeStart: '',
        filterByLastModificationDateRangeEnd: '',
        filterByMinutesToReadLessThan: '',
        filterByMinutesToReadMoreThan: '',
        filterByMinutesToReadEqualTo: '',
        filterByCategory: ''
    }

    #initOrderRelatedAndCategoryFields(){
        this.orderFields = document.querySelectorAll(".order-by .form-check input");
        this.orderDirectionFields = document.querySelectorAll(".order-direction .form-check input");
        this.categoryOptions = document.querySelectorAll("#category-options .col .form-check input");
    }

    getFilterQueryParams() {
        this.setFilterQueryParams();
        this.deleteUnnecessaryFields();
        return this.filterQueryParams;
    }

    deleteUnnecessaryFields(){
        Object.entries(this.filterQueryParams).forEach(([key,value]) => {
            if(value == '' || value == []){
                delete this.filterQueryParams[key];
             }
        });
    }

    setFilterQueryParams() {
        this.filterQueryParams.orderField = this.orderField;
        this.filterQueryParams.orderDirection = this.orderDirection;
        this.filterQueryParams.filterByAuthorName = this.authorName;
        this.filterQueryParams.filterByLastModificationDateRangeStart = this.lastModificationDateRangeStart;
        this.filterQueryParams.filterByLastModificationDateRangeEnd = this.lastModificationDateRangeEnd;
        this.setMinutesToReadFilterQueryParams();
        this.filterQueryParams.filterByCategory = this.selectedCategory;
    }

    setMinutesToReadFilterQueryParams() {
        this.filterQueryParams[this.minutesToReadCondition] = this.minutesToMinutesToReadCondition;
    }

    resetFilters() {
        this.resetInputFieldsWithoutDefaultValues();
        this.resetInputFieldsWithtDefaultValues();
    }

    resetInputFieldsWithoutDefaultValues(){
        let filterBody = document.getElementsByClassName('filter-body')[0];
        let filterBodyInputFields = filterBody.querySelectorAll('input');
        filterBodyInputFields.forEach(inputField =>{
            if(inputField.type != 'radio'){
                inputField.checked = false;
                inputField.value = '';
            }
        })
    }

    resetInputFieldsWithtDefaultValues(){
        let defaultValues = document.getElementsByClassName("default");
        let select = document.getElementById("minutes-to-read-select");
        for (const defaultValue of defaultValues) {
            defaultValue.checked = true;
            if (defaultValue.hasAttribute("selected")) {
                select.value = defaultValue.value;
            }
        }
    }

}