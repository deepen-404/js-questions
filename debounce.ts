function debounce<T extends (...args: any[]) => void>(
  callback: T,
  delay: number
) {
  let timerId: ReturnType<typeof setTimeout> | undefined;

  function debouncedCallback(...args: Parameters<T>) {
    if (timerId) clearTimeout(timerId);
    timerId = setTimeout(() => {
      callback(...args);
      timerId = undefined;
    }, delay);
  }

  return debouncedCallback;
}

const log = (msg: string) => console.log('Logged:', msg);

const debouncedLog = debounce(log, 1000);

debouncedLog('First');
debouncedLog('Second');
debouncedLog('Third');
