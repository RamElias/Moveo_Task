import React, {useState} from 'react';
import {Link} from 'react-router-dom';

const Navbar = () => {
    const [isNavbarOpen, setNavbarOpen] = useState(false);

    const toggleNavbar = () => {
        setNavbarOpen(!isNavbarOpen);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: '#e3f2fd' }}>
            <div className="container">

                <div className={`navbar-collapse ${isNavbarOpen ? 'show' : ''}`}>
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">
                                <span style={{ fontSize: '30px' }}>Home</span>
                            </Link>
                        </li>
                        {/*<li className="nav-item">*/}
                        {/*    <Link className="nav-link" to="/codeblock1">*/}
                        {/*        <span style={{ fontSize: '30px' }}>mission 1</span>*/}
                        {/*    </Link>*/}
                        {/*</li>*/}
                        {/*<li className="nav-item">*/}
                        {/*    <Link className="nav-link" to="/codeblock2">*/}
                        {/*        <span style={{ fontSize: '30px' }}>mission 2</span>*/}
                        {/*    </Link>*/}
                        {/*</li>*/}
                        {/*<li className="nav-item">*/}
                        {/*    <Link className="nav-link" to="/codeblock3">*/}
                        {/*        <span style={{ fontSize: '30px' }}>mission 3</span>*/}
                        {/*    </Link>*/}
                        {/*</li>*/}
                        {/*<li className="nav-item">*/}
                        {/*    <Link className="nav-link" to="/codeblock4">*/}
                        {/*        <span style={{ fontSize: '30px' }}>mission 4</span>*/}
                        {/*    </Link>*/}
                        {/*</li>*/}
                    </ul>
                </div>
            </div>
        </nav>
    );

};

export default Navbar;
