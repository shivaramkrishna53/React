import { useState, useEffect } from "react";
export function useLocalStorageState(initialState, key) {
  const [value, setValue] = useState(function () {
    const datafromlocalstorage = localStorage.getItem(key);
    return datafromlocalstorage
      ? JSON.parse(datafromlocalstorage)
      : initialState;
  });

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key]
  );
  return [value, setValue];
}
