class MyEventEmitter<TEvent extends string = string> {
  #eventListeners: Partial<Record<TEvent, Array<Function>>>;

  constructor() {
    this.#eventListeners = {};
  }

  on(event: TEvent, listener: Function) {
    let requiredEvent = this.#eventListeners[event];

    if (!requiredEvent) {
      requiredEvent = [];
      this.#eventListeners[event] = requiredEvent;
    }

    requiredEvent.push(listener);
    return true;
  }

  emit(event: TEvent, ...args: Array<unknown>) {
    const listeners = this.#eventListeners[event];

    if (!listeners) return false;

    listeners.forEach((listener) => listener(...args));
    return true;
  }

  off(event: TEvent, listener: Function) {
    const listeners = this.#eventListeners[event];

    if (!listeners) return false;

    const updatedListeners = listeners.filter((fxn) => fxn !== listener);
    this.#eventListeners[event] = updatedListeners;
    return true;
  }

  once(event: TEvent, listener: Function) {
    const wrapper = (...args: Array<unknown>) => {
      listener(...args);
      this.off(event, wrapper);
    };

    this.on(event, wrapper);
  }
}

const EVENTS = ['user:signup', 'user:logout'] as const;
type EventT = (typeof EVENTS)[number];

function signup(username: string) {
  return () => console.log(`${username} signed up.`);
}

const myEvent = new MyEventEmitter<EventT>();

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
