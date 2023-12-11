// Api functions
import {
  getAllTodos,
  postTodo,
  deleteTodoById,
  editTodoById,
} from "@/api/routes/todos";

// Tanstack
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Miscellaneous
import { useState } from "react";

export const useTodo = () => {
  const [newTodo, setNewTodo] = useState<string>("");
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [dataEdit, setDataEdit] = useState<string>("");
  const [selectedTodo, setSelectedTodo] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const todos = useQuery({
    queryKey: ["todos"],
    queryFn: getAllTodos,
  });

  const addTodo = useMutation({
    mutationFn: (body: TTodo) => postTodo(body),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });

  const deleteTodo = useMutation({
    mutationFn: (todoId: string) => deleteTodoById(todoId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });

  const editTodo = useMutation({
    mutationFn: (variables: TTodo) => editTodoById(variables.id, variables),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });

  const handleMutation = (type: string, payload: any = null) => {
    switch (type) {
      case "add":
        if (newTodo.trim() !== "") {
          addTodo.mutate(payload);
          reset();
        }
        break;
      case "delete":
        deleteTodo.mutate(payload);
        break;
      case "edit":
        if (dataEdit.trim() !== "") {
          editTodo.mutate(payload);
          toggleEdit();
        }
        break;
      default:
        break;
    }
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
    isEdit,
    selectedTodo,
    dataEdit,
    handleChange,
    setSelectedTodo,
    toggleEdit,
    setDataEdit,
    handleMutation,
    todos,
  };
};
