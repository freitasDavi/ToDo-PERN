import React, { Fragment, useState, useEffect } from "react";

interface toDo {
  id: number;
  description: string;
}

const ListTodos = () => {
  const [todos, setTodos] = useState([]);

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
            <tr key={todo.id}>
              <td>{todo.description}</td>
              <td>Edit</td>
              <td>Delete</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListTodos;
