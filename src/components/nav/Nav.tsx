import React from 'react';
import './Nav.css';
import { Link } from 'react-router-dom';

function Nav(){
    const photo = "react";

    return ( 
        <nav>
            <h3>Logo</h3>
            <ul className="nav-links">
                <Link to="/about"><li>About</li>  </Link><br/>
                <Link to="/home"><li>Home</li>  </Link><br/>
               
                <Link to={'/:'+photo}><li>ResultsPage</li>  </Link><br/>
            </ul>
        </nav>
    )
}

export default Nav;