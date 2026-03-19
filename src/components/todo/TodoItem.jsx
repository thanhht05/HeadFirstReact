const TodoItem = ({ todos, onDeleteTodo }) => {
  return (
    <div>
      {/* {todos.map((todo) => (
        <div key={todo.id}>{todo.text}</div>
      ))} */}
      <>
        {todos.map((todo) => (
          <li style={{ display: "flex", gap: "20px" }}>
            {todo.text} <hr />
            <button onClick={() => onDeleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </>
    </div>
  );
};
export default TodoItem;
