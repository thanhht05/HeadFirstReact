import { useState } from "react";

const AddToDo = ({ onAddTodo }) => {
  const [text, setText] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) {
      return;
    }
    onAddTodo(text);
    setText("");
  };
  return (
    <form style={{ textAlign: "center" }} onSubmit={handleSubmit}>
      <div>
        <input value={text} onChange={(e) => setText(e.target.value)} />
        <button type="submit">ADD</button>
      </div>
    </form>
  );
};

export default AddToDo;
