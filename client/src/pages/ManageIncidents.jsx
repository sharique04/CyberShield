import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/axios';

function ManageIncidents() {
  const [incidents, setIncidents] = useState([]);
  const [error, setError] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const fetchIncidents = async () => {
    try {
      const res = await API.get('/incidents/all');
      setIncidents(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load incidents');
    }
  };

  useEffect(() => {
    fetchIncidents();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await API.put(`/incidents/${id}`, { status: newStatus });
      setIncidents(
        incidents.map((inc) => (inc._id === id ? { ...inc, status: newStatus } : inc))
      );
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update status');
    }
  };

  const severityColor = {
    Low: '#22c55e',
    Medium: '#eab308',
    High: '#f97316',
    Critical: '#ef4444',
  };

  const statusColor = {
    Open: '#ef4444',
    'In Progress': '#eab308',
    Resolved: '#22c55e',
  };

  const filteredIncidents =
    filterStatus === 'All' ? incidents : incidents.filter((inc) => inc.status === filterStatus);

  return (
    <div className="dashboard-container" style={{ maxWidth: '900px' }}>
      <h2>🛠️ Manage All Incidents</h2>
      {error && <p className="error-message">{error}</p>}

      <div style={{ marginBottom: '16px' }}>
        <label style={{ marginRight: '8px', fontWeight: 600 }}>Filter by status:</label>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          style={{ padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
        >
          <option>All</option>
          <option>Open</option>
          <option>In Progress</option>
          <option>Resolved</option>
        </select>
      </div>

      {filteredIncidents.length === 0 && !error && <p>No incidents found.</p>}

      {filteredIncidents.map((incident) => (
        <div
          key={incident._id}
          style={{
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '12px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0 }}>{incident.title}</h3>
            <span
              style={{
                background: severityColor[incident.severity],
                color: 'white',
                padding: '4px 10px',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: 600,
              }}
            >
              {incident.severity}
            </span>
          </div>
          <p style={{ margin: '8px 0', color: '#475569' }}>{incident.description}</p>
          <p style={{ fontSize: '13px', color: '#64748b' }}>
            Category: {incident.category} | Reported by: {incident.reportedBy?.name} ({incident.reportedBy?.email})
          </p>
          <p style={{ fontSize: '13px', color: '#64748b' }}>
            Reported: {new Date(incident.createdAt).toLocaleString()}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
            <span
              style={{
                background: statusColor[incident.status],
                color: 'white',
                padding: '4px 10px',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: 600,
              }}
            >
              {incident.status}
            </span>
            <select
              value={incident.status}
              onChange={(e) => handleStatusChange(incident._id, e.target.value)}
              style={{ padding: '6px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
            >
              <option>Open</option>
              <option>In Progress</option>
              <option>Resolved</option>
            </select>
          </div>
        </div>
      ))}

      <p className="auth-footer">
        <Link to="/dashboard">← Back to Dashboard</Link>
      </p>
    </div>
  );
}

export default ManageIncidents;