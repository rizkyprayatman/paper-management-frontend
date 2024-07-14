/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import { DashboardContext } from "../pages/Dashboard";
import { MdDelete } from "react-icons/md";
import DocumentsServices from "../services/DocumentsServices";

const DeleteDocument = () => {
  const {
    dialogDeleteDocument,
    setDialogDeleteDocument,
    idDeleteDocument,
    setIdDeleteDocument,
    setLoadingGetDocument,
    setListDocument,
    metaPageDocument,
    setMetaPageDocument,
  } = useContext(DashboardContext);

  const closeDeleteDocumentBtn = () => {
    setIdDeleteDocument("");
    setDialogDeleteDocument(false);
  };

  const [loadingDeleteDocument, setLoadingDeleteDocument] = useState(false);

  const handleDeleteDocument = async () => {
    try {
      setLoadingDeleteDocument(true)
      await DocumentsServices.deleteDocument(idDeleteDocument);
      fetchGetAllDocuments()
      setIdDeleteDocument("");
      closeDeleteDocumentBtn();
      setLoadingDeleteDocument(false)
    } catch (error) {
      console.error("Error deleting document:", error);
      // Handle error jika diperlukan
    }
  };

  const fetchGetAllDocuments = async () => {
    try {
      setLoadingGetDocument(true);
      const response = await DocumentsServices.getAllDocument(metaPageDocument);
      // console.log("data", response);
      setListDocument(response.data.data);
      setMetaPageDocument(response.data.meta);
      setLoadingGetDocument(false);
    } catch (error) {
      console.error("Error fetching prices:", error);
    }
  };

  return (
    <>
      {dialogDeleteDocument && (
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
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div>
                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                          <MdDelete className="w-10 h-5 text-red-500" />
                        </div>
                      </div>
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <h3
                          className="text-base font-semibold leading-6 text-gray-900"
                          id="modal-title"
                        >
                          Delete Document
                        </h3>
                        <div className="mt-2">
                          <p className="text-sm text-gray-700">
                            Are you sure you want to delete this document ? <br /> This
                            action cannot be undone.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 gap-5 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 sm:mt-0 sm:w-auto"
                      onClick={handleDeleteDocument}
                    >
                      {loadingDeleteDocument ? "Loading..." : "Delete"}
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={closeDeleteDocumentBtn}
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

export default DeleteDocument;
