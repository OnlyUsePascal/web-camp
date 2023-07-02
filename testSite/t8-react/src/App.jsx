import Heading from "./components/heading";
import Footing from "./components/footing";
// const getPi = require("./components/getPi")
import * as getPi from "./components/getPi"
import { CalcInput } from "./components/calc";

const App = () => {
  return (
    <>
      <Heading />
      <h2>Test props</h2>
      <CalcInput 
        fi='1' 
        se='2'/>
      <Footing />
    </>
  );
};

export default App;
