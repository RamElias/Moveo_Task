import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import LobbyPage from './components/LobbyPage';
import CodeBlockPage from './components/CodeBlockPage';
import '../node_modules/highlight.js/styles/magula.css'

function App() {
    return (
        <Router>
            <Navbar/>
            <Routes>
                <Route exact path="/" element={<LobbyPage />} />
                <Route path="/codeblock/:id" element={<CodeBlockPage />} />
            </Routes>
        </Router>
    );
}

export default App;
