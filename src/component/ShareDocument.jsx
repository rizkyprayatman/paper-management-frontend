/* eslint-disable no-unused-vars */
import React, { useState, useContext } from "react";
import { DashboardContext } from "../pages/Dashboard";
import { FaShareAlt, FaCloudDownloadAlt } from "react-icons/fa";
import DocumentsServices from "../services/DocumentsServices";

const ShareDocument = () => {
  const {
    dialogShareDocument,
    setDialogShareDocument,
    idShareDocument,
    setIdShareDocument,
  } = useContext(DashboardContext);

  const closeShareDocumentBtn = () => {
    setIdShareDocument("");
    setLink("");
    setTimeValue("")
    setTimeUnit("m")
    setDialogShareDocument(false);
  };

  const [link, setLink] = useState("");
  const [copySuccess, setCopySuccess] = useState("");
  const [timeValue, setTimeValue] = useState("");
  const [timeUnit, setTimeUnit] = useState("m");

  // console.log(timeUnit);

  const generateLink = async () => {
    try {
      const timerLink = `${timeUnit == "forever" ? "forever" : `${timeValue}${timeUnit}`}`;
      const data = {
        id: idShareDocument,
        time_limit: timerLink,
      };

      const response = await DocumentsServices.shareDocument(data); // Example max_page value
      // console.log("data", response);

      setLink(response.data.url); // Sesuaikan ini dengan properti link dari respons Anda
      setCopySuccess("Link generated!");
      setTimeout(() => setCopySuccess(""), 2000);
    } catch (error) {
      console.error("Error generating link: ", error);
    }
  };

  const copyToClipboard = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(link).then(
        () => {
          setCopySuccess("Link copied to clipboard!");
          setTimeout(() => setCopySuccess(""), 2000);
        },
        (err) => {
          console.error("Could not copy text: ", err);
        }
      );
    } else {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = link;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand("copy");
        setCopySuccess("Link copied to clipboard!");
        setTimeout(() => setCopySuccess(""), 2000);
      } catch (err) {
        console.error("Fallback: Oops, unable to copy", err);
      }
      document.body.removeChild(textArea);
    }
  };

  return (
    <>
      {dialogShareDocument == true && (
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
                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                          <FaShareAlt className="w-10 h-5 text-green-500" />
                        </div>
                      </div>
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <h3
                          className="text-base font-semibold leading-6 text-gray-900"
                          id="modal-title"
                        >
                          Share Document
                        </h3>
                        <div className="mt-2">
                          <p className="text-sm text-gray-700">
                            Share your document with others using the following
                            link:
                          </p>
                          <div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700">
                                Time Shared Link:
                              </label>
                              <div className="flex items-center mt-2">
                                <input
                                  type="number"
                                  value={timeValue}
                                  onChange={(e) => setTimeValue(e.target.value)}
                                  disabled={timeUnit === "forever"}
                                  className="border border-gray-300 rounded-md px-3 py-1 text-gray-700 w-1/4"
                                />
                                <select
                                  value={timeUnit}
                                  onChange={(e) => setTimeUnit(e.target.value)}
                                  className="ml-3 border border-gray-300 rounded-md px-3 py-1 text-gray-700"
                                >
                                  <option value="forever">Forever</option>
                                  <option value="s">Seconds</option>
                                  <option value="m">Minutes</option>
                                  <option value="h">Hours</option>
                                </select>
                                <button
                                  onClick={generateLink}
                                  className="ml-3 bg-green-600 text-white px-3 py-1 rounded-md hover:bg-blue-500"
                                >
                                  Generate Link
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        {link && (
                          <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700">
                              Link:
                            </label>
                            <div className="flex items-center mt-2">
                              <input
                                type="text"
                                readOnly
                                value={link}
                                className="flex-grow border border-gray-300 rounded-md px-3 py-1 text-gray-700"
                              />
                              <button
                                onClick={copyToClipboard}
                                className="ml-3 bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-500"
                              >
                                Copy Link
                              </button>
                            </div>
                            {copySuccess && (
                              <p className="mt-2 text-green-600">
                                {copySuccess}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => closeShareDocumentBtn()}
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

export default ShareDocument;
