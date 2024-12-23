import { useEffect } from "react";

export function useKey(key, action) {
  useEffect(
    function () {
      const EscapeHandler = (e) => {
        if (e.code.toLowerCase() === key.toLowerCase()) {
          action();
        }
      };
      document.addEventListener("keydown", EscapeHandler);

      return function () {
        document.removeEventListener("keydown", EscapeHandler);
      };
    },
    [action, key]
  );
}
