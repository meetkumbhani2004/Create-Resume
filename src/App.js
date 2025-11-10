
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepaze from "./Component/Dashboard";
import ResumeForm from "./Component/ResumeForm";
import Login from "./Component/Login";
import RegisterPage from "./Component/Register";
import Navbar from "./Component/Navbar";
import TemplateSelector from "./Component/Templateselecter";
import Home from "./page/Home";


 function App() {
  return (
    <BrowserRouter>
    <Navbar />
    <Routes>
    <Route path="/" element={< Home />}></Route>
    <Route path="/login" element={< Login />}></Route>
    <Route path="/register" element={< RegisterPage />}></Route>
    <Route path="/dashboard" element={< Homepaze />}></Route>
    <Route path="/create-resume" element={< ResumeForm />}></Route>
    <Route path="/previ" element={< TemplateSelector />}></Route>


   </Routes>
    
    </BrowserRouter>
  )
}

export default App;

