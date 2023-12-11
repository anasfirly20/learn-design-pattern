import axios from "axios";
import { useState } from "react";
import { API_ENDPOINT } from "../constants/constants";

export const useTraditional = () => {
  const [data, setData] = useState<TTodo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  // READ
  const getAllTodos = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(API_ENDPOINT);
      const todos = response?.data;
      setData(todos);
      setIsLoading(false);
      setIsError(false);
    } catch (error) {
      setIsError(true);
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
      await axios.delete(`${API_ENDPOINT}/${todoId}`);
      // Refetch todos data
      getAllTodos();
      setIsLoading(false);
      setIsError(false);
    } catch (error) {
      setIsError(true);
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
