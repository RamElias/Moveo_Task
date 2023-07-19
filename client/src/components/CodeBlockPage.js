import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Highlight from 'react-highlight';

const CodeBlockPage = () => {
    const { id } = useParams();
    const [codeBlock, setCodeBlock] = useState({ title: '', code: '', solution: ''});
    const [buttonClicked, setButtonClicked] = useState(false);
    const [showSmiley, setShowSmiley] = useState(false);
    const ws = useRef(null);

    useEffect(() => {
        // Fetch the initial code block
        fetch(`/api/codeblocks/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setCodeBlock(data);
            });

        // Establish WebSocket connection
        ws.current = new WebSocket('ws://localhost:5000');

        // Listen for code updates from the server
        ws.current.onmessage = (event) => {
            const { id: updatedId, code: updatedCode } = JSON.parse(event.data);
            if (updatedId === id) {
                setCodeBlock((prevBlock) => ({ ...prevBlock, code: updatedCode }));
            }
        };

        return () => {
            // Close WebSocket connection when component unmounts
            ws.current.close();
        };
    }, [id]);

    const handleCodeChange = (event) => {
        const updatedCode = event.target.value;
        setCodeBlock((prevBlock) => ({...prevBlock, code: updatedCode}));
        // Send the code update to the server
        ws.current.send(JSON.stringify({ id, code: updatedCode }));
    };

    const handleCheckCode = () => {
        setButtonClicked(true);
        setTimeout(() => setButtonClicked(false), 5000); // Display for 3 seconds

        const trimmedCode = codeBlock.code.trim().replace(/\r\n/g, '\n');
        const trimmedSolution = codeBlock.solution.trim().replace(/\r\n/g, '\n');

        if (trimmedCode === trimmedSolution) // Code matches the solution
            setShowSmiley(true);
        else // Code does not match the solution
            setShowSmiley(false);
    };


    return (
        <div className="container-fluid">
            <div className="row justify-content-center mt-5">
                <div className="col-lg-12">
                    <div className="text-center" style={{ fontFamily: 'Tahoma', fontSize: '3rem' }}>{codeBlock.title} </div>
                    <div className="row">
                        <div className="col-6">
              <textarea
                  className="form-control"
                  rows="10"
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
                        {buttonClicked &&(
                        showSmiley ? (
                            <div>
                                <p className="text-success">Success! Keep up the good work! 😃</p>
                            </div>
                        ) :(
                            <div>
                                <p className="text-danger">Try again! You can do it! 😢</p>
                            </div>
                        )
                            )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CodeBlockPage;
