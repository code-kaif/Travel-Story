import React from "react";

const ProfileInfo = ({ userInfo, onLogout }) => {
  const firstChar = userInfo ? userInfo.charAt(0).toUpperCase() : "";
  return (
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 flex items-center justify-center rounded-full text-slate-500 font-medium bg-slate-100">
        {firstChar}
      </div>
      <div>
        <p className="text-sm font-medium">{userInfo || "User"}</p>
        <button className="hover:text-red-600" onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileInfo;
