import React from "react";
import ProfileInfo from "./card/ProfileInfo";
import { useNavigate } from "react-router-dom";
import SearchBar from "./input/SearchBar";
import logo from "../assets/logo.png";

const Navbar = ({
  userInfo,
  searchQuery,
  setSearchQuery,
  onSearchNote,
  handleClearSearch,
}) => {
  const navigate = useNavigate();
  const onLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  const handleSearch = () => {
    if (searchQuery) {
      onSearchNote(searchQuery);
    }
  };
  const onClearSearch = () => {
    handleClearSearch();
    setSearchQuery("");
  };
  return (
    <div className="bg-white flex items-center justify-between px-2 md:px-6 py-2 drop-shadow sticky top-0 z-10">
      <img src={logo} className="w-12 h-12" alt="travel story" />
      <>
        <SearchBar
          value={searchQuery}
          onChange={({ target }) => setSearchQuery(target.value)}
          handleSearch={handleSearch}
          onClearSearch={onClearSearch}
        />
        <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
      </>
    </div>
  );
};

export default Navbar;
