const fetch = require("node-fetch");
const getParams = require("./get_params");

function _createEndpoint(endpoint) {
    const { baseUrl } = getParams();
    return `${baseUrl}${endpoint}`;
}

function getJson(res) {
    return res.text().then(function(body) {
        try {
            return JSON.parse(body);
        } catch (e) {
            throw new Error("Failed to parse response as JSON: " + body);
        }
    });
}

function objectToUriParams(data) {
    if (!Object.keys(data).length) {
        return "";
    }

    return "?" + Object.keys(data).map((key) => {
        return key + "=" + encodeURIComponent(data[key]);
    }).join("&");
}

function ajax(method, endpoint, bodyObj, extraHeaders) {
    let options = {
        method,
        headers: Object.assign({"Content-Type": "application/json; charset=UTF-8"}, extraHeaders)
    };
    if(bodyObj) {
        options.body = JSON.stringify(bodyObj);
    }
    const body = JSON.stringify(bodyObj);
    return fetch(_createEndpoint(endpoint), options).
    then((response) => {
        return Promise.all([response, getJson(response)]).
        then(([response, respData]) => {
            if (!(response.status >= 200 && response.status < 400)) {
                let err = new Error("Unexpected status code: " + response.status + ", Body: " + JSON.stringify(respData));

                if (respData.hasOwnProperty("error")) {
                    Object.assign(err, respData.error);
                }

                throw err;
            }
            return respData;
        });
    });
};

function post(endpoint, bodyObj, extraHeaders){
    return ajax("POST", endpoint, bodyObj, extraHeaders);
}

function get(endpoint, params = {}, extraHeaders = {}) {
    return ajax("get", endpoint + objectToUriParams(params), undefined, extraHeaders);
}

function put(endpoint, bodyObj, extraHeaders){
    return ajax("PUT", endpoint, bodyObj, extraHeaders);
}

module.exports =  { post, get, put };