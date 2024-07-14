/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import DocumentsServices from "../services/DocumentsServices";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import { FaCloudDownloadAlt, FaShareAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const DocumentDetail = () => {
  const { id } = useParams();
  const [documentDetail, setDocumentDetail] = useState(null);

  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  useEffect(() => {
    const fetchDocumentDetail = async () => {
      try {
        const response = await DocumentsServices.getDocumentDetail(id);
        // console.log(response.data);
        setDocumentDetail(response.data);
      } catch (error) {
        console.error("Error fetching document detail:", error);
      }
    };

    fetchDocumentDetail();
  }, [id]);

  return (
    <>
      <Navbar />
      <div className="mx-5 px-5 mt-5 mb-5">
        {!documentDetail ? (
          <>
            <p className="text-center">Loading document detail...</p>
          </>
        ) : (
          <>
            <div className="flex items-center gap-2">
              <Link to={`/dashboard`} className="block">
                <IoArrowBackCircleSharp className="text-2xl" />
              </Link>
              <h1 className="font-bold text-2xl">Document Detail</h1>
            </div>

            <hr className="my-3 border-2" />
            <div className="grid grid-cols-1 md:grid-cols-2 px-4 mb-5 pb-5">
              <div className="w-full">
                <div className="">
                  <h2 className="text-md">
                    Name File :{" "}
                    <span className="font-bold">
                      {documentDetail.file_name}
                    </span>
                  </h2>
                  <h3 className="text-sm mb-2">
                    Location :{" "}
                    <span className="font-semibold">
                      {documentDetail.location}
                    </span>
                  </h3>
                  <p className="text-sm text-gray-500">
                    Category Document : {documentDetail.JenisDocument.name}
                  </p>
                </div>
                <div className="py-4">
                  <hr className="me-5" />
                  <p className="text-sm mt-2 text-gray-400 capitalize">
                    Created At:{" "}
                    {new Date(documentDetail.created_at).toLocaleString()}
                  </p>

                  <p className="text-sm mt-2 text-gray-400 capitalize pe-5">
                    If the PDF file does not display, shows an 'Failed to fetch'
                    error, or automatically triggers a download, please disable
                    IDM or any other Download Manager application.
                  </p>
                </div>
              </div>
              <div className="min-h-96">
                <div className="h-[500px] border-t border-gray-200 border-2">
                  <Worker
                    workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}
                  >
                    <Viewer
                      fileUrl={documentDetail.url_file}
                      plugins={[defaultLayoutPluginInstance]}
                    />
                  </Worker>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default DocumentDetail;
