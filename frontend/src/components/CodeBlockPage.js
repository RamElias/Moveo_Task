import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import hljs from 'highlight.js';


function CodeBlockPage() {
    const { id } = useParams();
    const [code, setCode] = useState('');
    const socket = io('http://localhost:3001');

    useEffect(() => {
        const fetchCodeBlock = async () => {
            try {
                const response = await fetch(`/api/codeblocks/${id}`); // Replace '/api/codeblocks' with your server's code block endpoint
                const data = await response.json();
                if (response.ok) {
                    setCode(data.code);
                } else {
                    // Handle error scenario
                }
            } catch (error) {
                // Handle error scenario
            }
        };

        fetchCodeBlock();
    }, [id]);


    useEffect(() => {
        const socket = io();
        socket.on('codeUpdate', (newCode) => {
            setCode(newCode);
            hljs.highlightAll();
        });
        return () => {
            socket.disconnect();
        };
    }, []);




    return (
        <div>
            <h1>Code Block {id}</h1>
            <pre>
        <code className="javascript">{code}</code>
      </pre>
        </div>
    );
}

export default CodeBlockPage;
