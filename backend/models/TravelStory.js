import mongoose, { Schema, Types } from "mongoose";

const travelStorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  story: {
    type: String,
    required: true,
  },
  visitedLocation: {
    type: [String],
    default: [],
  },
  isFavourite: {
    type: Boolean,
    default: false,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  imgUrl: {
    type: String,
    required: true,
  },
  visitedDate: {
    type: Date,
    required: true,
  },
});
const TravelStory = mongoose.model("travelStory", travelStorySchema);
export default TravelStory;
