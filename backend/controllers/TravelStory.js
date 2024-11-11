import TravelStory from "../models/TravelStory.js";
import path from "path";
import fs from "fs";

export const addTravelStory = async (req, res) => {
  const { title, story, visitedLocation, imgUrl, visitedDate } = req.body;
  const userId = req.user.id;

  const parseVisitedDate = new Date(parseInt(visitedDate));
  try {
    const travelStory = new TravelStory({
      title,
      story,
      visitedLocation,
      userId,
      imgUrl,
      visitedDate: parseVisitedDate,
    });
    await travelStory.save();
    res.status(201).json({ story: travelStory, message: "Story Added" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const allTravelStories = async (req, res) => {
  const userId = req.user.id;
  try {
    const travelStory = await TravelStory.find({ userId: userId }).sort({
      isFavourite: -1,
    });
    res.status(200).json({ stories: travelStory });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const editTravelStories = async (req, res) => {
  const { title, story, visitedLocation, imgUrl, visitedDate } = req.body;
  const userId = req.user.id;
  const { id } = req.params;

  const parseVisitedDate = new Date(parseInt(visitedDate));
  try {
    const travelStory = await TravelStory.findOne({ _id: id, userId: userId });

    if (!travelStory) {
      res
        .status(404)
        .json({ story: travelStory, message: "Travel Story not found" });
    }

    const tempImg = "http://localhost:5000/uploads/1730112779285.jpg";

    travelStory.title = title;
    travelStory.story = story;
    travelStory.visitedLocation = visitedLocation;
    travelStory.imgUrl = imgUrl || tempImg;
    travelStory.visitedDate = parseVisitedDate;

    await travelStory.save();
    res.status(201).json({ story: travelStory, message: "Story Edited" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteTravelStories = async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  try {
    const travelStory = await TravelStory.findOne({ _id: id, userId: userId });
    if (!travelStory) {
      res
        .status(404)
        .json({ story: travelStory, message: "Travel Story not found" });
    }
    await travelStory.deleteOne({ _id: id, userId: userId });
    const imgUrl = travelStory.imgUrl;
    const filename = path.basename(imgUrl);
    const filePath = path.join(process.cwd(), "uploads", filename);
    fs.unlink(filePath, (err) => {
      if (err) {
        console.log("Failed to delete image file");
      }
    });
    res.status(200).json({ message: "Travel Story Deleted" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateIsFavourite = async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  const { isFavourite } = req.body;
  try {
    const travelStory = await TravelStory.findOne({ _id: id, userId: userId });
    if (!travelStory) {
      res
        .status(404)
        .json({ story: travelStory, message: "Travel Story not found" });
    }
    travelStory.isFavourite = isFavourite;
    await travelStory.save();
    res.status(200).json({ message: "Travel Story Updated" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const searchTravelStory = async (req, res) => {
  const userId = req.user.id;
  const { query } = req.query;
  if (!query) {
    res.status(404).json({ message: "Query is required" });
  }
  try {
    const searchResult = await TravelStory.find({
      userId: userId,
      $or: [
        { title: { $regex: query, $options: "i" } },
        { story: { $regex: query, $options: "i" } },
        { visitedLocation: { $regex: query, $options: "i" } },
      ],
    }).sort({ isFavourite: -1 });
    res.status(200).json({ stories: searchResult });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const filterTravelStory = async (req, res) => {
  const userId = req.user.id;
  const { startDate, endDate } = req.query;
  try {
    const start = new Date(parseInt(startDate));
    const end = new Date(parseInt(endDate));
    const filterStories = await TravelStory.find({
      userId: userId,
      visitedDate: { $gte: start, $lte: end },
    }).sort({ isFavourite: -1 });
    res.status(200).json({ stories: filterStories });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const uploadImg = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ message: "No image uploaded", success: false });
    }
    const imgUrl = `http://localhost:5000/uploads/${req.file.filename}`;
    res.status(201).json({ imgUrl });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteImg = async (req, res) => {
  const { imgUrl } = req.query;
  if (!imgUrl) {
    return res
      .status(400)
      .json({ message: "Image url is required", success: false });
  }
  try {
    const filename = path.basename(imgUrl);
    const filePath = path.join(process.cwd(), "uploads", filename);

    if (fs.existsSync(filePath)) {
      fs.unlink(filePath, (err) => {
        if (err) {
          return res.status(500).json({ success: false, message: err.message });
        }
        return res
          .status(200)
          .json({ message: "Image deleted", success: true });
      });
    } else {
      return res
        .status(400)
        .json({ message: "Image not found", success: false });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
