import {
  getAllTodos,
  postTodo,
  deleteTodoById,
  editTodoById,
} from "@/api/routes/todos";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const useTodo = () => {
  const [newTodo, setNewTodo] = useState<string>("");
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [dataEdit, setDataEdit] = useState<string>("");
  const [selectedTodo, setSelectedTodo] = useState<string | null>(null);

  // tanstack
  const queryClient = useQueryClient();

  // Read
  const { data, isPending, isError } = useQuery({
    queryKey: ["todos"],
    queryFn: getAllTodos,
  });

  // Add
  const addTodo = useMutation({
    mutationFn: (body: TTodo) => {
      return postTodo(body);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const handleAdd = (name: string) => {
    const newTask: TTodo = {
      id: uuidv4(),
      name: name,
      completed: false,
    };
    if (newTodo.trim() !== "") {
      addTodo.mutate(newTask);
      reset();
    }
  };

  // Delete
  const deleteTodo = useMutation({
    mutationFn: (todoId: string) => {
      return deleteTodoById(todoId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  // Edit
  const editTodo = useMutation({
    mutationFn: (variables: TTodo) => {
      console.log("variables", variables);
      return editTodoById(variables.id, variables);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const handleUpdate = async (todoId: string, name: string) => {
    editTodo.mutate({
      id: todoId,
      name: name,
      completed: false,
    });
    toggleEdit();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isEdit) {
      setDataEdit(e.target.value);
    } else {
      setNewTodo(e.target.value);
    }
  };

  const toggleEdit = () => {
    setIsEdit(!isEdit);
  };

  const reset = () => {
    setNewTodo("");
  };

  return {
    newTodo,
    handleChange,
    handleAdd,
    handleUpdate,
    isEdit,
    selectedTodo,
    setSelectedTodo,
    toggleEdit,
    // tanstack
    data,
    isPending,
    isError,
    addTodo,
    deleteTodo,
    dataEdit,
    setDataEdit,
  };
};
