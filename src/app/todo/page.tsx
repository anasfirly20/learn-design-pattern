"use client";

// Next ui
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";

// Functions
import { useTodo } from "./functions";
import { useTraditional } from "./functions/traditional";

// Miscellaneous
import { v4 as uuidv4 } from "uuid";
import { Icon } from "@iconify/react";

// Components
import LoadingComponent from "./components/Loading";
import ErrorComponent from "./components/Error";
import { useEffect, useState } from "react";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function TodoPage() {
  const {
    isEdit,
    selectedTodo,
    setSelectedTodo,
    toggleEdit,
    // newTodo,
    // dataEdit,
    // setDataEdit,
    // handleChange,
    // handleMutation,
    // todos,
  } = useTodo();

  // // Traditional way
  // const [data, setData] = useState<TTodo[]>([]);
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [isError, setIsError] = useState<boolean>(false);

  // GET
  // const getAllTodos = async () => {
  //   try {
  //     setIsLoading(true);
  //     const response = await axios.get("http://localhost:5000/todos");
  //     const todos = response?.data;
  //     setData(todos);
  //     setIsLoading(false);
  //     setIsError(false);
  //   } catch (error) {
  //     setIsError(true);
  //     setIsLoading(false);
  //   }
  // };

  useEffect(() => {
    getAllTodos();
  }, []);

  const [newTodo, setNewTodo] = useState<TTodo>({
    id: uuidv4(),
    name: "",
    completed: false,
  });

  // POST
  // const createTodo = async (newTodo: TTodo) => {
  //   try {
  //     setIsLoading(true);
  //     await axios.post("http://localhost:5000/todos", newTodo);
  //     // Refetch todos data
  //     getAllTodos();
  //     setIsLoading(false);
  //     setIsError(false);
  //   } catch (error) {
  //     setIsError(true);
  //     setIsLoading(false);
  //   }
  // };

  // DELETE
  // const deleteTodo = async (todoId: string) => {
  //   try {
  //     setIsLoading(true);
  //     await axios.delete(`http://localhost:5000/todos/${todoId}`);
  //     // Refetch todos data
  //     getAllTodos();
  //     setIsLoading(false);
  //     setIsError(false);
  //   } catch (error) {
  //     setIsError(true);
  //     setIsLoading(false);
  //   }
  // };

  // EDIT
  const [dataEdit, setDataEdit] = useState<TTodo>({
    name: "",
    id: "",
    completed: false,
  });

  // PUT
  // const editTodo = async (todoId: string, body: TTodo) => {
  //   try {
  //     setIsLoading(true);
  //     await axios.put(`http://localhost:5000/todos/${todoId}`, body);
  //     // Refetch todos data
  //     getAllTodos();
  //     setIsLoading(false);
  //     setIsError(false);
  //   } catch (error) {
  //     setIsError(true);
  //     setIsLoading(false);
  //   }
  // };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (isEdit) {
      setDataEdit({ ...dataEdit, name: e.target.value });
    }
    setNewTodo({ ...newTodo, [name]: value });
  };

  // Tanstack query
  const queryClient = useQueryClient();

  const getAllTodos = async () => {
    const response = await axios.get("http://localhost:5000/todos");
    return response?.data;
  };

  const { data, isLoading, isError } = useQuery<TTodo[]>({
    queryKey: ["todos"],
    queryFn: getAllTodos,
  });

  // POST
  const postTodo = async (body: TTodo) => {
    const response = await axios.post("http://localhost:5000/todos", body);
    return response?.data;
  };

  const addTodo = useMutation({
    mutationFn: (body: TTodo) => postTodo(body),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });

  // DELETE
  const deleteTodoById = async (todoId: string) => {
    const response = await axios.delete(
      `http://localhost:5000/todos/${todoId}`
    );
    return response?.data;
  };

  const deleteTodo = useMutation({
    mutationFn: (todoId: string) => deleteTodoById(todoId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });

  // PUT
  const putTodo = async (todoId: string, body: TTodo) => {
    const response = await axios.put(
      `http://localhost:5000/todos/${todoId}`,
      body
    );
    return response?.data;
  };

  const editTodo = useMutation({
    mutationFn: (variables: TTodo) => putTodo(variables.id, variables),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });

  // reset function
  const resetForm = (item: any) => {
    if (isEdit) {
      setDataEdit({
        ...dataEdit,
        name: item?.name,
        id: item?.id,
      });
    } else {
      setNewTodo({
        id: uuidv4(),
        name: "",
        completed: false,
      });
    }
  };

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
                // createTodo(newTodo);
                addTodo.mutate(newTodo);
                resetForm(null);
              }
            }}
            data-testid="todo-input"
          />
          <Button
            color="primary"
            onClick={() => {
              // createTodo(newTodo);
              addTodo.mutate(newTodo);
              // reset
              resetForm(null);
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
                    key={item.id}
                    className="flex justify-between items-center px-5 py-2 bg-bg-primary rounded-sm border border-bg-secondary"
                  >
                    {isEdit && selectedItem ? (
                      <Input
                        isInvalid={!dataEdit}
                        value={dataEdit?.name}
                        className="w-[90%]"
                        onChange={(e) => handleChange(e)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            editTodo.mutate(dataEdit);
                            toggleEdit();
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
                            editTodo.mutate(dataEdit);
                            toggleEdit();
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
                              // deleteTodo(item?.id);
                              deleteTodo.mutate(item?.id);
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
