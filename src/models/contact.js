const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const ContactSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4
  },
  userId: {
    type: String,
    ref: 'User',
    required: true
  },
  contacts: [{
    type: String,
    ref: 'User'
  }]
}, {
  timestamps: true // This will add createdAt and updatedAt fields
});

// Ensure virtual fields are serialized
ContactSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) { delete ret._id; }
});

// Create an index for faster queries
ContactSchema.index({ userId: 1 });

exports.Contact = mongoose.model('Contact', ContactSchema);