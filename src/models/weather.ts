import mongoose, { Schema, models } from "mongoose";
const weatherSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  max: {
    type: Number,
    required: true,
  },
  min: {
    type: Number,
    required: true,
  },
  average: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: String,
    required: true,
  },
});
const Weather = models.weather || mongoose.model("weather", weatherSchema);
export default Weather;
