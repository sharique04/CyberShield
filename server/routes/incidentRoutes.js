const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  createIncident,
  getMyIncidents,
  getAllIncidents,
  updateIncidentStatus,
  deleteIncident,
} = require('../controllers/incidentController');

router.post('/', protect, createIncident);
router.get('/my', protect, getMyIncidents);
router.get('/all', protect, getAllIncidents);
router.put('/:id', protect, updateIncidentStatus);
router.delete('/:id', protect, deleteIncident);

module.exports = router;