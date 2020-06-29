import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import './App.css';
import { KeycloakProvider } from '@react-keycloak/web'
import keycloak from './components/keycloak/keycloak'
import {AppRouter} from './components/routes'

const App = () => {
    return (
      <KeycloakProvider keycloak={keycloak}>
      <BrowserRouter>
        <div className="App">
          <AppRouter/>
        </div>
      </BrowserRouter>
      </KeycloakProvider>
    );
  }
  

export default App;
