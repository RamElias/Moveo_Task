import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import hljs from 'highlight.js';

function CodeBlockPage() {
    const { id } = useParams();
    const [code, setCode] = useState('');
    const socket = io();

    useEffect(() => {
        const fetchCodeBlock = async () => {
            try {
                const response = await fetch(`/api/codeblocks/${id}`);
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
        socket.on('codeUpdate', (newCode) => {
            setCode(newCode);
            hljs.highlightAll();
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    const handleCodeChange = (event) => {
        const newCode = event.target.value;
        socket.emit('codeUpdate', newCode);
    };

    return (
        <div>
            <h1>Code Block {id}</h1>
            <pre>
        <code className="javascript">{code}</code>
      </pre>
            <textarea
                className="code-input"
                value={code}
                onChange={handleCodeChange}
            ></textarea>
        </div>
    );
}

export default CodeBlockPage;
