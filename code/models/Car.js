const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const carSchema = new Schema({
  carMake: {type: String, required: true},
  model: {type: String, required: true},
  licensePlate: String,
  fuel: {type: String, required: true, enum: ["Regular", "Diesel", "Regular-hybrid", "Diesel-hybrid", "Electric"]},
  purchaseYear: {type: Number, required: true},
  owner: {type: String, required: true},
  insurance: {type: String, required: true},
  other: {type: String},
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Car = mongoose.model('Car', carSchema);
module.exports = Car;