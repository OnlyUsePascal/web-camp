import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  // input
  let defaultInputState = {
    title : '', 
    content : '',
  }
  let [inputState, setInputState] = useState(defaultInputState);
  
  function inputChange(e){
    let inputName = e.target.name;
    let inputValue = e.target.value;

    setInputState(prevState => {
      return {
        ...prevState,
        [inputName] : inputValue,
      }
    })
  }

  // task 
  let [taskList, setTasklist] = useState([{
    title : 'some title',
    content : 'some content', 
  }]);
  
  function taskListAdd() {
    console.log('> add new task');
    let inputTitle = inputState.title;
    if (!inputTitle) inputTitle = 'Blank title';

    let inputContent = inputState.content;
    if (!inputContent) inputContent = 'Blank Content';

    setTasklist([...taskList, {
      title: inputTitle,
      content : inputContent,
    }])

    // reset input
    setInputState(defaultInputState);
  }

  function taskListDel(taskId) {
    console.log(`> del task: ${taskId}`);
    let newTaskList = [...taskList];
    newTaskList.splice(taskId, 1);
    
    setTasklist(newTaskList);
  }

  function getTaskList() {
    return (taskList.map((task, idx) => {
      return (<Note key={idx}
                  taskId={idx}
                  title={task.title} 
                  content={task.content} 
                  taskListDel={taskListDel}
                  />);
    }));
  }

  return (
    <div>
      <Header />
      <CreateArea taskListAdd={taskListAdd}
                  inputTitle={inputState.title}
                  inputContent={inputState.content}
                  inputChange={inputChange}
                  />
      {getTaskList()}
      <Footer />
    </div>
  );
}

export default App;
