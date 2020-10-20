import express, { Request, Response } from "express";
import cors from "cors";

import pool from "./db";

const app = express();

// middleware
app.use(cors());
app.use(express.json()); //  => allows us to access the req.body

// ROUTES

// get all Todo
app.get("/todos", async (req: Request, res: Response) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");

    res.status(200).json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// get a Todo
app.get("/todos/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const toDo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);

    res.status(402).json(toDo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// create a Todo
app.post("/todos", async (req: Request, res: Response) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES ($1) RETURNING *",
      [description]
    );

    res.status(201).json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// update a Todo
app.put("/todos/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { description } = req.body;

    const updateTodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2",
      [description, id]
    );

    res.status(200).json("Todo was updated");
  } catch (err) {
    console.error(err.message);
  }
});

// delete a Todo
app.delete("/todos/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
      id,
    ]);

    res.status(200).json("Todo was deleted!");
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(5000, () => {
  console.log("Server started at port 5000");
});
