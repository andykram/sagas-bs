import React from 'react';
import { Link } from 'react-router-dom';

import pp from 'routes/privacyPolicy';
import tos from 'routes/termsOfService';

export default function Footer() {
  return (
    <footer className="footer inverted">
      <div className="container">
        Copyright whenever, whoever.
        <Link to={pp.path}>Privacy Policy</Link>
        <Link to={tos.path}>Terms of Service</Link>
      </div>
    </footer>
  );
}
