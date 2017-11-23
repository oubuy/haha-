import EventEmitter from 'eventemitter3';

class Attributes extends EventEmitter {
    constructor() {
        super();
        this._attrs = {};
    }
    getAttributes() {
        return this._attrs;
    }
    get(attr) {
        return this._attrs[attr];
    }
    set(key, val) {
        var self = this,
            attrs = {};
        if (typeof key === 'object') {
            attrs = key;
        } else {
            attrs[key] = val;
        }
        var curVal, changed, newVal;
        for (key in attrs) {
            if (attrs.hasOwnProperty(key)) {
                curVal = self._attrs[key];
                newVal = attrs[key];
                if (curVal !== newVal) {
                    self._attrs[key] = newVal;
                }
            }
        }
    }
    unset(attr, opts) {
        this.set(attr, undefined, opts);
    }
    clear(opts) {
        var key, attrs = {},
            self = this;
        for (key in self._attrs) {
            if (self._attrs.hasOwnProperty(key)) {
                attrs[key] = undefined;
            }

        }
        this.set(attrs, opts);
    }
    toJSON() {
        return this._attrs;
    }

}

export {Attributes}