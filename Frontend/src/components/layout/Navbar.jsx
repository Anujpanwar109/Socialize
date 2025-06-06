import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'


function Navbar() {
  const { user, logout } = useAuth()
  const[isMenuOpen,setIsMenuOpen]=useState(false)

  const handleLogout = () => {
    logout()
    setIsMenuOpen(false)
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo">Social Media</Link>

        <div className="nav-links">
          {user ? (
            <>
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/create" className="nav-link">Create</Link>
              <Link to="/profile" className="nav-link profile-link">
                <div className="avatar">
                  {user.name?.[0] || 'U'}
                </div>
                Profile
              </Link>
              <button onClick={handleLogout} className="nav-link">Logout</button>
            </>
          ) : (
            <Link to="/login" className="nav-link">Login</Link>
          )}
        </div>



         {/* Mobile Menu Button */}
          <button
          onClick={()=>setIsMenuOpen(!isMenuOpen)}
          className='md:hidden'
          >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>

          </button>

      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-300 bg-white">
          {user ? (
            <div className="flex flex-col p-4">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="py-2 text-gray-900">Home</Link>
              <Link to="/create" onClick={() => setIsMenuOpen(false)} className="py-2 text-gray-900">Create</Link>
              <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="py-2 text-gray-900">Profile</Link>
              <button onClick={handleLogout} className="py-2 text-left text-gray-900">Logout</button>
            </div>
          ) : (
            <div className="p-4">
              <Link to="/login" onClick={() => setIsMenuOpen(false)} className="block py-2 text-gray-900">Login</Link>
            </div>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar
