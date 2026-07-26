import { useNavigate, Link } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!user) {
    navigate('/login');
    return null;
  }

return (
    <div className="dashboard-container">
      <h2>Welcome, {user.name} 👋</h2>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
      <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
        <Link to="/report-incident" className="btn-primary" style={{ textDecoration: 'none', textAlign: 'center' }}>
          🚨 Report Incident
        </Link>
        <Link to="/my-incidents" className="btn-primary" style={{ textDecoration: 'none', textAlign: 'center' }}>
          📋 My Incidents
        </Link>
      </div>
      <button onClick={handleLogout} className="btn-logout" style={{ marginTop: '20px' }}>
        Logout
      </button>
    </div>
  );
}

export default Dashboard;