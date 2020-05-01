import axios from 'axios';
import React, {
  createContext, useEffect, useState,
} from 'react';

export const TodosContext = createContext({
  todos: [],
  addTodo: () => { },
  updateTodo: () => { },
  toggleTodo: () => { },
  deleteTodo: () => { },
});

const TodosProvider = ({ children }) => {

  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get('/api/todos')
      .then(function (response) {
        setTodos(response.data);
      })
      .catch(function (error) {
        console.error(error.message);
      })
  }, []);

  const methods = {
    /* 
      - API call (using axios) to add the todo
      - on server response, add the new todo to the todos list 
    */
    addTodo: (todo) => {
      axios.post('/api/todos', {
        note: todo
      })
        .then(function (response) {
          const newTodos = [...todos];
          newTodos.push(response.data);
          setTodos(newTodos);
        })
        .catch(function (error) {
          console.error(error.message);
        })
    },

    /* 
      - API call (using axios) to update the todo based on the `id` argument
      - on server response, update the todo in the todos list
    */
    updateTodo: (id, todo) => {
      axios.put('/api/todos/' + id, {
        note: todo
      })
        .then(function (response) {
          const newTodos = [...todos];
          let element = 0;
          for (let i = 0; i < todos.length; i++) {
            element = i;
            if (newTodos[element].id === response.data.id) {
              newTodos[element].note = response.data.note;
              setTodos(newTodos)
            }
          }
        })
        .catch(function (error) {
          console.error(error.message);
        })
    },
    /* 
       - if the todo is archived, API call (using axios) to unarchive it based on the `id` argument
       - if the todo is unarchived, API call (using axios) to archive it based on the `id` argument
       - on server response, update the todo in the todos list
     */
    toggleTodo: (id, archived) => {
      if (archived) {
        axios.post('/api/todos/' + id + "/unarchive", {
          archived: false
        })
          .then(function (response) {
            const newTodos = [...todos];
            let element = 0;
            for (let i = 0; i < todos.length; i++) {
              element = i;
              if (newTodos[element].id === response.data.id) {
                newTodos[element].archived = response.data.archived;
                setTodos(newTodos)
              }
            }
          })
          .catch(function (error) {
            console.error(error.message);
          })
      } else if (!archived) {
        axios.post('/api/todos/' + id + "/archive", {
          archived: true
        })
          .then(function (response) {
            const newTodos = [...todos];

            let element = 0;
            for (let i = 0; i < todos.length; i++) {
              element = i;
              if (newTodos[element].id === response.data.id) {
                newTodos[element].archived = response.data.archived;
                setTodos(newTodos)
              }
            }
          })
          .catch(function (error) {
            console.error(error.message);
          })
      }

    },
    /* 
      - API call (using axios) to delete the todo based on the `id` argument
      - delete the todo from the todos list using `setTodos()`
    */
    deleteTodo: (id) => {
      axios.delete('/api/todos/' + id)
        .then(function (response) {
          const newTodos = [...todos];
          let element = 0;
          for (let i = 0; i < todos.length; i++) {
            element = i;
            if (newTodos[element].id === response.data.id) {
              const toDelete = element
              newTodos.splice(toDelete, 1);
              setTodos(newTodos)
            }
          }
          setTodos(newTodos);
        })
        .catch(function (error) {
          console.error(error.message);
        })
    },
  };

  return (
    <TodosContext.Provider value={{ todos, ...methods }}>
      {children}
    </TodosContext.Provider>
  );
};

export default TodosProvider;