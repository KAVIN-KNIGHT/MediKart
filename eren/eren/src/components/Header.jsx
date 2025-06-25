import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo (2).png';
import '../styles/header.css';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    
    const storedUser = localStorage.getItem('medikartUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }

    const handleScroll = () => setScrolled(window.scrollY > 50);
    const handleResize = () => {
      if (window.innerWidth > 992 && isMenuOpen) {
        setIsMenuOpen(false);
        document.body.style.overflow = 'auto';
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = !isMenuOpen ? 'hidden' : 'auto';
  };

  const openModal = (modalType) => {
    if (modalType === 'login') setIsLoginModalOpen(true);
    else setIsRegisterModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const res = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');

      setUser(data.user || data);  // Adjust based on your backend response
      setIsLoggedIn(true);
      localStorage.setItem('medikartUser', JSON.stringify(data.user || data));
      closeModal();
    } catch (error) {
      alert('Login failed: ' + error.message);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const phone = e.target.phone.value;
    const password = e.target.password.value;

    try {
      const res = await fetch('http://localhost:3001/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Registration failed');

      alert('Registration successful! You can now login.');
      closeModal();
      openModal('login');
    } catch (error) {
      alert('Registration failed: ' + error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('medikartUser');
    setUser(null);
    setIsLoggedIn(false);
  };

  const handleNavLinkClick = () => {
    if (window.innerWidth <= 992) {
      setIsMenuOpen(false);
      document.body.style.overflow = 'auto';
    }
  };

  return (
    <>
      <header className={`header-container ${scrolled ? 'scrolled' : ''}`}>
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="Pharmacy Logo" />
            <p>MediKart</p>
          </Link>
        </div>

        <div className={`menu-icon ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
          {isMenuOpen ? '✕' : '☰'}
        </div>

        <nav className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <ul>
            <li><Link to="/" onClick={handleNavLinkClick}>Home</Link></li>
            <li><Link to="/products" onClick={handleNavLinkClick}>Products</Link></li>
            <li><Link to="/doctors" onClick={handleNavLinkClick}>Find Doctors</Link></li>
            <li><Link to="/about" onClick={handleNavLinkClick}>About Us</Link></li>
            <li><a href="#" onClick={handleNavLinkClick}>Health Records</a></li>
            <li><a href="#" onClick={handleNavLinkClick}>Diabetes Care</a></li>
            <li><a href="#" onClick={handleNavLinkClick}>Health Insurance</a></li>
          </ul>
        </nav>

        <div className="login-cart">
          <Link to="/cart" className="cart-link">
            <span className="cart-icon">🛒</span>
          </Link>
          {isLoggedIn ? (
            <div className="user-dropdown">
              <button className="user-btn">👤 {user?.name}</button>
              <div className="dropdown-content">
                <Link to="/profile">Profile</Link>
                <button onClick={handleLogout}>Logout</button>
              </div>
            </div>
          ) : (
            <button className="login-btn" onClick={() => openModal('login')}>Login</button>
          )}
        </div>
      </header>

      {isMenuOpen && <div className="menu-overlay" onClick={toggleMenu}></div>}

      {/* Login Modal */}
      {isLoginModalOpen && (
        <div className="modal active">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label htmlFor="loginEmail">Email:</label>
                <input type="email" name="email" id="loginEmail" required />
              </div>
              <div className="form-group">
                <label htmlFor="loginPassword">Password:</label>
                <input type="password" name="password" id="loginPassword" required />
              </div>
              <button type="submit">Login</button>
              <p className="text">
                Don't have an account?{' '}
                <button type="button" className="link-btn" onClick={() => { closeModal(); openModal('register'); }}>
                  Register
                </button>
              </p>
            </form>
          </div>
        </div>
      )}

      {/* Register Modal */}
      {isRegisterModalOpen && (
        <div className="modal active">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
              <div className="form-group">
                <label htmlFor="fullName">Full Name:</label>
                <input type="text" name="name" id="fullName" required />
              </div>
              <div className="form-group">
                <label htmlFor="registerEmail">Email:</label>
                <input type="email" name="email" id="registerEmail" required />
              </div>
              <div className="form-group">
                <label htmlFor="registerPhone">Phone:</label>
                <input type="tel" name="phone" id="registerPhone" required />
              </div>
              <div className="form-group">
                <label htmlFor="registerPassword">Password:</label>
                <input type="password" name="password" id="registerPassword" required />
              </div>
              <button type="submit">Register</button>
              <p className="text">
                Already have an account?{' '}
                <button type="button" className="link-btn" onClick={() => { closeModal(); openModal('login'); }}>
                  Login
                </button>
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
