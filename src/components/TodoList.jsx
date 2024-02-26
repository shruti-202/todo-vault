import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { IconButton } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";

function TodoList({ todos, fetchTodos }) {
  const deleteTodo = (id) => {
    fetch(
      `https://todo-d528e-default-rtdb.asia-southeast1.firebasedatabase.app/todo/${id}.json `,
      {
        method: "DELETE",
      }
    ).then(() => {
      fetchTodos();
    });
  };
  return (
    <div className="todos">
      {todos.length > 0 ? (
        <div className="todo-container">
          {todos.map((todo) => {
            return (
              <div key={todo.id} className="todo">
                <div className="todo-left">
                  <div className="todo-done">
                    <Checkbox
                      checked={todo.isCompleted}
                      color="primary"
                      inputProps={{ "aria-label": "secondary checkbox" }}
                    />
                  </div>
                  <div className="todo-detail">
                    <div className="todo-detail-title">{todo.title}</div>
                    <div className="todo-detail-desc">{todo.description}</div>
                  </div>
                </div>
                <div className="todo-right">
                  <div className="todo-delete">
                    <IconButton onClick={() => deleteTodo(todo.id)}>
                      <DeleteForeverIcon />
                    </IconButton>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div>NoTodos</div>
      )}
    </div>
  );
}

export default TodoList;
