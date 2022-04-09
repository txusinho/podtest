const getParams = require("../../src/get_params");
const activateAsset = require("../../src/activate_asset");
const { expect } = require("chai");

describe("activateAsset", () => {
    let assetId, productId;
    beforeEach(() => {
        productId = "624aac4591bf0b1a16402587";
        assetId = "txus.ordorika9";
    });
    it("calls correctly the endpoint", () => {
        return activateAsset(assetId, productId).then(response => {
            expect(response.iccid).to.equal(assetId);
        }).catch(error => {
            expect(error.message).to.equal("Unexpected status code: 500, Body: {\"code\":\"Internal\",\"message\":\"Asset already subscribed: txus.ordorika9\"}");
        });
    });
});