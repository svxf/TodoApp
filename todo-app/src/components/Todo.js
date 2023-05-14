import React, { useState } from "react";

function Todo({ name, completed, id, onEdit, onDelete, onToggleCompleted }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(name);
  const [isCompleted, setIsCompleted] = useState(completed);

  const editClassName = `${isEditing ? "edit" : ""}`;

  const handleEditing = () => {
    setIsEditing(!isEditing);
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
    onEdit(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setNewName(newName.trim());
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    onDelete(id);
  };

  const handleCheckboxChange = (e) => {
    setIsCompleted(e.target.checked);
    onToggleCompleted(e.target.checked);
  };

  return (
    <li className={`todo stack-small ${editClassName}`}>
      <div className="c-cb">
        <input
          id={id}
          type="checkbox"
          checked={isCompleted}
          onClick={handleCheckboxChange}
          onChange={handleCheckboxChange}
        />
        
        <label className="todo-label" htmlFor={id}>
          {isEditing ? (
            <input
              type="text"
              value={newName}
              onChange={handleNameChange}
              onKeyDown={handleKeyDown}
            />
          ) : (
            <span defaultValue={name}>{name}</span>
          )}
        </label>
      </div>
      <div className="btn-group">
        <button onClick={handleEditing} type="button" className="btn">
          Edit <span className="visually-hidden">{name}</span>
        </button>
        <button onClick={handleDelete} type="button" className="btn btn__danger">
          Delete <span className="visually-hidden">{name}</span>
        </button>
      </div>
    </li>
  );
}

export default Todo;
