import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ReportIncident from './pages/ReportIncident';
import MyIncidents from './pages/MyIncidents';
import ManageIncidents from './pages/ManageIncidents';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/report-incident" element={<ReportIncident />} />
        <Route path="/my-incidents" element={<MyIncidents />} />
        <Route path="/manage-incidents" element={<ManageIncidents />} />
      </Routes>
    </Router>
  );
}

export default App;