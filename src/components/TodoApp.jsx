import { useState } from "react";
import AddToDo from "./AddToDo";
import TodoList from "./TodoList";
const TodoApp = () => {
  const [todos, setTodos] = useState([]);

  const handleAddToDo = (todo) => {
    const newTodo = {
      id: Date.now(),
      text: todo,
    };
    setTodos([...todos, newTodo]);
  };

  const handleDeleteTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };
  return (
    <div className="container">
      <AddToDo onAddTodo={handleAddToDo} />
      <TodoList todos={todos} onDeleteTodo={handleDeleteTodo} />
    </div>
  );
};

export default TodoApp;
