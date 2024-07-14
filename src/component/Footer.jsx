/* eslint-disable no-unused-vars */
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex justify-center items-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Paper Management. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
