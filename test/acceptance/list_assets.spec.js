const { expect } = require("chai");
const listAssets = require("../../src/list_assets");

describe("listAssets", () => {
    it("calls correctly the endpoint", () => {
        return listAssets().then(response => {
            console.log(response);
            response.forEach(asset => {
                console.log("////////");
                console.log(asset.subscriptions);
            });
            expect(response.length).to.equal(10);
            expect(response[0].iccid).to.exist;
        });
    });
});