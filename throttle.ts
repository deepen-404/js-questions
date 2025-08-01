function throttle<T extends (...args: any[]) => void>(
  callback: T,
  delay: number
) {
  let timerId: ReturnType<typeof setTimeout> | undefined;

  function throttledCallback(...args: Parameters<T>) {
    if (timerId) return;

    timerId = setTimeout(() => {
      callback(...args);
      timerId = undefined;
    }, delay);
  }

  return throttledCallback;
}

const logMsg = (msg: string) => console.log('Logged:', msg);

const throttledLogMsg = throttle(logMsg, 1000);

throttledLogMsg('First');
throttledLogMsg('Second');
throttledLogMsg('Third');
