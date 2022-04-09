const { expect } = require("chai");
const filter = require("../../src/filter_assets_with_product");

describe("filterAssetsWithProduct", () => {
    it("returns the correct ones", () => {
        const input = [{
            id: "1",
            "subscriptions": [{ "bundles": [ {
                  "bundleId": "onebundle",
                  "localProductId": "searchingForThis"
                }, {
                    "bundleId": "bundleTwo",
                    "localProductId": "notThisOne"
                  } ] }]
          }, {
            id: "2",
            "subscriptions": [{ "bundles": [ {
                  "bundleId": "onebundle",
                  "localProductId": "nononono"
                }, {
                    "bundleId": "bundleTwo",
                    "localProductId": "notThisOne"
                  } ] }]
          }, {
            id: "3",
            "subscriptions": [{ "bundles": [ {
                  "bundleId": "onebundle",
                  "localProductId": "searchingForThis"
                }, {
                    "bundleId": "bundleTwo",
                    "localProductId": "searchingForThis"
                  } ] }]
        }];
        const result = filter(input, "searchingForThis");
        expect(result).to.deep.equal([input[0], input[2]]);


    });
});