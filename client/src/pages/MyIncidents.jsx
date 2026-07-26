import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/axios';

function MyIncidents() {
  const [incidents, setIncidents] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const res = await API.get('/incidents/my');
        setIncidents(res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load incidents');
      }
    };
    fetchIncidents();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this incident?')) return;
    try {
      await API.delete(`/incidents/${id}`);
      setIncidents(incidents.filter((inc) => inc._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete incident');
    }
  };

  const severityColor = {
    Low: '#22c55e',
    Medium: '#eab308',
    High: '#f97316',
    Critical: '#ef4444',
  };

  return (
    <div className="dashboard-container" style={{ maxWidth: '800px' }}>
      <h2>📋 My Reported Incidents</h2>
      {error && <p className="error-message">{error}</p>}
      {incidents.length === 0 && !error && <p>No incidents reported yet.</p>}
      {incidents.map((incident) => (
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
            Category: {incident.category} | Status: <strong>{incident.status}</strong> | Reported: {new Date(incident.createdAt).toLocaleString()}
          </p>
          <button
            onClick={() => handleDelete(incident._id)}
            style={{
              marginTop: '8px',
              padding: '6px 14px',
              background: '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            🗑️ Delete
          </button>
        </div>
      ))}

      <p className="auth-footer">
        <Link to="/dashboard">← Back to Dashboard</Link>
      </p>
    </div>
  );
}

export default MyIncidents;