const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const MessageSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4
  },
  text: {
    type: String,
    required: true
  },
  recipientId: {
    type: String,
    ref: 'User',
    required: true
  },
  senderId: {
    type: String,
    ref: 'User',
    required: true
  },
  isRead: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true // This will add createdAt and updatedAt fields
});

// Ensure virtual fields are serialized
MessageSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) { delete ret._id; }
});

// Create an index for faster queries
MessageSchema.index({ recipientId: 1, senderId: 1, createdAt: -1 });

exports.Message = mongoose.model('Message', MessageSchema);
