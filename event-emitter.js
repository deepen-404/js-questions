var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _MyEventEmitter_eventListeners;
class MyEventEmitter {
    constructor() {
        _MyEventEmitter_eventListeners.set(this, void 0);
        __classPrivateFieldSet(this, _MyEventEmitter_eventListeners, {}, "f");
    }
    on(event, listener) {
        let requiredEvent = __classPrivateFieldGet(this, _MyEventEmitter_eventListeners, "f")[event];
        if (!requiredEvent) {
            requiredEvent = [];
            __classPrivateFieldGet(this, _MyEventEmitter_eventListeners, "f")[event] = requiredEvent;
        }
        requiredEvent.push(listener);
        return true;
    }
    emit(event, ...args) {
        const requiredEvent = __classPrivateFieldGet(this, _MyEventEmitter_eventListeners, "f")[event];
        if (!requiredEvent)
            return false;
        requiredEvent.forEach((listener) => listener(...args));
        return true;
    }
    off(event, listener) {
        const listeners = __classPrivateFieldGet(this, _MyEventEmitter_eventListeners, "f")[event];
        if (!listeners)
            return false;
        const updatedListeners = listeners.filter((fxn) => fxn !== listener);
        __classPrivateFieldGet(this, _MyEventEmitter_eventListeners, "f")[event] = updatedListeners;
        return true;
    }
    once(event, listener) {
        const wrapper = (...args) => {
            listener(...args);
            this.off(event, wrapper);
        };
        this.on(event, wrapper);
    }
}
_MyEventEmitter_eventListeners = new WeakMap();
const EVENTS = ['user:signup', 'user:logout'];
function signup(username) {
    return () => console.log(`${username} signed up.`);
}
const myEvent = new MyEventEmitter();
const deepenListener = signup('deepen');
const bidanListener = signup('bidhan');
const shaileshListener = signup('shailesh');
const sanjayListener = signup('sanjay');
myEvent.on('user:signup', deepenListener);
myEvent.on('user:signup', bidanListener);
myEvent.on('user:signup', shaileshListener);
myEvent.once('user:signup', sanjayListener);
myEvent.emit('user:signup');
myEvent.off('user:signup', shaileshListener);
myEvent.emit('user:signup');
