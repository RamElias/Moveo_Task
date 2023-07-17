import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import hljs from 'highlight.js';

const CodeBlockPage = () => {
    const { id } = useParams();
    const [codeBlock, setCodeBlock] = useState(null);

    useEffect(() => {
        const fetchCodeBlock = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/codeblocks/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    console.log('Fetched code block:', data);
                    setCodeBlock(data);
                } else {
                    console.log('Error fetching code block:', response.status);
                }
            } catch (error) {
                console.log('Error fetching code block:', error);
            }
        };
        fetchCodeBlock();
    }, [id]);

    useEffect(() => {
        hljs.highlightAll(); // Apply syntax highlighting to the code block
    }, [codeBlock]);

    if (!codeBlock) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Code Block {id}</h1>
            <h2>{codeBlock.title}</h2>
            <pre>
        <code className="javascript">{codeBlock.code}</code>
      </pre>
        </div>
    );
};

export default CodeBlockPage;
