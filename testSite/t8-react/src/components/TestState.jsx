import React, {useState} from "react";


const TestState = () => {
  // count test
  let [countState, setCount] = useState(0);

  const incCount = () => {
    setCount(countState + 1);
  }

  // date test
  let [dateState, setDate] = useState(new Date().toString());
  
  // let cnt = 0 ;
  const updateDate = () => {
    // console.log('updated: ' + cnt++);
    setDate(new Date().toString());
  }

  const delay = 1000;
  // let timer = setTimeout(function start() {
  //   updateDate();
  //   timer = setTimeout(start, delay);
  // }, delay);

  // setInterval(updateDate, 1000);

  // state object test
  let [objState, setObj] = useState({
    value1 : '123',
    value2 : '234',
  });

  function eventChange(event) {
    let inputName = event.target.name;
    let inputValue = event.target.value;
    
    // conditonal way
    // setObj(prevState => {
    //   return {
    //     value1 : (inputName === 'value1') ? inputValue : prevState.value1,
    //     value2 : (inputName === 'value2') ? inputValue : prevState.value2,
    //   }
    // });

    // spread way
    /* 
      note 1:
      given arr = [1,2,3]
      obj = {
        ...arr, 
        4,
        5
      }
      = {1,2,3,4,5}

      note2:
      key = value1
      obj = {
        [key] : 'send nude'
      } -> {
        value1 : 'send nude'
      }
    */

    setObj(prevState => {
      return {
        ...prevState,
        [inputName] : inputValue //this will override the one in prevState
      };
    });
  }

  return (
    <>
      <h3>Test interaction</h3>
      <p>{countState}</p>    
      <button onClick={incCount}>Press this to increase</button>
      
      <h3>Test time</h3>
      <p>{dateState}</p>

      <h3>Test on mouse over</h3>
      <div style={{backgroundColor: 'cyan'
                    ,maxWidth:300}}>
        <p onMouseOver={incCount} >Move your mouse here to increase the number</p>
      </div>

      <h3>Test multiple value in one state</h3>
      <p>Value1: [{objState.value1}] ||| Value2: [{objState.value2}]</p>
      <input onChange={eventChange} type="text" placeholder="value1" name="value1"/>
      <input onChange={eventChange} type="text" placeholder="value2" name="value2"/>
    </>
  )
}

export default TestState;