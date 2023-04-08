import React, { useState } from 'react';
import './TodoList.css';

function App() {
  const [tasks, setTasks] = useState([]);

  function addTask(task) {
    setTasks([...tasks, task]);
  }

  function deleteTask(index) {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  }

  function completeTask(index) {
    const newTasks = [...tasks];
    newTasks[index].completed = true;
    setTasks(newTasks);
  }

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <AddTaskForm addTask={addTask} />
      <TaskList
        tasks={tasks}
        deleteTask={deleteTask}
        completeTask={completeTask}
      />
    </div>
  );
}

function AddTaskForm(props) {
  const [task, setTask] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (task.trim() === '') return;
    props.addTask({ title: task, completed: false });
    setTask('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter a task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  );
}

function TaskList(props) {
  return (
    <ul>
      {props.tasks.map((task, index) => (
        <Task
          key={index}
          task={task}
          index={index}
          deleteTask={props.deleteTask}
          completeTask={props.completeTask}
        />
      ))}
    </ul>
  );
}

function Task(props) {
	return (
	  <li style={{ display: 'flex', alignItems: 'center' }}>
		<input
		  type="checkbox"
		  checked={props.task.completed}
		  onChange={() => props.completeTask(props.index)}
		  style={{ marginRight: '10px' }}
		/>
		<span
		  style={{
			textDecoration: props.task.completed ? 'line-through' : 'none',
			marginRight: '10px'
		  }}
		>
		  {props.task.title}
		</span>
		<button
		  onClick={() => props.deleteTask(props.index)}
		  style={{ marginLeft: 'auto' }}
		>
		  Delete
		</button>
	  </li>
	);
  }
  

export default App;
