import React from "react";
import { MdHistoryEdu } from "react-icons/md";

const EmptyCard = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[75vh] gap-3">
      <MdHistoryEdu size={50} />
      <h1 className="text-3xl font-semibold">Create your first story</h1>
    </div>
  );
};

export default EmptyCard;
