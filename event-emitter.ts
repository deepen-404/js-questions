/**
 * A generic event emitter class implementing the Observer pattern.
 * @template TEvent The type of event names, must extend string
 */
class MyEventEmitter<TEvent extends string = string> {
  /**
   * Internal storage for event listeners
   * @private
   */
  #eventListeners: Partial<Record<TEvent, Array<Function>>>;

  constructor() {
    this.#eventListeners = {};
  }

  /**
   * Registers a listener function for a specific event
   * @param event The event name to listen for
   * @param listener The callback function to execute when the event is emitted
   * @returns {boolean} True if the listener was successfully added
   */
  on(event: TEvent, listener: Function): boolean {
    let requiredEvent = this.#eventListeners[event];

    if (!requiredEvent) {
      requiredEvent = [];
      this.#eventListeners[event] = requiredEvent;
    }

    requiredEvent.push(listener);
    return true;
  }

  /**
   * Triggers all listeners for a specific event
   * @param event The event name to emit
   * @param args Additional arguments to pass to the listeners
   * @returns {boolean} True if the event had listeners, false otherwise
   */
  emit(event: TEvent, ...args: Array<unknown>): boolean {
    const listeners = this.#eventListeners[event];

    if (!listeners) return false;

    listeners.forEach((listener) => listener(...args));
    return true;
  }

  /**
   * Removes a specific listener for an event
   * @param event The event name
   * @param listener The callback function to remove
   * @returns {boolean} True if the listener was found and removed, false otherwise
   */
  off(event: TEvent, listener: Function): boolean {
    const listeners = this.#eventListeners[event];

    if (!listeners) return false;

    const updatedListeners = listeners.filter((fxn) => fxn !== listener);
    this.#eventListeners[event] = updatedListeners;
    return true;
  }

  /**
   * Registers a listener that will be called at most once
   * @param event The event name to listen for
   * @param listener The callback function to execute once when the event is emitted
   */
  once(event: TEvent, listener: Function): void {
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
