const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tripSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    car: { type: Schema.Types.ObjectId, ref: "Car" },
    isFree: {type: Boolean}
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Trip = mongoose.model("Trip", tripSchema);
module.exports = Trip;