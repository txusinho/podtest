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

module.exports = function post(endpoint, bodyObj, extraHeaders) {
    const headers = Object.assign({"Content-Type": "application/json; charset=UTF-8"}, extraHeaders);
    const body = JSON.stringify(bodyObj);
    return fetch(_createEndpoint(endpoint), {
        method: "POST",
        body,
        headers
    }).then((response) => {
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