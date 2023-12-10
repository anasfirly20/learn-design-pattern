"use client";

// Next ui
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";

// Functions
import { useTodo } from "./functions";

// Miscellaneous
import { v4 as uuidv4 } from "uuid";
import { Icon } from "@iconify/react";

// Components
import LoadingComponent from "./components/Loading";
import ErrorComponent from "./components/Error";

export default function TodoPage() {
  const {
    newTodo,
    isEdit,
    selectedTodo,
    setSelectedTodo,
    toggleEdit,
    data,
    isPending,
    isError,
    dataEdit,
    setDataEdit,
    handleChange,
    handleMutation,
  } = useTodo();

  return (
    <section className="flex flex-col justify-center items-center">
      <h1>To do</h1>
      <section className="w-full grid grid-cols-2 gap-20 mt-20">
        <section className="grid gap-5 h-fit">
          <h5>Add Item</h5>
          <Input
            value={newTodo}
            onChange={(e) => handleChange(e)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleMutation("add", {
                  id: uuidv4(),
                  name: newTodo,
                  completed: false,
                });
              }
            }}
            data-testid="todo-input"
          />
          <Button
            color="primary"
            onClick={() =>
              handleMutation("add", {
                id: uuidv4(),
                name: newTodo,
                completed: false,
              })
            }
            data-testid="add-todo"
          >
            Submit
          </Button>
        </section>
        <section className="grid gap-5 h-fit">
          <h5>Items List</h5>
          {isPending && <LoadingComponent />}
          {isError && <ErrorComponent />}
          {data && data?.length > 0 && !isError && (
            <ul className="grid" data-testid="todo-list">
              {data?.map((item) => {
                const selectedItem = item?.id === selectedTodo;
                return (
                  <li
                    key={item.id}
                    className="flex justify-between items-center px-5 py-2 bg-bg-primary rounded-sm border border-bg-secondary"
                  >
                    {isEdit && selectedItem ? (
                      <Input
                        value={dataEdit}
                        className="w-[90%]"
                        onChange={(e) => handleChange(e)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleMutation("edit", {
                              id: item?.id,
                              name: dataEdit,
                              completed: false,
                            });
                          }
                        }}
                      />
                    ) : (
                      <p className="text-text-primary">{item?.name}</p>
                    )}
                    <div className="flex gap-3">
                      {isEdit && selectedItem && (
                        <Icon
                          icon="ic:baseline-done"
                          className="text-2xl icon"
                          onClick={() => {
                            handleMutation("edit", {
                              id: item?.id,
                              name: dataEdit,
                            });
                          }}
                        />
                      )}
                      {!isEdit && (
                        <>
                          <Icon
                            icon="bx:edit"
                            className="text-2xl icon"
                            onClick={() => {
                              setSelectedTodo(item?.id);
                              setDataEdit(item?.name);
                              toggleEdit();
                            }}
                          />
                          <Icon
                            icon="material-symbols:delete-outline"
                            className="text-2xl icon"
                            onClick={() => handleMutation("delete", item?.id)}
                            data-testid={`delete-todo-${item.id}`}
                          />
                        </>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
          {data?.length === 0 && (
            <p className="text-text-secondary">No items</p>
          )}
        </section>
      </section>
    </section>
  );
}
