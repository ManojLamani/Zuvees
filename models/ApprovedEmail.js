// models/ApprovedEmail.js
const mongoose = require('mongoose');

const approvedEmailSchema = new mongoose.Schema({
  email: { type: String, required: true },
});

module.exports = mongoose.model('ApprovedEmail', approvedEmailSchema);
