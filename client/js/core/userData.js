let storege = window.localStorage;

class UserData {
    constructor() {
        this._data = storege.getItem('userData');
        console.log(this._data)
        if (!this._data) {
            this._data = {};
            storege.setItem('userData', JSON.stringify(this._data));
        } else {
            try {
                this._data = JSON.parse(this._data);
            } catch (error) {
                this._data = {};
                storege.setItem('userData', JSON.stringify(this._data));
            }
        }
    }
    get = () => {
        return this._data;
    }

    getKey = (key) => {
        return this._data.key;
    }

    set = (key, value) => {
        this._data[key] = value;
        storege.setItem('userData', JSON.stringify(this._data));
    }

    clear = () => {
        this._data = {};
        storage.setItem('userData', {});
    }
}


if (!window.userData) {
    window.userData = new UserData();
}
let userData = window.userData;

export {
    userData
}