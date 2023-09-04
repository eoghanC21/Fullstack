const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  attendance: {
    type: String,
    enum: ['Attended', 'Cancelled', 'No Show'],
    required: true
  }
});

const tutorialSchema = mongoose.Schema({
  tutorialDate: {
    type: Date,
    required: true
  },
  tutorialTime: {
    type: String,
    required: true
  },
  students: {
    type: [studentSchema],
    required: true
  },
  tutor: {
    type: String,
    required: true
  },
  fee: {
    type: Number,
    required: true
  },
  tutorialNumber: {
    type: Number,
    required: true
  },
  tutorialSubject: {
    type: String,
    enum: ['English', 'Irish', 'Maths', 'Biology', 'Chemistry', 'Physics', 'Computer Science'],
    required: true
  },
  tutorialNotes: {
    type: String,
    required: true
  },
  otherDetail: {
    type: String
  }
});

const Tutorial = mongoose.model('Tutorial', tutorialSchema);

module.exports = Tutorial;
