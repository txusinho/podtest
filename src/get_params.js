const BASE_URL = "https://hummingbird-staging.podgroup.com";
const PRODUCTION = require("../secrets_production");
const TESTING = require("../secrets_testing");

function getParams(){
    if(process.env.NODE_ENV === "production") {
        return PRODUCTION;
    }
    return TESTING;
}

module.exports = function() {
    const base = { baseUrl: BASE_URL };
    return Object.assign(base, getParams());

};
