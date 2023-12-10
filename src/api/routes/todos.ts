import api from "../api";

export const getAllTodos = async (): Promise<TTodo[] | undefined> => {
  const res = await api.get(`/todos`);
  return res.data;
};

export const postTodo = async (body: TTodo) => {
  const res = await api.post(`/todos`, body);
  return res.data;
};

export const deleteTodoById = async (todoId: string) => {
  const res = await api.delete(`/todos/${todoId}`);
  return res.data;
};

export const editTodoById = async (todoId: string, body: TTodo) => {
  const res = await api.put(`/todos/${todoId}`, body);
  return res.data;
};
