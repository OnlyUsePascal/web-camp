import React from "react";
import { useState } from "react";
import Task from "./Task";

function App() {
  let [inputValue, setInputValue] = useState("");
  let [taskList, setTaskList] = useState([]);

  function inputChange(e) {
    setInputValue(e.target.value);
  }

  function addTask(e) {
    if (inputValue === '') return;
    console.log(inputValue);
    setTaskList([...taskList, inputValue]);
    setInputValue("");
  }

  function delTask(e) {
    console.log('> task deleted');
    
    let taskContent = e.target.innerHTML;
    let newTaskList = [...taskList];
    let idx = newTaskList.indexOf(taskContent);

    newTaskList.splice(idx, 1);
    // console.log(newTaskList + '-' + taskContent + '-' + idx);

    setTaskList(newTaskList);
  }

  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      
      <div className="form">
        <input
          type="text"
          name="newTask"
          value={inputValue}
          placeholder="new task here"
          onChange={inputChange}
        />
        <button onClick={addTask}>
          <span>Add</span>
        </button>
      </div>

      <div>
        <ul>
          {taskList.map(task => 
            (<Task taskContent = {task}
                  delTask = {delTask}
              />))}
        </ul>
      </div>
    </div>
  );
}

export default App;
