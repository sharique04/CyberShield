import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!user) return null;

  return (
    <nav className="navbar">
      <div className="navbar-brand">🛡️ CyberShield</div>
      <div className="navbar-links">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/report-incident">Report</Link>
        <Link to="/my-incidents">My Incidents</Link>
        <Link to="/manage-incidents">Manage</Link>
        <span className="navbar-user">{user.name}</span>
        <button onClick={handleLogout} className="btn-logout" style={{ padding: '6px 14px', fontSize: '12px' }}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;