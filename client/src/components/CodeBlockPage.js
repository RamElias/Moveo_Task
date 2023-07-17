import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import hljs from 'highlight.js';

const CodeBlockPage = () => {
    const {id} = useParams();
    const [codeBlock, setCodeBlock] = useState([{}]);

    useEffect(() => {
        fetch(`http://localhost:5000/api/codeblocks/${id}`)
            .then(response => response.json())
            .then(data => {
                setCodeBlock(data)
            })
    }, [id]);

    useEffect(() => {
        hljs.highlightAll();
    }, [codeBlock]);

    return (
        <div>
            <h1>Code Block {id}</h1>
            {codeBlock.length === 0 ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <h2>{codeBlock.title}</h2>
                    <pre>
                    <code>{codeBlock.code}</code>
                </pre>
                </div>
            )}
        </div>
    );

}

export default CodeBlockPage;
