const fetch = require("node-fetch");
const getParams = require("./get_params");
const post = require("./post");

module.exports = function userValidation() {
    const { username, password } = getParams();
    const body = {username, password};

    const endpoint = "/auth/token";
    return post(endpoint, body);
};