import React, { useState } from "react";
import "./App.css";

import Todo from "./components/Todo";

function App() {
  const [tasks, setTasks] = useState([
    { id: "todo-0", name: "Task 1", completed: true },
    { id: "todo-1", name: "Task 2", completed: false },
    { id: "todo-2", name: "Task 3", completed: false },
  ]);

  // new task

  const [newTaskName, setNewTaskName] = useState("");

  const handleNewTaskNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTaskName(e.target.value);
  };

  const handleNewTaskSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newTaskName.trim() === "") {
      return;
    }
    const newTask = {
      id: `todo-${tasks.length}`,
      name: newTaskName.trim(),
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setNewTaskName("");
    console.log(tasks);
  };

  // edit + delete

  const handleEditTaskName = (taskId: string, newName: string) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, name: newName };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (taskId: string) => {
    const updatedTasks = tasks
      .filter((task) => task.id !== taskId)
      .map((task, index) => {
        return {
          ...task,
          id: `todo-${index}`,
        };
      });
    setTasks(updatedTasks);
  };

  // tabs
  const [currentTab, setCurrentTab] = useState("all");

  const handleToggleCompleted = (taskId: string) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const handleTabChange = (tab: string) => {
    setCurrentTab(tab);
  };

  const filteredTasks = (() => {
    switch (currentTab) {
      case "active":
        return tasks.filter((task) => !task.completed);
      case "completed":
        return tasks.filter((task) => task.completed);
      default:
        return tasks;
    }
  })();

  return (
    <div className="todoapp">
      <h1>Todo App</h1>
      <form onSubmit={handleNewTaskSubmit}>
        <input
          type="text"
          className="input input__lg"
          placeholder="What needs to be done?"
          name="text"
          autoComplete="off"
          value={newTaskName}
          onChange={handleNewTaskNameChange}
        />
        <button type="submit" className="btn btn__primary btn__lg">
          Add
        </button>
      </form>
      <div className="filters btn-group stack-exception">
        <button
          type="button"
          className={`btn toggle-btn ${currentTab === "all" ? "active" : ""}`}
          aria-pressed={currentTab === "all" ? "true" : "false"}
          onClick={() => handleTabChange("all")}
        >
          <span className="visually-hidden">Show </span>
          <span>all</span>
          <span className="visually-hidden"> tasks</span>
        </button>
        <button
          type="button"
          className={`btn toggle-btn ${
            currentTab === "active" ? "active" : ""
          }`}
          aria-pressed={currentTab === "active" ? "true" : "false"}
          onClick={() => handleTabChange("active")}
        >
          <span className="visually-hidden">Show </span>
          <span>active </span>
          <span className="visually-hidden"> tasks</span>
        </button>
        <button
          type="button"
          className={`btn toggle-btn ${
            currentTab === "completed" ? "active" : ""
          }`}
          aria-pressed={currentTab === "completed" ? "true" : "false"}
          onClick={() => handleTabChange("completed")}
        >
          <span className="visually-hidden">Show </span>
          <span>completed </span>
          <span className="visually-hidden"> tasks</span>
        </button>
      </div>
      <h2 id="list-heading">
        {filteredTasks.filter((task) => !task.completed).length} tasks remaining
      </h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {filteredTasks.map((task) => (
          <Todo
            key={task.id}
            name={task.name}
            completed={task.completed}
            id={task.id}
            onEdit={(newName: string) => handleEditTaskName(task.id, newName)}
            onDelete={() => handleDeleteTask(task.id)}
            onToggleCompleted={() => handleToggleCompleted(task.id)}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
