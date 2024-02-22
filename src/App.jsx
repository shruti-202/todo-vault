import React from "react";
import "./App.css";
import CreateTodo from "./components/CreateTodo";
import { Container } from "@mui/material";

function App() {
  return (
    <Container maxWidth="md">
      <CreateTodo />
    </Container>
  );
}

export default App;
