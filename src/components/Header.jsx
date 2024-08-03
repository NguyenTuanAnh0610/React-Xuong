import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "./../contexts/AuthContext";

export default function Header() {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?query=${searchQuery}`);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        {isAuthenticated ? (
          <>
            <li>
              <span>Welcome, {user?.email}</span>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
            <li>
              <Link to="/admin">Admin</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link> {" / "}
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
        <li className="search-bar">
          <form className="searchproduct" onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </form>
        </li>
      </ul>
    </header>
  );
}
