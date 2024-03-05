import "./App.css";
import CreateTodo from "./components/CreateTodo";
import React, { useState, useEffect } from "react";
import { Container } from "@mui/material";
import TodoList from "./components/TodoList";
import Header from "./components/Header";

function App() {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    const response = await fetch(
      "https://todo-d528e-default-rtdb.asia-southeast1.firebasedatabase.app/todo.json"
    );
    const data = await response.json();
    let todoBuilder = [];
    for (const key in data) {
      todoBuilder.push({
        id: key,
        ...data[key],
      });
    }
    setTodos(todoBuilder.reverse());
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <Container maxWidth="md">
      <Header/>
      <CreateTodo fetchTodos={fetchTodos} />
      <TodoList todos={todos} fetchTodos={fetchTodos} />
    </Container>
  );
}

export default App;
