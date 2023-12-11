import { useEffect } from "react";
import { useTodo } from "../functions/tanstack";
import { Icon } from "@iconify/react";

export default function ItemList() {
  const { todo, handleDelete } = useTodo();
  useEffect(() => {
    console.log("todo CHECK >", todo);
  }, [todo]);

  return (
    <section className="grid">
      {todo.map((item) => {
        return (
          <div
            key={item.id}
            className="flex justify-between items-center px-5 py-2 bg-bg-primary rounded-sm"
          >
            <p className="text-text-primary">{item.name}</p>
            <div className="flex gap-3">
              <Icon icon="bx:edit" className="text-2xl icon" />
              <Icon
                icon="material-symbols:delete-outline"
                className="text-2xl icon"
                onClick={() => handleDelete(item.id)}
              />
            </div>
          </div>
        );
      })}
    </section>
  );
}
