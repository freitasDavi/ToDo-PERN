import React, { Fragment, useState, useEffect } from "react";
import EditTodo from "./EditTodo";

interface toDo {
  todo_id: number;
  description: string;
}

const ListTodos = () => {
  const [todos, setTodos] = useState([]);

  //   DELETE TODO FUNCTION
  async function deleteTodo(id: number) {
    try {
      const res = await fetch(`http://localhost:5000/todos/${id}`, {
        method: "DELETE",
      });

      setTodos(todos.filter((todo: toDo) => todo.todo_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  }

  //   GET TODOS FUNCTION

  async function getTodos() {
    const response = await fetch("http://localhost:5000/todos");

    const todoArray = await response.json();

    setTodos(todoArray);
  }

  useEffect(() => {
    getTodos();
  }, []);

  console.log(todos);

  return (
    <Fragment>
      <table className="table table-dark table-striped mt-5">
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo: toDo) => (
            <tr key={todo.todo_id}>
              <td>{todo.description}</td>
              <td>
                <EditTodo todo={todo} />
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteTodo(todo.todo_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListTodos;
