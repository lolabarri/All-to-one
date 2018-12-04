const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  name: {type: String, required: true},
  email: {type: String, required: true},
  password: String,
  dateOfBirth: {type: Date, required: true},
  yearsOfExperience: {type: Number, required: true},
  isOwner: Boolean,
  Role: {type: String, required: true, enum: ["Administrator", "User"]}
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;