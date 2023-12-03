"use client";

import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import React, { useEffect } from "react";

import { Icon } from "@iconify/react";
import { useTodo } from "./functions";

export default function TodoPage() {
  const {
    handleAdd,
    handleChange,
    newTodo,
    todo,
    handleDelete,
    handleKeyDown,
  } = useTodo();

  return (
    <section className="flex flex-col justify-center items-center">
      <h1>To do</h1>
      <section className="w-full grid grid-cols-2 gap-20 mt-20">
        <section className="grid gap-5 h-fit">
          <h5>Add Item</h5>
          <Input
            isClearable
            value={newTodo}
            onChange={(e) => handleChange(e)}
            onKeyDown={(e) => handleKeyDown(e)}
          />
          <Button color="primary" onClick={() => handleAdd(newTodo)}>
            Submit
          </Button>
        </section>
        <section className="grid gap-5 h-fit">
          <h5>Items List</h5>
          <section className="grid">
            {todo.map((item) => {
              return (
                <div
                  key={item.id}
                  className="flex justify-between items-center px-5 py-2 bg-bg-primary rounded-sm"
                >
                  <p className="text-text-primary">{item.name}</p>
                  <div className="flex gap-3">
                    <Icon icon="bx:edit" className="text-2xl icon" />
                    <Icon
                      icon="material-symbols:delete-outline"
                      className="text-2xl icon"
                      onClick={() => handleDelete(item.id)}
                    />
                  </div>
                </div>
              );
            })}
          </section>
        </section>
      </section>
    </section>
  );
}
