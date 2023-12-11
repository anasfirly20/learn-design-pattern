import axios from "axios";
import { useState } from "react";

export const useTraditional = () => {
  const [data, setData] = useState<TTodo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const getAllTodos = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("http://localhost:5000/todos");
      const todos = response?.data;
      setData(todos);
      setIsLoading(false);
      setIsError(false);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    }
  };

  // POST
  const createTodo = async (newTodo: TTodo) => {
    try {
      setIsLoading(true);
      await axios.post("http://localhost:5000/todos", newTodo);
      // Refetch todos data
      getAllTodos();
      setIsLoading(false);
      setIsError(false);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    }
  };

  // DELETE
  const deleteTodo = async (todoId: string) => {
    try {
      setIsLoading(true);
      await axios.delete(`http://localhost:5000/todos/${todoId}`);
      // Refetch todos data
      getAllTodos();
      setIsLoading(false);
      setIsError(false);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    }
  };

  // PUT
  const editTodo = async (todoId: string, body: TTodo) => {
    try {
      setIsLoading(true);
      await axios.put(`http://localhost:5000/todos/${todoId}`, body);
      // Refetch todos data
      getAllTodos();
      setIsLoading(false);
      setIsError(false);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    }
  };

  return {
    data,
    isLoading,
    isError,
    getAllTodos,
    createTodo,
    deleteTodo,
    editTodo,
  };
};
