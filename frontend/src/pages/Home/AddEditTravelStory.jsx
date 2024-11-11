import React, { useState } from "react";
import { MdAdd, MdClose, MdUpdate, MdDeleteOutline } from "react-icons/md";
import DateSelector from "../../components/input/DateSelector";
import toast from "react-hot-toast";
import ImgSelector from "../../components/input/ImgSelector";
import TagInput from "../../components/input/TagInput";
import axios from "axios";
import { url } from "../../main";
import moment from "moment";
import uploadImage from "../../utils/uploadImage";

const AddEditTravelStory = ({
  type,
  storyInfo,
  onClose,
  getAllTravelStories,
}) => {
  const [error, setError] = useState("");
  const [title, setTitle] = useState(storyInfo?.title || "");
  const [storyImg, setStoryImg] = useState(storyInfo?.imgUrl || null);
  const [story, setStory] = useState(storyInfo?.story || "");
  const [visitedLocation, setVisitedLocation] = useState(
    storyInfo?.visitedLocation || []
  );
  const [visitedDate, setVisitedDate] = useState(
    storyInfo?.visitedDate || null
  );

  async function addNewStory() {
    try {
      let imgUrl = "";
      if (storyImg) {
        const inputUploadRes = await uploadImage(storyImg);
        imgUrl = inputUploadRes.imgUrl || "";
      }
      const res = await axios.post(
        `${url}/travel-story/add-story`,
        {
          title,
          story,
          imgUrl,
          visitedLocation,
          visitedDate: visitedDate
            ? moment(visitedDate).valueOf()
            : moment().valueOf(),
        },
        { withCredentials: true }
      );
      if (res.data) {
        toast.success("Story Added Successfully");
        getAllTravelStories();
        onClose();
      }
    } catch (error) {
      toast.error("Failed to add story");
      console.error("Error adding story:", error);
    }
  }

  async function updateStory() {
    let id = storyInfo._id;
    try {
      let imgUrl = "";
      let pastData = {
        title,
        story,
        imgUrl: storyInfo.imgUrl || "",
        visitedLocation,
        visitedDate: visitedDate
          ? moment(visitedDate).valueOf()
          : moment().valueOf(),
      };
      if (typeof storyImg == "object") {
        let imageUpload = await uploadImage(storyImg);
        imgUrl = imageUpload.imgUrl || "";
        pastData = {
          ...pastData,
          imgUrl: imgUrl,
        };
      }

      const res = await axios.put(
        `${url}/travel-story/edit-story/${id}`,
        pastData,
        { withCredentials: true }
      );
      if (res.data) {
        toast.success("Story Updated Successfully");
        getAllTravelStories();
        onClose();
      }
    } catch (error) {
      toast.error("Failed to update story");
      console.error("Error update story:", error);
    }
  }

  const handleAddOrUpdate = () => {
    if (!title) {
      setError("Plz enter title");
      return;
    }
    if (!story) {
      setError("Plz enter story");
      return;
    }
    setError("");
    if (type == "add") addNewStory();
    else updateStory();
  };

  const handleDeleteStoryImg = async () => {
    const deleteImg = await axios.delete(`${url}/travel-story/delete-img`, {
      params: {
        imgUrl: storyInfo.imgUrl,
      },
    });
    if (deleteImg.data) {
      const id = storyInfo._id;
      const pastData = {
        title,
        story,
        visitedLocation,
        visitedDate: moment().valueOf(),
        imgUrl: "",
      };
      const res = await axios.put(
        `${url}/travel-story/edit-story/${id}`,
        pastData
      );
      setStoryImg(null);
    }
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-between">
        <h5 className="text-xl font-medium text-cyan-700">
          {type == "add" ? "Add Story" : "Update Story"}
        </h5>

        <div>
          <div className="flex items-center gap-3 bg-cyan-50/50 p-2 rounded-l-lg">
            {type == "add" ? (
              <button className="btn-small" onClick={handleAddOrUpdate}>
                <MdAdd className="text-lg" /> ADD STORY
              </button>
            ) : (
              <>
                <button className="btn-small" onClick={handleAddOrUpdate}>
                  <MdUpdate className="text-lg" /> UPDATE STORY
                </button>
                {/* <button className="btn-small btn-delete" onClick={onClose}>
                  <MdDeleteOutline className="text-xl" /> DELETE
                </button> */}
              </>
            )}
            <button className="" onClick={onClose}>
              <MdClose className="text-xl text-slate-400" />
            </button>
          </div>
          {error && (
            <p className="text-red-500 text-sm pt-2 text-right">{error}</p>
          )}
        </div>
      </div>

      <div>
        <div className="flex-1 flex flex-col gap-2 p-4">
          <label className="input-label">Title</label>
          <input
            type="text"
            className="text-2xl text-slate-950 outline-none"
            placeholder="Add Title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
          <div className="my-3">
            <DateSelector date={visitedDate} setDate={setVisitedDate} />
          </div>

          <ImgSelector
            image={storyImg}
            setImage={setStoryImg}
            handleDeleteImg={handleDeleteStoryImg}
          />

          <div className="flex flex-col gap-2 mt-4">
            <label className="input-label">Story</label>
            <textarea
              name="text"
              className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
              placeholder="Add Story"
              rows={10}
              value={story}
              onChange={({ target }) => setStory(target.value)}
            ></textarea>
          </div>

          <div className="pt-3">
            <label className="input-label">Visited Location</label>
            <TagInput tags={visitedLocation} setTags={setVisitedLocation} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEditTravelStory;
