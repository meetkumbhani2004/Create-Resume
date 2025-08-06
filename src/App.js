
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepaze from "./Component/Dashboard";
import ResumeForm from "./Component/ResumeForm";
import Login from "./Component/Login";
import RegisterPage from "./Component/Register";



 function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={< Homepaze />}></Route>
    <Route path="/login" element={< Login />}></Route>
    <Route path="/register" element={< RegisterPage />}></Route>
    <Route path="/resume" element={< ResumeForm />}></Route>
   </Routes> 
    </BrowserRouter>
  )
}

export default App;

