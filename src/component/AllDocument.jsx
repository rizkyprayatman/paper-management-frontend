/* eslint-disable no-unused-vars */
import React, { useState, useContext, useEffect } from "react";
import { FaShareAlt, FaCloudDownloadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { DashboardContext } from "../pages/Dashboard";
import DocumentsServices from "../services/DocumentsServices";
import SearchDocument from "./SearchDocument";
import AddDocument from "./AddDocument";

const AllDocument = () => {
  const {
    listDocument,
    setListDocument,
    metaPageDocument,
    setMetaPageDocument,
    setDialogShareDocument,
    setIdShareDocument,
    loadingGetDocument,
    setLoadingGetDocument,
    setDialogDeleteDocument,
    setIdDeleteDocument,
  } = useContext(DashboardContext);

  const fetchGetAllDocuments = async (data) => {
    try {
      setLoadingGetDocument(true);
      const response = await DocumentsServices.getAllDocument(data);
      // console.log("data", response);
      setListDocument(response.data.data);
      setMetaPageDocument(response.data.meta);
      setLoadingGetDocument(false);
    } catch (error) {
      console.error("Error fetching prices:", error);
    }
  };

  const shareDocumentBtn = (id) => {
    // console.log(id);
    setIdShareDocument(id);
    setDialogShareDocument(true);
  };

  const deleteDocumentBtn = (id) => {
    // console.log(id);
    setIdDeleteDocument(id);
    setDialogDeleteDocument(true);
  };

  const downloadDocumentBtn = async (id, name) => {
    const response = await DocumentsServices.downloadDocument(id);
    // console.log(response);
    const downloadLink = document.createElement("a");
    downloadLink.href = response.data.url;
    downloadLink.setAttribute("download", `document-${name}.pdf`);
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const options = {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  useEffect(() => {
    fetchGetAllDocuments(metaPageDocument);
  }, []);

  return (
    <>
      <div className="mx-5 px-5 mt-5">
        <div className="flex justify-between items-center flex-col sm:flex-row">
          <h1 className="font-bold text-2xl">Documents</h1>
          <div className="flex items-center justify-center gap-3 mt-2">
            <AddDocument />
            <SearchDocument />
          </div>
        </div>
        {loadingGetDocument ? (
          <>
            <div className="flex mx-auto my-auto justify-center items-center">
              <h1 className="text-center">Loading Get Documents....</h1>
            </div>
          </>
        ) : (
          <>
            <hr className="my-3 border-2" />
            {listDocument.length === 0 ? (
              <div className="flex h-screen justify-center items-center">
                <h1 className="text-center">
                  No documents uploaded yet. <br /> Please add a new document to
                  get started.
                </h1>
              </div>
            ) : (
              <>
                <p>Total : {metaPageDocument.total} Document</p>
                <div className="mt-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 justify-items-center xl:justify-items-start">
                    {listDocument.map((item) => (
                      <div
                        key={item.id}
                        className="w-[250px] rounded-md overflow-hidden shadow-lg border-blue-200 border-[1.5px]"
                      >
                        <Link to={`/document/${item.id}`} className="block">
                          <img
                            className="w-full h-72"
                            src={item.thumbnail_url}
                            alt="Thumbnail"
                          />
                          <div className="px-6">
                            <h2 className="font-bold text-md">
                              {item.file_name}
                            </h2>
                            <h3 className="font-semibold text-sm mb-2">
                              Location : {item.location}
                            </h3>
                            <p className="text-xs text-gray-400">
                              Cat. : {item.JenisDocument.name}
                            </p>
                          </div>
                          <div className="px-6 py-4">
                            <hr />
                            <p className="text-sm mt-2 text-gray-400 capitalize">
                              {new Date(item.created_at)
                                .toLocaleDateString("id-ID", options)
                                .replace(/,\s/g, " - ")}
                            </p>
                          </div>
                        </Link>
                        <div className="px-6 py-4 flex gap-3 justify-center">
                          <div>
                            <FaShareAlt
                              className="w-10 h-5 text-gray-700"
                              onClick={() => shareDocumentBtn(item.id)}
                            />
                          </div>
                          <div>
                            <FaCloudDownloadAlt
                              className="w-10 h-5 text-green-600"
                              onClick={() =>
                                downloadDocumentBtn(item.id, item.file_name)
                              }
                            />
                          </div>
                          <div>
                            <MdDelete
                              className="w-10 h-5 text-red-600"
                              onClick={() => deleteDocumentBtn(item.id)}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default AllDocument;
