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
  const [newTodo, setNewTodo] = useState<string>("");
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [selectedTodo, setSelectedTodo] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isEdit) {
      const updatedData = todo?.map((t) =>
        t.id === selectedTodo ? { ...t, name: e.target.value } : t
      );
      setTodo(updatedData);
    } else {
      setNewTodo(e.target.value);
    }
  };

  const handleAdd = (name: string) => {
    const newTask: TTodo = {
      id: todo.length + 1,
      name: name,
      completed: false,
    };
    if (newTodo) {
      setTodo([...todo, newTask]);
    }
    reset();
  };

  const reset = () => {
    setNewTodo("");
  };

  const handleDelete = (todoId: number) => {
    const updatedTodo = todo?.filter((t) => t.id !== todoId);
    setTodo(updatedTodo);
  };

  const handleUpdate = (todoId: number, name: string) => {
    const modifiedTodo = todo.map((t) => {
      if (t.id === todoId) {
        const updatedTodo = {
          ...t,
          name: name,
        };
        return updatedTodo;
      } else {
        return t;
      }
    });
    setTodo(modifiedTodo);
    toggleEdit();
  };

  const toggleEdit = () => {
    setIsEdit(!isEdit);
  };

  return {
    newTodo,
    todo,
    handleChange,
    handleAdd,
    handleDelete,
    handleUpdate,
    isEdit,
    selectedTodo,
    setSelectedTodo,
    toggleEdit,
  };
};
