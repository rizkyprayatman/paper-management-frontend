/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from "react";
import { DashboardContext } from "../pages/Dashboard";
import DocumentsServices from "../services/DocumentsServices";

const PaginationDocument = () => {
  const {
    listDocument,
    setListDocument,
    metaPageDocument,
    setMetaPageDocument,
    setLoadingGetDocument,
  } = useContext(DashboardContext);

  const fetchGetAllDocuments = async (data) => {
    try {
      setLoadingGetDocument(true); // Mengatur loading ke true saat memuat data
      const response = await DocumentsServices.getAllDocument(data);
      console.log("data", response);
      setListDocument(response.data.data);
      setMetaPageDocument(response.data.meta);
    } catch (error) {
      console.error("Error fetching documents:", error);
    } finally {
      setLoadingGetDocument(false); // Mengatur loading kembali ke false setelah selesai memuat data
    }
  };

  const handlePageChange = (newPage) => {
    setMetaPageDocument((prev) => ({ ...prev, page: newPage }));
    fetchGetAllDocuments({
      page: newPage,
      perPage: metaPageDocument.perPage,
      sort: "created_at",
      order: "DESC",
      search: "",
      lastPage: "",
      total: "",
    });
  };

  const handlePerPageChange = (newPerPage) => {
    setMetaPageDocument((prev) => ({
      ...prev,
      perPage: newPerPage,
      page: 1,
    }));

    fetchGetAllDocuments({
      page: 1,
      perPage: newPerPage,
      sort: "created_at",
      order: "DESC",
      search: "",
      lastPage: "",
      total: "",
    });
  };

  return (
    <div className="p-6 flex justify-between items-end rounded-xl mt-auto">
      <div></div>
      <div className="flex justify-center space-x-2 mt-4">
        {Array.from(
          { length: metaPageDocument.lastPage },
          (_, index) => index + 1
        ).map((page) => (
          <button
            key={page}
            onClick={() => {
              handlePageChange(page);
            }}
            className={`px-3 py-1 rounded-md ${
              page === parseInt(metaPageDocument.page)
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {page}
          </button>
        ))}
      </div>
      {listDocument.length !== 0 && (
        <>
          <div className="flex justify-between items-end">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Items per page:
              </label>
              <select
                value={metaPageDocument.perPage}
                onChange={(e) => {
                  handlePerPageChange(parseInt(e.target.value));
                }}
                className="border border-gray-300 rounded-md px-3 py-1 text-gray-700"
              >
                <option value={4}>4</option>
                <option value={12}>12</option>
                <option value={21}>21</option>
              </select>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PaginationDocument;
