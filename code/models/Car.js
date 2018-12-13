const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const carSchema = new Schema(
  {
    carMake: { type: String, required: true },
    model: { type: String, required: true },
    licensePlate: String,
    fuel: { type: String, required: true },
    purchaseYear: { type: Number, required: true },
    owner: {type: Schema.Types.ObjectId, ref: "User" },
    insurance: { type: String, required: true },
    other: String,
    location: {type: {type: String}, coordinates: [Number]}
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

carSchema.index({location: "2dsphere"});

const Car = mongoose.model("Car", carSchema);
module.exports = Car;
