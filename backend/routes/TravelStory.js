import express from "express";
import { isAuth } from "../utils/isAuthenticated.js";
import {
  addTravelStory,
  allTravelStories,
  deleteImg,
  deleteTravelStories,
  editTravelStories,
  filterTravelStory,
  searchTravelStory,
  updateIsFavourite,
  uploadImg,
} from "../controllers/TravelStory.js";
import upload from "../utils/multer.js";

const router = express.Router();

// Story
router.post("/add-story", isAuth, addTravelStory);
router.get("/all-story", isAuth, allTravelStories);
router.put("/edit-story/:id", isAuth, editTravelStories);
router.delete("/delete-story/:id", isAuth, deleteTravelStories);
router.put("/update-isFavourite/:id", isAuth, updateIsFavourite);
router.get("/search", isAuth, searchTravelStory);
router.get("/filter", isAuth, filterTravelStory);

// Image
router.post("/upload-img", upload.single("image"), uploadImg);
router.delete("/delete-img", deleteImg);

export default router;
