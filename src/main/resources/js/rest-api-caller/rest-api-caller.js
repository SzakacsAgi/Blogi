class RESTAPICaller {

    baseURL;
    url;

    constructor(baseURL, resourceName) {
        this.baseURL = baseURL;
        this.url = this.baseURL + resourceName;
    }

    async sendGETSingleRequest(id) {
        let errorChecker = new RESTAPIErrorChecker();

        return await fetch(this.url + "/" + id, { method: 'GET' })
            .then(errorChecker.check)
            .then(response => response.json())
            .then(function (json) {
                return { status: 200, payload: json };
            })
            .catch(function (error) {
                return { status: error.status };
            });
    }

    async sendGETAllRequest(queryParams) {
        let errorChecker = new RESTAPIErrorChecker();
        let queryParamFormatter = new QueryParamFormatter();
        let formattedQueryParams = queryParamFormatter.format(queryParams);

        return await fetch(this.url + "/?" + formattedQueryParams, { method: 'GET' })
            .then(errorChecker.check)
            .then(response => response.json())
            .then(function (json) { return { status: 200, payload: json }; })
            .catch(function (error) {
                return { status: error.status };
            });
    }
}

class ArticleRESTAPICaller extends RESTAPICaller {

    constructor() {
        super('http://localhost:8082/blogi/', 'article');
    }
}