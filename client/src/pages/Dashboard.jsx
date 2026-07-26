import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

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
    <>
      <Navbar />
      <div className="dashboard-container">
        <h2>Welcome, {user.name} 👋</h2>
        <p>Email: {user.email}</p>
        <p>Role: {user.role}</p>
      </div>
    </>
  );
}

export default Dashboard;