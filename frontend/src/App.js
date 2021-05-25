// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage";
import "./index.css";
import Apartment from "./components/Apartment";

console.log(process.env);
const { REACT_APP_NOT_SECRET_CODE } = process.env;

console.log(REACT_APP_NOT_SECRET_CODE);

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);
  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/login">
            <div className="content-container">
              <LoginFormPage />
            </div>
          </Route>
          <Route exact path="/signup">
            <div className="content-container">
              <SignupFormPage />
            </div>
          </Route>
          <Route path={`/apartment/:id`}>
            <h1>Hello world</h1>
            <Apartment />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
