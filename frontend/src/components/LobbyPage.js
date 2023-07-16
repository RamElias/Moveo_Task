import React from 'react';
import { Link } from 'react-router-dom';

function LobbyPage() {
    const codeBlocks = [
        { id: 1, name: 'Async case' },
        { id: 2, name: 'Event handling' },
        { id: 3, name: 'Data manipulation' },
        { id: 4, name: 'Promises' },
    ];

    const renderCodeBlocks = () => {
        return codeBlocks.map((codeBlock) => (
            <li key={codeBlock.id}>
                <Link to={`/codeblock/${codeBlock.id}`}>{codeBlock.title}</Link>
            </li>
        ));
    };


    return (
        <div>
            <h1>Choose code block</h1>
            <ul>
                {codeBlocks.map((block) => (
                    <li key={block.id}>
                        <Link to={`/codeblock/${block.id}`}>{block.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default LobbyPage;
