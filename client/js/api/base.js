import $ from 'jquery';
import {
    userData
} from 'js/core/userData';

let api = function (route, data, cb) {
    let udata = userData.get(),
        str = '';
    if (udata.sid) {
        str = '?sid=' + udata.sid;
    }
    let url = route + str;
    if (!cb) {
        cb = data;
        data = {};
    }
    console.info('发送', url, data);
    window.fetch('http://localhost:4202/' + url, {
        method: "post",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(data),
    }).then(function (response) {
        return response.json();
    }).then((res) => {
        let errStr = 'err(' + res.err + ')';
        if (res.err && window.errMap) {
            let errMap = window.errMap;
            if (errMap[route] && parseInt(res.err) < 100) {
                let errMsg = errMap[route][res.err];
                errStr = 'err(' + res.err + '):' + errMsg;
            } else {
                let errMsg = errMap['getErrMap'][res.err];
                errStr = 'err(' + res.err + '):' + errMsg;
            }
            console.info('接受', url, errStr);
        } else {
            console.info('接受', url, errStr, res.data);
        }

        cb(res.err, res.data);
    })
}
export {
    api
};