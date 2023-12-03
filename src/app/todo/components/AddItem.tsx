import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";

import { useTodo } from "../functions";

export default function AddItem() {
  const { handleAdd, handleChange, newTodo } = useTodo();
  return (
    <>
      <Input
        isClearable
        value={newTodo}
        onChange={(e) => handleChange(e)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleAdd(newTodo);
          }
        }}
      />
      <Button color="primary" onClick={() => handleAdd(newTodo)}>
        Submit
      </Button>
    </>
  );
}
