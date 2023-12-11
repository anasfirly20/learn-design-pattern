// Miscellaneous
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { API_ENDPOINT } from "../constants/constants";

export const useTanstack = () => {
  const queryClient = useQueryClient();

  const getAllTodos = async () => {
    const response = await axios.get(API_ENDPOINT);
    return response?.data;
  };

  const query = useQuery<TTodo[]>({
    queryKey: ["todos"],
    queryFn: getAllTodos,
  });

  // POST
  const postTodo = async (body: TTodo) => {
    const response = await axios.post(API_ENDPOINT, body);
    return response?.data;
  };

  const createTodo = useMutation({
    mutationFn: (body: TTodo) => postTodo(body),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });

  // DELETE
  const deleteTodoById = async (todoId: string) => {
    const response = await axios.delete(`${API_ENDPOINT}/${todoId}`);
    return response?.data;
  };

  const deleteTodo = useMutation({
    mutationFn: (todoId: string) => deleteTodoById(todoId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });

  // EDIT
  const putTodo = async (todoId: string, body: TTodo) => {
    const response = await axios.put(`${API_ENDPOINT}/${todoId}`, body);
    return response?.data;
  };

  const editTodo = useMutation({
    mutationFn: (variables: TTodo) => putTodo(variables.id, variables),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });

  return {
    query,
    createTodo,
    deleteTodo,
    editTodo,
  };
};
