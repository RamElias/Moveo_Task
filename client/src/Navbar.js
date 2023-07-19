import React, {useState} from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isNavbarOpen, setNavbarOpen] = useState(false);

    const toggleNavbar = () => {
        setNavbarOpen(!isNavbarOpen);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light"
             style= {{ backgroundImage: 'linear-gradient(to right, #4e61fe, #0097ff, #00beff, #62def8, #c5f8f6)',
                       borderBottom: '2px solid #85C1E9'}}>
            <div className="container">
                <button
                    className="navbar-toggler"
                    type="button"
                    onClick={toggleNavbar}
                >
                    <span className="navbar-toggler-icon" />
                </button>

                <div className={`collapse navbar-collapse ${isNavbarOpen ? 'show' : ''}`}>
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">
                                Home
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
