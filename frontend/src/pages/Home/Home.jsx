import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { url } from "../../main";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import TravelCard from "../../components/card/TravelCard";
import { MdAdd } from "react-icons/md";
import Modal from "react-modal";
import AddEditTravelStory from "./AddEditTravelStory";
import ViewTravelStory from "./ViewTravelStory";
import EmptyCard from "../../components/card/EmptyCard";

const Home = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [stories, setStories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("");

  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShow: false,
    type: "add",
    data: null,
  });
  const [openViewModal, setOpenViewModal] = useState({
    isShow: false,
    data: null,
  });
  // get user
  const getUser = async () => {
    try {
      const res = await axios.get(`${url}/user/get`, {
        withCredentials: true,
      });

      if (res.data) {
        setUserInfo(res.data.user.name);
      }
    } catch (err) {
      if (err.response) {
        console.log(err);
        toast.error("Error: " + err.response.data.message);
        navigate("/login");
      }
    }
  };

  // get all stories
  const getAllStories = async () => {
    try {
      const res = await axios.get(`${url}/travel-story/all-story`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data) {
        setStories(res.data.stories);
      }
    } catch (err) {
      if (err.response) {
        toast.error("Error: " + err.response.data.message);
      }
    }
  };

  const handleEdit = async (data) => {
    setOpenAddEditModal({ isShow: true, type: "edit", data: data });
  };
  const handleViewStory = async (data) => {
    setOpenViewModal({ isShow: true, data });
  };
  const updateIsFavourite = async (data) => {
    const storyId = data._id;
    try {
      const res = await axios.put(
        `${url}/travel-story/update-isFavourite/${storyId}`,
        { isFavourite: !data.isFavourite },
        {
          withCredentials: true,
        }
      );
      if (res.data) {
        getAllStories();
        toast.success("Updated successfully"); // Add success feedback
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Failed to update favourite"); // Add error feedback
    }
  };

  const deleteTravelStory = async (data) => {
    const storyId = data._id;
    try {
      const res = await axios.delete(
        `${url}/travel-story/delete-story/${storyId}`,
        {
          withCredentials: true,
        }
      );
      if (res.data) {
        toast.error("Story Deleted");
        setOpenViewModal((prevState) => ({ ...prevState, isShow: false }));
        getAllStories();
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Failed to delete story"); // Add error feedback
    }
  };

  const onSearchStory = async (query) => {
    try {
      const res = await axios.get(
        `${url}/travel-story/search`,
        {
          params: {
            query,
          },
        },
        {
          withCredentials: true,
        }
      );
      if (res.data) {
        setFilterType("search");
        setAllStory(res.data.stories);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleClearSearch = () => {
    setFilterType("");
    getAllStories();
  };

  useEffect(() => {
    getAllStories();
    getUser();
  }, []);
  return (
    <>
      <Navbar
        userInfo={userInfo}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearchNote={onSearchStory}
        handleClearSearch={handleClearSearch}
      />
      <div className="container h-full mx-auto py-2 md:py-10">
        <div className="flex gap-7">
          <div className="flex-1">
            {stories.length > 0 ? (
              <div className="grid md:grid-cols-3 p-5 grid-cols-1 gap-4">
                {stories
                  .filter((item) =>
                    searchQuery.toLowerCase() == ""
                      ? item
                      : item.title.toLowerCase().includes(searchQuery)
                  )
                  .map((item) => {
                    return (
                      <TravelCard
                        key={item._id}
                        imgUrl={item.imgUrl}
                        title={item.title}
                        date={item.visitedDate}
                        story={item.story}
                        visitedLocation={item.visitedLocation}
                        isFavourite={item.isFavourite}
                        onEdit={() => handleEdit(item)}
                        onClick={() => handleViewStory(item)}
                        onFavouriteClick={() => updateIsFavourite(item)}
                      />
                    );
                  })}
                {stories.filter((item) =>
                  searchQuery.toLowerCase() === ""
                    ? item
                    : item.title.toLowerCase().includes(searchQuery)
                ).length === 0 && (
                  <h3 className="font-bold text-3xl absolute">
                    No story found
                  </h3>
                )}
              </div>
            ) : (
              <EmptyCard />
            )}
          </div>
          {/* <div className="w-[320px]"></div> */}
        </div>
      </div>

      {/* Add or Edit Travel Story Modal */}
      <Modal
        isOpen={openAddEditModal.isShow}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
            zIndex: 999,
          },
        }}
        appElement={document.getElementById("root")}
        className="model-box"
      >
        <AddEditTravelStory
          type={openAddEditModal.type}
          storyInfo={openAddEditModal.data}
          onClose={() => {
            setOpenAddEditModal({ isShow: false, type: "add", data: null });
          }}
          getAllTravelStories={getAllStories}
        />
      </Modal>

      {/* View Travel Story Model*/}
      <Modal
        isOpen={openViewModal.isShow}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
            zIndex: 999,
          },
        }}
        appElement={document.getElementById("root")}
        className="model-box"
      >
        <ViewTravelStory
          storyInfo={openViewModal.data || null}
          onClose={() => {
            setOpenViewModal((prevState) => ({ ...prevState, isShow: false }));
          }}
          onEditClick={() => {
            setOpenViewModal((prevState) => ({ ...prevState, isShow: false }));
            handleEdit(openViewModal.data || null);
          }}
          onDeleteClick={() => {
            deleteTravelStory(openViewModal.data || null);
          }}
        />
      </Modal>

      <button
        className="w-16 h-16 flex justify-center items-center rounded-full bg-cyan-400 hover:bg-cyan-600 fixed md:bottom-10 right-10 bottom-30"
        onClick={() =>
          setOpenAddEditModal({ isShow: true, type: "add", data: null })
        }
      >
        <MdAdd className="text-[32px] text-white" />
      </button>
    </>
  );
};

export default Home;
