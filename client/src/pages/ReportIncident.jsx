import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api/axios';
import Navbar from '../components/Navbar';

function ReportIncident() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Phishing',
    severity: 'Medium',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await API.post('/incidents', formData);
      setSuccess('Incident reported successfully!');
      setTimeout(() => navigate('/my-incidents'), 1000);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <>
      <Navbar />
      <div className="auth-container">
        <h2>🚨 Report an Incident</h2>
        {error && <p className="error-message">{error}</p>}
        {success && <p style={{ color: 'green', textAlign: 'center', marginBottom: '16px' }}>{success}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
            />
          </div>
          <div className="form-group">
            <label>Category</label>
            <select name="category" value={formData.category} onChange={handleChange} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
              <option>Phishing</option>
              <option>Malware</option>
              <option>Ransomware</option>
              <option>Unauthorized Access</option>
              <option>Data Breach</option>
              <option>Other</option>
            </select>
          </div>
          <div className="form-group">
            <label>Severity</label>
            <select name="severity" value={formData.severity} onChange={handleChange} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
              <option>Critical</option>
            </select>
          </div>
          <button type="submit" className="btn-primary">Submit Report</button>
        </form>
      </div>
    </>
  );
}

export default ReportIncident;