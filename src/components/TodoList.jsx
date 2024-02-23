import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { IconButton } from "@mui/material";

function TodoList({ todos }) {
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
                    <IconButton>
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
