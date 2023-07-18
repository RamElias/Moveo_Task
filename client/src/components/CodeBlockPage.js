import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import hljs from 'highlight.js';
import 'highlight.js/styles/default.css'; // Import the highlight.js default CSS
import Highlight from 'react-highlight';

const CodeBlockPage = () => {
    const { id } = useParams();
    const [codeBlock, setCodeBlock] = useState({ title: '', code: '', solution: ''});
    const [showSmiley, setShowSmiley] = useState(false);
    const ws = useRef(null);

    useEffect(() => {
        // Fetch the initial code block
        fetch(`/api/codeblocks/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setCodeBlock(data);
                hljs.highlightAll();
            });

        // Establish WebSocket connection
        ws.current = new WebSocket('ws://localhost:5000');

        // Listen for code updates from the server
        ws.current.onmessage = (event) => {
            const { id: updatedId, code: updatedCode } = JSON.parse(event.data);
            if (updatedId === id) {
                setCodeBlock((prevBlock) => ({ ...prevBlock, code: updatedCode }));
            }
            hljs.highlightAll();
        };

        return () => {
            // Close WebSocket connection when component unmounts
            ws.current.close();
        };
    }, [id]);

    const handleCodeChange = (event) => {
        const updatedCode = event.target.value;
        setCodeBlock((prevBlock) => ({...prevBlock, code: updatedCode}));
        hljs.highlightAll();
        // Send the code update to the server
        ws.current.send(JSON.stringify({ id, code: updatedCode }));
    };

    const handleCheckCode = () => {
        console.log(codeBlock.code);
        console.log(codeBlock.solution);
        if (codeBlock.code.trim() === codeBlock.solution.trim()) {
            console.log("equal");
            // Code matches the solution
            setShowSmiley(true);
            setTimeout(() => setShowSmiley(false), 3000); // Display for 3 seconds
        } else {
            // Code does not match the solution
            setShowSmiley(false);
        }
    };


    return (
        <div className="container-fluid">
            <div className="row justify-content-center mt-5">
                <div className="col-lg-12">
                    <h1 className="text-center">Code Block {id}</h1>
                    <h2 className="text-center">{codeBlock.title}</h2>
                    <div className="row">
                        <div className="col-6">
              <textarea
                  className="form-control"
                  rows="15"
                  value={codeBlock.code}
                  onChange={handleCodeChange}
              />
                        </div>
                        <div className="col-6">
              <pre className="form-control" style={{ whiteSpace: 'pre-wrap' }}>
                <Highlight className="javascript">{codeBlock.code}</Highlight>
              </pre>
                        </div>
                    </div>
                    <div className="text-center mt-3">
                        <button className="btn btn-primary" onClick={handleCheckCode}>
                            Check Code
                        </button>
                        {showSmiley && (
                            <div>
                                <p className="text-success">Success! Keep up the good work! 😃</p>
                            </div>
                        )}
                        {!showSmiley && (
                            <div>
                                <p className="text-danger">Try again! You can do it! 😢</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CodeBlockPage;
