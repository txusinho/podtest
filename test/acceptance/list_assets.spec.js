const { expect } = require("chai");
const listAssets = require("../../src/list_assets");

describe("listAssets", () => {
    it("calls correctly the endpoint", () => {
        return listAssets().then(response => {
            expect(response.length).to.equal(10);
            expect(response[0].iccid).to.exist;
        });
    });
});