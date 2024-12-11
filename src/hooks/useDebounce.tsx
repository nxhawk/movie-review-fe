import { useEffect, useState } from "react";

interface Props<T> {
  value: T;
  delay: number;
}

const useDebounce = <T,>({ value, delay = 500 }: Props<T>) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(id);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
