import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import LobbyPage from './components/LobbyPage';
import CodeBlockPage from './components/CodeBlockPage';

function App() {
    return (
        <div style= {{ backgroundImage: 'linear-gradient(to right, #4e61fe, #0097ff, #00beff, #62def8, #c5f8f6)', height: '120vh' }}>
            <Router>
                <Navbar />
                <Routes>
                    <Route exact path="/" element={<LobbyPage />} />
                    <Route path="/codeblock/:id" element={<CodeBlockPage />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
