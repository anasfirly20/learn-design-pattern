import axios from "axios";
import { useState } from "react";
import { API_ENDPOINT } from "../constants/constants";

export const useTraditional = () => {
  const [data, setData] = useState<TTodo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const getAllTodos = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(API_ENDPOINT);
      const todos = response?.data;
      setData(todos);
      setIsError(false);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  // CREATE
  const createTodo = async (newTodo: TTodo) => {
    try {
      setIsLoading(true);
      await axios.post(API_ENDPOINT, newTodo);
      // Refetch todos data
      getAllTodos();
      setIsError(false);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  // DELETE
  const deleteTodo = async (todoId: string) => {
    try {
      setIsLoading(true);
      await axios.delete(`${API_ENDPOINT}/${todoId}`);
      // Refetch todos data
      getAllTodos();
      setIsError(false);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  // UPDATE
  const editTodo = async (todoId: string, body: TTodo) => {
    try {
      setIsLoading(true);
      await axios.put(`${API_ENDPOINT}/${todoId}`, body);
      // Refetch todos data
      getAllTodos();
      setIsError(false);
    } catch (error) {
      setIsError(true);
    } finally {
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
