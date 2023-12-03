import { useState } from "react";

type TTodo = {
  id: number;
  name: string;
  completed: boolean;
};

const initialState: TTodo[] = [
  {
    id: 1,
    name: "Wash dishes",
    completed: false,
  },
  {
    id: 2,
    name: "Do the laundry",
    completed: false,
  },
];

export const useTodo = () => {
  const [todo, setTodo] = useState<TTodo[]>(initialState);
  const [newTodo, setNewTodo] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // const { name, value } = e.target;
    // setNewTodo({ ...newTodo, [name]: value });
    setNewTodo(e.target.value);
  };

  const handleAdd = (name: string) => {
    const newTodo: TTodo = {
      id: todo.length + 1,
      name: name,
      completed: false,
    };
    setTodo([...todo, newTodo]);
    reset();
  };

  const reset = () => {
    setNewTodo("");
  };

  const handleDelete = (todoId: number) => {
    const updatedTodo = todo?.filter((t) => t.id !== todoId);
    setTodo(updatedTodo);
  };

  return { newTodo, todo, handleChange, handleAdd, handleDelete };
};
