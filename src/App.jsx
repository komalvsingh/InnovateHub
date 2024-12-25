import React from "react";
import Dashboard from "./dashboard";
import Signin from "./register";
import Home from "./homepage";
import Login from "./login";
import ChallengePage from "./challengepage";
import {BrowserRouter,Routes,Route} from "react-router-dom"
import { Banner } from "./banner";

function App(){
  return(
    <BrowserRouter>
<Routes>
  <Route path="/register" element={<Signin/>}></Route>
   <Route path="/" element={<Home/>}></Route> 
  <Route path="/login" element={<Login/>}></Route>
  <Route path="/challenge" element={<ChallengePage/>}></Route>
  <Route path="/dashboard" element={<Dashboard/>}></Route>
  <Route path="/banner" element={<Banner/>}></Route>

</Routes>
</BrowserRouter>
  );
}
export default App;