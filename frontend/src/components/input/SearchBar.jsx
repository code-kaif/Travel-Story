import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { MdClose } from "react-icons/md";

const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
  return (
    <div className="w-80 flex items-center mx-2 px-4 bg-slate-100 rounded-md">
      <input
        type="text"
        placeholder="Search Story"
        className="w-full text-sm bg-transparent outline-none py-[11px]"
        value={value}
        onChange={onChange}
      />

      {value ? (
        <MdClose
          className="text-slate-400 cursor-pointer hover:text-black"
          onClick={onClearSearch}
        />
      ) : (
        <FaMagnifyingGlass
          className="text-slate-400 cursor-pointer hover:text-black"
          onClick={handleSearch}
        />
      )}
    </div>
  );
};

export default SearchBar;
