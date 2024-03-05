import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { IconButton } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import alerts from "../utils/Alerts";

function TodoList({ todos, fetchTodos }) {
  const deleteTodo = (id) => {
    fetch(
      `https://todo-d528e-default-rtdb.asia-southeast1.firebasedatabase.app/todo/${id}.json `,
      {
        method: "DELETE",
      }
    ).then(() => {
      fetchTodos();
      alerts("Todo Deleted Successfully", 'info');
    });
  };

  const updateTodo = (id,currentState) => {
    fetch(`https://todo-d528e-default-rtdb.asia-southeast1.firebasedatabase.app/todo/${id}.json `,
    {
      method: "PATCH",
      body: JSON.stringify({
        isCompleted: !currentState
      }),
      headers: {
        'Content-Type':'application/json'
      }
    }).then (() => {
      fetchTodos();
      alerts("Todo Updated Successfully",'info')
    })
  }
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
                      onClick={() => updateTodo(todo.id, todo.isCompleted)}
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
