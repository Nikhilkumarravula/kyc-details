import NavBar from "./components/NavBar";
import "./App.css"
import Details from "./components/Details";
import  Success from "./components/Success";
import GetDetails from "./components/GetDetails";
import Failure from "./components/Failure";
import { Route,Routes } from "react-router-dom";
function App() {
  return (
   
      <>
      <NavBar/>
      <Routes>
        <Route exact path="/" element={< Details/>}/>
        <Route  path="/getDetails" element={< GetDetails/>}/>
      <Route path="/success" element={< Success/>} />
      <Route path="/Failure" element={< Failure/>} />
      </Routes>
    </>
      
    



  );
}

export default App;
