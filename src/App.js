import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './simpleAuth/context/AuthContext';
import SimpleApp from './simpleAuth/SimpleApp';
import "./simpleAuth/style.css"

function App() {

    return (
        <BrowserRouter >
            <AuthProvider>
                <SimpleApp />
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
