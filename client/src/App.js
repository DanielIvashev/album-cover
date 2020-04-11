import React from 'react';
import useRoutes from "./routes";
import {BrowserRouter} from "react-router-dom";
import {useAuth} from "./hooks/auth.hook";
import {AuthContext} from "./context/AuthContext";
import {Loader} from "./components/loader";
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
    const {token, login, logout, userId, ready, userName} = useAuth();
    const isAuthenticated = !!token;

    const routes = useRoutes(isAuthenticated);
    if (!ready) {
        return <Loader/>
    }
  return (
    <AuthContext.Provider value={{
        token, login, logout, userId, isAuthenticated
    }}>
        <BrowserRouter>
            <span style={{position: 'absolute', right: '0', padding: '.375rem .75rem'}}>hi, {userName}!</span>
            { routes }
        </BrowserRouter>

    </AuthContext.Provider>
  );
}

export default App;
