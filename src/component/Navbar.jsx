/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <nav className="shadow w-full bg-white">
      <div className="mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-center sm:items-center sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <h1 className="font-semibold text-[#238FDD] drop-shadow-xl text-xl my-5">
                Paper Management
              </h1>
            </div>
            <div className="hidden sm:ml-6 sm:block"></div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="relative ml-3 z-50">
              <div>
                <button
                  type="button"
                  className="relative flex rounded-full bg-[#238FDD] text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  id="user-menu-button"
                  aria-expanded={profileMenuOpen}
                  aria-haspopup="true"
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                >
                  <span className="absolute -inset-1.5"></span>
                  <span className="sr-only">Open user menu</span>
                  <FaUserCircle className="text-2xl" />
                </button>
              </div>

              {profileMenuOpen && (
                <div
                  className="absolute right-0 z-10 mt-2 w-24 tex-center origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                >
                  <button
                    onClick={handleLogout}
                    className="block px-4 py-2 text-sm text-gray-700 w-full text-left"
                    role="menuitem"
                    id="user-menu-item-2"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
