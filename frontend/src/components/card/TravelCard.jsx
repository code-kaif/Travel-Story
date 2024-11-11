import React from "react";
import { FaHeart } from "react-icons/fa6";
import { GrMapLocation } from "react-icons/gr";
import moment from "moment/moment";

const TravelCard = ({
  imgUrl,
  title,
  date,
  story,
  visitedLocation,
  isFavourite,
  onFavouriteClick,
  onClick,
}) => {
  return (
    <div className="border rounded-lg overflow-hidden bg-white hover:shadow-lg hover:shadow-slate-200 transition-all ease-in-out relative cursor-pointer">
      <img
        src={imgUrl}
        alt={title}
        className=" rounded-lg object-cover w-full h-56"
        onClick={onClick}
      />
      <button
        className="w-12 h-12 flex justify-center items-center bg-white/40 rounded-lg border border-white/30 absolute top-4 right-4"
        onClick={onFavouriteClick}
      >
        <FaHeart
          className={`icon-btn  ${isFavourite ? "text-red-500" : "text-white"}`}
        />
      </button>
      {console.log(isFavourite)}
      <div className="p-4" onClick={onClick}>
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <h4 className="text-sm font-medium">{title}</h4>
            <span className="text-sm text-slate-500">
              {date ? moment(date).format("Do MMM YYYY") : "-"}
            </span>
          </div>
        </div>
        <p className="text-sm text-slate-600 mt-2">{story?.slice(0, 60)}</p>
        <div className="inline-flex items-center gap-2 text-[13px] text-cyan-600 bg-cyan-200/40 rounded mt-3 px-2 py-1">
          <GrMapLocation className="text-sm" />
          {visitedLocation.map((item, index) =>
            visitedLocation.length == index + 1 ? `${item} , ` : `${item}`
          )}
        </div>
      </div>
    </div>
  );
};

export default TravelCard;