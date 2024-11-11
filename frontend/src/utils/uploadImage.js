import axios from "axios";
import { url } from "../main";

const uploadImage = async (imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);
  try {
    const res = await axios.post(`${url}/travel-story/upload-img`, formData, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.log("Error uploading image", error);
    throw error;
  }
};

export default uploadImage;
