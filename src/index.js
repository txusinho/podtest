function getParams(){
    if(process.env.NODE_ENV === "production") {
        return require("../secrets_production");
    }
    return require("../secrets_testing");
}
module.exports = function hello() {
    return getParams();
};
