import React, { Component } from "react";
import "./App.css";
import Home from "./Home";
import Saved from "./Saved";
import Header from "./Header";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
         <div>
           <Header />
           <Route exact path="/" component={Home} />
           <Route path="/Saved" component={Saved} />
         </div>
       </Switch>
    </Router>
  );
}


export default App;
