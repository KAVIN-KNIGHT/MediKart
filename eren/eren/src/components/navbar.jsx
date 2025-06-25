import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo (2).png'; // Update the path to your logo
import '../styles/global.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header>
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="Pharmacy Logo" />
          <p>MediKart</p>
        </Link>
      </div>
      <div className={`menu-icon ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
        {isMenuOpen ? '✕' : '☰'}
      </div>
      <nav>
        <ul className={isMenuOpen ? 'active' : ''}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/doctors">Find Doctors</Link></li>
          <li><Link to="#">Health Records</Link></li>
          <li><Link to="#">Diabetes Care</Link></li>
          <li><Link to="#">Health Insurance</Link></li>
        </ul>
      </nav>
      <div className="login-cart">
        <Link to="/cart" className="cart-link">
          <span className="cart-icon">🛒</span>
        </Link>
        <button onClick={() => openModal('loginModal')}>Login</button>
      </div>
    </header>
  );
};

export default Navbar;