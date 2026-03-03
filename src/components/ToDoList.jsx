import TodoItem from "./TodoItem";

const TodoList = ({ todos, onDeleteTodo }) => {
  return (
    <ul style={{ marginTop: "10px", marginLeft: "40px" }}>
      <TodoItem onDeleteTodo={onDeleteTodo} todos={todos} />
    </ul>
  );
};
export default TodoList;
