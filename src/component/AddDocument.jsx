/* eslint-disable no-unused-vars */
import React, { useState, useContext, useEffect } from "react";
import { DashboardContext } from "../pages/Dashboard";
import DocumentsServices from "../services/DocumentsServices";
import { HiDocumentAdd, HiDocumentText } from "react-icons/hi";
import Select from "react-select";
import Swal from "sweetalert2";

const AddDocument = () => {
  const [filename, setFilename] = useState("");
  const [location, setLocation] = useState("");
  const [jenisDocument, setJenisDocument] = useState("");
  const [file, setFile] = useState([]);
  const [jenisDocumentList, setJenisDocumentList] = useState([]);
  const [loadingUploadDocument, setLoadingUploadDocument] = useState(false);

  const {
    setMetaPageDocument,
    setListDocument,
    setLoadingGetDocument,
    dialogAddDocument,
    setDialogAddDocument,
  } = useContext(DashboardContext);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files;
    setFile(selectedFile);
  };

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

  const closeAddDocumentBtn = () => {
    setFilename("");
    setLocation("");
    setJenisDocument("");
    setFile([]);
    setDialogAddDocument(false);
  };

  const handleAddDocument = async () => {
    setLoadingUploadDocument(true);
    const formData = new FormData();
    formData.append("filename", filename);
    formData.append("location", location);
    formData.append("jenis_document", jenisDocument);
    formData.append("file", file[0]);

    try {
      setLoadingGetDocument(true);
      const response = await DocumentsServices.addDocument(formData);
      console.log("Document added:", response);

      setFilename("");
      setLocation("");
      setJenisDocument("");
      setFile([]);

      setLoadingGetDocument(false);

      Swal.fire({
        title: "Success!",
        text: "Document added successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });
      fetchGetAllDocuments({
        page: "1",
        perPage: "4",
        sort: "created_at",
        order: "DESC",
        search: "",
      });
      setLoadingUploadDocument(false);
      setDialogAddDocument(false);
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to add document.",
        icon: "error",
        confirmButtonText: "OK",
      });
      console.error("Error adding document:", error);
      setLoadingUploadDocument(false);
    }
  };

  useEffect(() => {
    const fetchJenisDocuments = async () => {
      try {
        const response = await DocumentsServices.getAllJenisDocument();
        setJenisDocumentList(
          response.data.map((jenis) => ({ value: jenis.id, label: jenis.name }))
        ); // Sesuaikan sesuai struktur response API Anda
      } catch (error) {
        console.error("Error fetching jenis documents:", error);
      }
    };

    fetchJenisDocuments();
  }, []);
  return (
    <>
      <div>
        <button
          type="button"
          className="inline-flex w-full justify-center rounded-md bg-blue-500 px-3 py-1 xl:py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 sm:mt-0 sm:w-auto"
          onClick={() => setDialogAddDocument(true)}
        >
          Add Document
        </button>
      </div>
      {dialogAddDocument && (
        <>
          <div
            className="relative z-10"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
          >
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              aria-hidden="true"
            ></div>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white pb-4 pt-5">
                    <div className="mx-5">
                      <div className="mt-3 text-start sm:mt-0 sm:text-left">
                        <h3
                          className="text-base font-semibold leading-6 text-gray-900"
                          id="modal-title"
                        >
                          Add Document
                        </h3>
                        <div className="mt-2">
                          <div className="w-full space-y-5">
                            <div>
                              <label className="block text-sm font-medium text-gray-700">
                                Filename
                              </label>
                              <input
                                type="text"
                                className="mt-1 block w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500"
                                placeholder="Enter filename"
                                value={filename}
                                onChange={(e) => setFilename(e.target.value)}
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700">
                                Location
                              </label>
                              <input
                                type="text"
                                className="mt-1 block w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500"
                                placeholder="Enter location"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700">
                                Document Type
                              </label>
                              <Select
                                options={jenisDocumentList}
                                value={jenisDocumentList.find(
                                  (option) => option.value === jenisDocument
                                )}
                                onChange={(selectedOption) =>
                                  setJenisDocument(selectedOption.value)
                                }
                                placeholder="Select document type"
                                className="mt-1 block w-full rounded-md text-black shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700">
                                Upload File
                              </label>
                              <div className="relative mx-5 mt-3">
                                <input
                                  className="hidden"
                                  id="file"
                                  type="file"
                                  onChange={handleFileChange}
                                />
                                <label
                                  htmlFor="file"
                                  className="block w-full px-4 py-8 mb-4 border border-dashed border-blue-900 rounded-md cursor-pointer text-gray-400 text-center"
                                >
                                  {file.length !== 0 ? (
                                    <>
                                      <div className="flex justify-center items-center">
                                        <HiDocumentText className="text-2xl text-orange-400" />
                                      </div>
                                      <p>{file[0].name}</p>
                                    </>
                                  ) : (
                                    <>
                                      <div className="flex justify-center items-center">
                                        <HiDocumentAdd className="text-2xl text-blue-400" />
                                      </div>
                                      <p>Select Document</p>
                                    </>
                                  )}
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 gap-4 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 sm:mt-0 sm:w-auto"
                      onClick={() => handleAddDocument()}
                    >
                      {loadingUploadDocument ? "Loading..." : "Add Document"}
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => closeAddDocumentBtn()}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AddDocument;
