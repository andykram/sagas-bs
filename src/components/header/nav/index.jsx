import React from 'react';
import { Link } from 'react-router-dom';

import home from 'routes/home';
import signUp from 'routes/signUp';

export default function HeaderNav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to={home.path}>Home</Link>

        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={signUp.path} className="nav-link">
                Sign Up | Sign In
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
