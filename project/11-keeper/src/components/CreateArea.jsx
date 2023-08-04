import React from "react";

function CreateArea(props) {
  return (
    <div>
      <form onSubmit={e => e.preventDefault()}>
        <input name="title" 
              placeholder='new task here' 
              value={props.inputTitle}
              onChange={props.inputChange}/>
        <textarea name="content" 
                placeholder='new content here'
                rows="3" 
                value={props.inputContent}
                onChange={props.inputChange}/>
        <button onClick={props.taskListAdd}>Add</button>
      </form>
    </div>
  );
}

export default CreateArea;
