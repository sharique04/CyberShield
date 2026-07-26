const Incident = require('../models/Incident');

// @desc Create a new incident
exports.createIncident = async (req, res) => {
  try {
    const { title, description, category, severity } = req.body;

    const incident = await Incident.create({
      title,
      description,
      category,
      severity,
      reportedBy: req.user._id,
    });

    res.status(201).json(incident);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get all incidents reported by the logged-in user
exports.getMyIncidents = async (req, res) => {
  try {
    const incidents = await Incident.find({ reportedBy: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(incidents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get all incidents (admin/dashboard view)
exports.getAllIncidents = async (req, res) => {
  try {
    const incidents = await Incident.find().populate('reportedBy', 'name email').sort({ createdAt: -1 });
    res.status(200).json(incidents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Update incident status
exports.updateIncidentStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const incident = await Incident.findById(req.params.id);

    if (!incident) {
      return res.status(404).json({ message: 'Incident not found' });
    }

    incident.status = status || incident.status;
    await incident.save();

    res.status(200).json(incident);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Delete an incident
exports.deleteIncident = async (req, res) => {
  try {
    const incident = await Incident.findById(req.params.id);

    if (!incident) {
      return res.status(404).json({ message: 'Incident not found' });
    }

    await incident.deleteOne();
    res.status(200).json({ message: 'Incident deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};