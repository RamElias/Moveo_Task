import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function LobbyPage() {
    const [codeBlocks, setCodeBlocks] = useState([]);

    useEffect(() => {
        // Fetch code blocks from the server
        fetch('/api/codeblocks')
            .then((response) => response.json())
            .then((data) => setCodeBlocks(data))
            .catch((error) => console.error('Error fetching code blocks:', error));
    }, []);

    return (
        <div className="container mt-4">
            <div className="text-center mb-4" style={{ fontFamily: 'Tahoma', fontSize: '3rem' }}>Choose Code Mission</div>
            <div className="row">
                {codeBlocks.map((block) => (
                    <div key={block.id} className="col-md-6 mb-4">
                        <div className="card h-100 shadow" >
                            <div className="card-body d-flex align-items-center justify-content-center"
                                 style= {{ backgroundImage: 'linear-gradient(to right bottom, #45ddf4, #6be6f4, #88eef6, #a2f7f8, #bafffc)', height: '150px' }} >
                                <Link to={`/codeblock/${block.id}`} className="text-decoration-none">
                                    <h5 className="card-title text-center" style={{ fontFamily: 'Lucida Console', fontSize: '2rem' }}>{block.title}</h5>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default LobbyPage;
