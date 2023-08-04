import React from "react";
import { useState } from "react";

function Task (props){
  let [isThrough, setIsThrough] = useState(false);
  
  // function setThrough() {
  //   setIsThrough(prevState => !prevState);
  // }

  return (
    <li style={{textDecoration : (isThrough) ? 'line-through' : ''}}
        onClick={props.delTask}>
      {props.taskContent}
    </li>);
};

export default Task;






