"use client";

import { Button } from "@nextui-org/react";

import { useCounter } from "./functions";

export default function CounterPage() {
  const {
    counter,
    handleIncrementCounter,
    handleDecrementCounter,
    handleResetCounter,
  } = useCounter();

  return (
    <section className="min-h-screen flex flex-col justify-center items-center gap-20">
      COUNTER: {counter}
      <div className="flex gap-5">
        <Button onClick={handleIncrementCounter}>Increment</Button>
        <Button onClick={handleDecrementCounter}>Decrement</Button>
        <Button onClick={handleResetCounter}>Reset</Button>
      </div>
    </section>
  );
}
