import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { MenuIcon, XIcon, UserIcon, LogOutIcon } from 'lucide-react';
const Header: React.FC = () => {
  const {
    user,
    isAuthenticated,
    isAdmin,
    logout
  } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  return <header className="bg-green-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Delta_State_Logo.png/640px-Delta_State_Logo.png" alt="Delta State Logo" className="h-10 w-10 object-contain" />
            <div>
              <h1 className="text-xl font-bold">Delta State</h1>
              <p className="text-xs">Certificate of Origin Portal</p>
            </div>
          </Link>
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="hover:text-green-200">
              Home
            </Link>
            {isAuthenticated ? <>
                <Link to="/dashboard" className="hover:text-green-200">
                  Dashboard
                </Link>
                <Link to="/apply" className="hover:text-green-200">
                  Apply
                </Link>
                {isAdmin && <Link to="/admin" className="hover:text-green-200">
                    Admin
                  </Link>}
                <div className="flex items-center space-x-2">
                  <span className="text-sm">{user?.name}</span>
                  <button onClick={handleLogout} className="flex items-center text-white hover:text-green-200">
                    <LogOutIcon size={18} className="mr-1" />
                    <span>Logout</span>
                  </button>
                </div>
              </> : <>
                <Link to="/login" className="hover:text-green-200">
                  Login
                </Link>
                <Link to="/register" className="bg-white text-green-800 px-4 py-2 rounded-md hover:bg-green-100">
                  Register
                </Link>
              </>}
          </nav>
          {/* Mobile Menu Button */}
          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>
        {/* Mobile Menu */}
        {mobileMenuOpen && <nav className="md:hidden mt-4 pb-4 space-y-3">
            <Link to="/" className="block hover:text-green-200" onClick={() => setMobileMenuOpen(false)}>
              Home
            </Link>
            {isAuthenticated ? <>
                <Link to="/dashboard" className="block hover:text-green-200" onClick={() => setMobileMenuOpen(false)}>
                  Dashboard
                </Link>
                <Link to="/apply" className="block hover:text-green-200" onClick={() => setMobileMenuOpen(false)}>
                  Apply
                </Link>
                {isAdmin && <Link to="/admin" className="block hover:text-green-200" onClick={() => setMobileMenuOpen(false)}>
                    Admin
                  </Link>}
                <div className="pt-2 border-t border-green-700">
                  <div className="flex items-center space-x-2 mb-2">
                    <UserIcon size={16} />
                    <span className="text-sm">{user?.name}</span>
                  </div>
                  <button onClick={() => {
              handleLogout();
              setMobileMenuOpen(false);
            }} className="flex items-center text-white hover:text-green-200">
                    <LogOutIcon size={16} className="mr-1" />
                    <span>Logout</span>
                  </button>
                </div>
              </> : <>
                <Link to="/login" className="block hover:text-green-200" onClick={() => setMobileMenuOpen(false)}>
                  Login
                </Link>
                <Link to="/register" className="block bg-white text-green-800 px-4 py-2 rounded-md hover:bg-green-100 text-center" onClick={() => setMobileMenuOpen(false)}>
                  Register
                </Link>
              </>}
          </nav>}
      </div>
    </header>;
};
export default Header;