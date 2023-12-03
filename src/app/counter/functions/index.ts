import { useState } from "react";

export const useCounter = () => {
  const [counter, setCounter] = useState(0);

  const handleIncrementCounter = () => {
    setCounter((c) => c + 1);
  };

  const handleDecrementCounter = () => {
    setCounter((c) => c - 1);
  };

  const handleResetCounter = () => {
    setCounter(0);
  };

  return {
    counter,
    handleIncrementCounter,
    handleDecrementCounter,
    handleResetCounter,
  };
};
