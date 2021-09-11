import { useEffect, useState } from "react";

function useKeyDown(targetKeys: string[]) {
    // State for keeping track of whether key is pressed
    const [keyPressed, setKeyPressed] = useState<string>();
    // If pressed key is our target key then set to true

    // Add event listeners
    useEffect(() => {
      function downHandler(event: KeyboardEvent) {
        if (targetKeys.includes(event.key)) {
          setKeyPressed(event.key);
        }
        else {
          setKeyPressed(undefined);
        }
      }
  
      function upHandler(event: KeyboardEvent) {
        setKeyPressed(undefined);
      }

      window.addEventListener("keydown", downHandler);
      window.addEventListener("keyup", upHandler);
      // Remove event listeners on cleanup
      return () => {
        window.removeEventListener("keydown", downHandler);
        window.removeEventListener("keyup", upHandler);
      };
    }, [targetKeys]); // Empty array ensures that effect is only run on mount and unmount
    return keyPressed;
  }

  export default useKeyDown;