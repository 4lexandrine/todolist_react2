import cx from "classnames";
import React, { useContext, useEffect, useState, useCallback } from "react";

import { TodosContext } from "../features/TodosContext";
import ButtonIcon from "./ButtonIcon";
import Icon from "./Icon";
import TodoForm from "./TodoForm";

const TodoItem = ({ todo }) => {
  const { toggleTodo, deleteTodo } = useContext(TodosContext);
  const [edit, setEdit] = useState(false);

  // pressing on "Escape" cancels the edit form and shows the original note
  const escFunction = useCallback((event) => {
    if (event.keyCode === 27) {
      setEdit(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);
    // cleanup function
    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, [edit, todo]);

  return (
    <div className="flex w-full justify-between my-4">
      {!edit ? (
        <div>
          <button
            className="mr-4"
            onClick={() => {
              // todo.archived = !todo.archived;
              toggleTodo(todo.id, todo.archived);
            }}
          >
            <Icon
              name={todo.archived ? "CheckSquare" : "Square"}
              className={todo.archived ? "text-gray-400" : null}
            />
          </button>
          <span
            className={todo.archived ? "line-through text-gray-400" : null}
            onClick={() => {
              // todo.archived = !todo.archived;
              toggleTodo(todo.id, todo.archived);
            }}
          >
            {todo.note}
          </span>
        </div>
      ) : (
        <TodoForm todo={todo} setEdit={setEdit} edit={edit} />
      )}
      <div>
        <ButtonIcon
          className="ml-4"
          icon={edit ? "X" : "Edit"}
          onClick={() => {
            setEdit(!edit);
          }}
        />
        {edit ? null : (
          <ButtonIcon
            icon="Trash2"
            variant="danger"
            className="ml-4"
            onClick={() => {
              confirm();
              deleteTodo(todo.id);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default TodoItem;
