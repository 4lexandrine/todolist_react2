import React, { useContext } from "react";

import { TodosContext } from "../features/TodosContext";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";

const Todos = () => {
  const { todos } = useContext(TodosContext);

  /* TODO: 
    - last created todos should appear first
    - archived todos should appear at the bottom of the list
  */

  let newTodos = [...todos];
  const sorted = newTodos
    .sort((a, b) => b.created_at - a.created_at)
    .sort((a, b) => a.archived - b.archived);
  const sortedTodos = sorted;

  return (
    <section>
      <h1 className="mb-4 text-xl font-bold text-gray-600">To-Dos</h1>
      <TodoForm />
      <section>
        {sortedTodos.map((todo) => (
          <TodoItem todo={todo} key={todo.id} />
        ))}
      </section>
    </section>
  );
};

export default Todos;
