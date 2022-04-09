const { v4: uuid } = require("uuid");
const { createUsers } = require("../../src/create_users");

describe("createUsers", () => {
  describe("#createUsers", () => {

    let newUsers, userOkResult;
    beforeEach(() => {
        newUsers = [{
            "accountId": "parent",
            "username": `chiquito_${uuid()}`,
            "password": "fistro",
            "email": "grijander@hamatoma.net",
            "status": "inactive",
            "roles": ["admin"],
          }, {
            "accountId": "parent",
            "username": `jose_mota_${uuid()}`,
            "password": "oyoyoy",
            "email": "josemota@risas.net",
            "status": "active",
            "roles": ["admin"],
          }];

        userOkResult = {
            "_id": "newOne",
            "username": "chiquito",
            "email": "fistro",
            "lastAccess": "string",
            "status": "inactive",
            "permissions": [
              {
                "accountId": "noidea",
                "roles": [
                  "admin"
                ]
              }
            ],
            "favorites": {
              "disims": [
                "string"
              ],
              "summaries": [
                "string"
              ],
              "billing": [
                "string"
              ],
              "users": [
                "string"
              ],
              "products": [
                "string"
              ],
              "accounts": [
                "string"
              ],
              "assets": [
                "string"
              ],
              "imsis": [
                "string"
              ]
            },
            "profile": {
              "picture": "string",
              "language": "string",
              "timezone": "string"
            }
          };
    });
    it("calls correctly the endpoint", () => {
        return createUsers(newUsers).then(response => {
            expect(response[0].username).to.equal(newUsers[0].username);
        });
    });
  });
});