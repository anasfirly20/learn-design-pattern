import { useState } from "react";

export const useTraditional = () => {
  const [data, setData] = useState<TTodo[]>();

  const getAllTodos = async () => {
    const response = await fetch("http://localhost:5000/todos");
    const todos = await response.json();
    setData(todos as any);
    console.log("TR TODOS >", todos);
  };

  return {
    getAllTodos,
    data,
  };
};
