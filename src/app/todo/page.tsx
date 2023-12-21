"use client";

// Next ui
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";

// Functions
import { useTraditional } from "./functions/traditional";
import { useTanstack } from "./functions/tanstack";

// Miscellaneous
import { v4 as uuidv4 } from "uuid";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";

// Components
import LoadingComponent from "./components/Loading";
import ErrorComponent from "./components/Error";

export default function TodoPage() {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [selectedTodo, setSelectedTodo] = useState<string | null>(null);

  const [newTodo, setNewTodo] = useState<TTodo>({
    id: uuidv4(),
    name: "",
    completed: false,
  });

  const [dataEdit, setDataEdit] = useState<TTodo>({
    name: "",
    id: "",
    completed: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (isEdit) {
      setDataEdit({ ...dataEdit, name: e.target.value });
    }
    setNewTodo({ ...newTodo, [name]: value });
  };

  const toggleEdit = () => {
    setIsEdit(!isEdit);
  };

  // reset function
  const resetForm = () => {
    setNewTodo({
      id: uuidv4(),
      name: "",
      completed: false,
    });
  };

  // Tanstack
  const { query, createTodo, deleteTodo, editTodo } = useTanstack();
  const { data, isPending: isLoading, isError } = query;

  const { mutate } = createTodo;

  // Traditional
  // const {
  //   data,
  //   isLoading,
  //   isError,
  //   getAllTodos,
  //   createTodo,
  //   deleteTodo,
  //   editTodo,
  // } = useTraditional();

  // useEffect(() => {
  //   getAllTodos();
  // }, []);

  return (
    <section className="flex flex-col justify-center items-center">
      <h1>To do</h1>
      <section className="w-full grid grid-cols-2 gap-20 mt-20">
        <section className="grid gap-5 h-fit">
          <h5>Add Item</h5>
          <Input
            name="name"
            value={newTodo?.name}
            onChange={(e) => handleChange(e)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (newTodo?.name.trim() !== "") {
                  // Tanstack
                  mutate(newTodo);

                  // Traditional way
                  // createTodo(newTodo);
                  resetForm();
                }
              }
            }}
            data-testid="todo-input"
          />
          <Button
            color="primary"
            onClick={() => {
              if (newTodo?.name.trim() !== "") {
                // Tanstack
                createTodo.mutate(newTodo);

                // Traditional way
                // createTodo(newTodo);
                resetForm();
              }
            }}
            data-testid="add-todo"
          >
            Submit
          </Button>
        </section>
        <section className="grid gap-5 h-fit">
          <h5>Items List</h5>
          {isLoading && <LoadingComponent />}
          {isError && <ErrorComponent />}
          {data && data?.length > 0 && !isError && !isLoading && (
            <ul className="grid" data-testid="todo-list">
              {data?.map((item) => {
                const selectedItem = item?.id === selectedTodo;
                return (
                  <li
                    key={item?.id}
                    className="flex justify-between items-center px-5 py-2 bg-bg-primary rounded-sm border border-bg-secondary"
                  >
                    {isEdit && selectedItem ? (
                      <Input
                        isInvalid={!dataEdit?.name}
                        value={dataEdit?.name}
                        className="w-[90%]"
                        onChange={(e) => handleChange(e)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            if (dataEdit?.name?.trim() !== "") {
                              // Tanstack
                              editTodo.mutate(dataEdit);

                              // Traditional way
                              // editTodo(item?.id, dataEdit);
                              toggleEdit();
                            }
                          }
                        }}
                      />
                    ) : (
                      <p
                        className={`text-text-primary ${
                          item.completed && "line-through"
                        }`}
                      >
                        {item?.name}
                      </p>
                    )}
                    <div className="flex gap-3">
                      {isEdit && selectedItem && (
                        <Icon
                          icon="ic:baseline-done"
                          className="text-2xl icon"
                          onClick={() => {
                            if (dataEdit?.name?.trim() !== "") {
                              // Tanstack
                              editTodo.mutate(dataEdit);

                              // Traditional way
                              // editTodo(item?.id, dataEdit);
                              toggleEdit();
                            }
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
                              setDataEdit({
                                ...dataEdit,
                                id: item?.id,
                                name: item?.name,
                              });
                              toggleEdit();
                            }}
                          />
                          <Icon
                            icon="material-symbols:delete-outline"
                            className="text-2xl icon"
                            onClick={() => {
                              // Tanstack
                              deleteTodo.mutate(item?.id);

                              // Traditional way
                              // deleteTodo(item?.id);
                            }}
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
          {data?.length === 0 && !isLoading && (
            <p className="text-text-secondary">No items</p>
          )}
        </section>
      </section>
    </section>
  );
}
