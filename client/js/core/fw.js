import {
    Attributes
} from 'js/core/attributes';
import $ from 'jquery';
import {
    dailyStore
} from 'js/stores/dailyStore';
class FWClass extends Attributes {
    constructor() {
        super()
    }

}

if (!window.FW) {
    window.FW_CONFIG = {};
    window.FW = new FWClass();
    window.FW.config = window.FW_CONFIG;
    window.FW.on('changeUser', function (data) {
        var userChanged = data.user.id !== window.DAILY_USER.id;
        if (userChanged) {
            window.localStorage.removeItem('formData');
        }
        window.DAILY_USER = data.user;
        window.FW_MODULE_CONFIG = data.moduleConfigs;
        window.activeProfile = data.activeProfile;
        window.reportTypes = data.reportTypes;
        window.multistore = undefined;
        if (data.moduleConfigs && data.moduleConfigs.multistore) {
            window.multistore = data.moduleConfigs.multistore.members;
        }
        window.DAILY_CLIENT = data.client;
        window.userId = data.user.id;
        dailyStore.set('clientData', data);
        if (data.client) {
            dailyStore.set('client', data.client);
        }
        if (data.dailyClient) {
            dailyStore.set('dailyClient', data.dailyClient);
        }
    });
}

let FW = window.FW;
export {
    FW
};