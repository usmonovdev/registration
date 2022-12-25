import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './personalAuth/Context';
import PersonalAuth from './personalAuth/PersonalAuth';
import "./simpleAuth/style.css"

function App() {

    return (
        <AuthContextProvider>
            <BrowserRouter >
                <PersonalAuth />
            </BrowserRouter>
        </AuthContextProvider>
    );
}

export default App;
