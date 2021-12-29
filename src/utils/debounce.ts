export function debounce(f: (...args: any) => void, delay: number = 100) {
  let timerId: ReturnType<typeof setTimeout>;

  return function (...args: any) {
    if (timerId) return;
    
    timerId = setTimeout(() => {
      f(...args);
      clearTimeout(timerId);
    }, delay);
  };
}

