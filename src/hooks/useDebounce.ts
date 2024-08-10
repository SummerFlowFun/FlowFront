import { useEffect, useState } from "react";

export default function useDebounce(inputValue: string, delay: number) {
  const [debouncedInputValue, setDebounceInputValue] = useState(inputValue);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceInputValue(inputValue);
    }, delay);

    return () => clearTimeout(timer);
  }, [inputValue, delay]);

  return debouncedInputValue;
}
