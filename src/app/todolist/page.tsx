"use client";

import ErrorComponent from "../todo/components/Error";
import LoadingComponent from "../todo/components/Loading";
import { useTanstack } from "../todo/functions/tanstack";

export default function TodoList() {
  const { query } = useTanstack();
  const { data, isPending: isLoading, isError } = query;

  if (isError) {
    return <ErrorComponent />;
  }

  if (isLoading) {
    return <LoadingComponent />;
  }

  return (
    <section className="flex flex-col justify-center items-center">
      <h1>LIST</h1>
      <ul className="mt-5">
        {data?.map((item) => {
          return <li key={item?.id}>{item?.name}</li>;
        })}
      </ul>
    </section>
  );
}
