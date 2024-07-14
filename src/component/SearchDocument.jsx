/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from "react";
import { FaSearch } from "react-icons/fa";
import { DashboardContext } from "../pages/Dashboard";
import DocumentsServices from "../services/DocumentsServices";

const SearchDocument = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);

  const {
    setMetaPageDocument,
    setListDocument,
    setLoadingGetDocument,
  } = useContext(DashboardContext);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  useEffect(() => {
    if (debouncedTerm) {
      fetchGetAllDocuments({
        page: "1",
        perPage: "4",
        sort: "created_at",
        order: "DESC",
        search: debouncedTerm,
        lastPage: "",
        total: "",
      });
    }
  }, [debouncedTerm]);

  const fetchGetAllDocuments = async (data) => {
    try {
      setLoadingGetDocument(true);
      const response = await DocumentsServices.getAllDocument(data);
      console.log("data", response);
      setListDocument(response.data.data);
      setMetaPageDocument(response.data.meta);
      setLoadingGetDocument(false);
    } catch (error) {
      console.error("Error fetching prices:", error);
    }
  };

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <FaSearch className="text-gray-400" />
      </div>
      <input
        type="search"
        name="search"
        className="pl-10 pr-5 py-3 xl:py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
        placeholder="search by name or location"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default SearchDocument;
