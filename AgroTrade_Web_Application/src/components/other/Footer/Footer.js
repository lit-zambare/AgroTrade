import './styles.scss';
import React from 'react';


const Footer = React.FunctionComponent = () => (
  <footer className="footer">
    <div className="container">
      <div className="copyright">&copy; {new Date().getFullYear()} AgroTrade</div>
    </div>
  </footer>
);

export default Footer;
