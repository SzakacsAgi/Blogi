class ResponseCodeFamilyIdentifier {

    constructor() { }

    isError(response) {
        return this.isNotSuccessful(response);
    }

    isNotSuccessful(response) {
        return !this.isSuccessful(response);
    }

    isSuccessful(response) {
        let status = response.status;
        return status >= 200 && status <= 299;
    }
}


class QueryParamFormatter {

    constructor() { }

    format(queryParams) {
        let params = new URLSearchParams()
        Object.entries(queryParams).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                value.forEach(value => params.append(key, value.toString()))
            } else {
                params.append(key, value.toString())
            }
        });
        return params.toString()
    }
}

class RESTAPIErrorChecker {

    constructor() { }

    check(response) {
        let responseCodeFamilyIdentifier = new ResponseCodeFamilyIdentifier();
        let isError = responseCodeFamilyIdentifier.isError(response);
        if (isError) {
            let responseError = {
                statusText: response.statusText,
                status: response.status
            };
            throw (responseError);
        }
        return response;
    }
}