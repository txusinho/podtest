module.exports = class User {
    constructor({profile, favorites, twoFaStrategy, _id, username, email, permissions, setup, status, devices}) {
        this._profile = profile;
        this._favorites = favorites;
        this._twoFaStrategy = twoFaStrategy;
        this._id = _id;
        this._username = username;
        this._email = email;
        this._permissions = permissions;
        this._setup = setup;
        this._status = status;
        this._devices = devices;
      }

    get permissions(){
        return this._permissions;
    }

    getMainAccountId() {
        return this._permissions[0].accountId;
    }
};