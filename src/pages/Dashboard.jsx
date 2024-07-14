/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../component/Navbar";
import AllDocument from "../component/AllDocument";
import PaginationDocument from "../component/PaginationDocument";
import ShareDocument from "../component/ShareDocument";
import DeleteDocument from "../component/DeleteDocument.jsx";
import Footer from "../component/Footer.jsx";

export const DashboardContext = React.createContext();

export default function Dashboard() {
  const navigate = useNavigate();

  const [listDocument, setListDocument] = useState([]);
  const [metaPageDocument, setMetaPageDocument] = useState({
    page: "1",
    perPage: "4",
    sort: "created_at",
    order: "DESC",
    search: "",
    lastPage: "",
    total: "",
  });
  const [totalDocument, setTotalDocument] = useState(0);
  const [dialogShareDocument, setDialogShareDocument] = useState(false);
  const [idShareDocument, setIdShareDocument] = useState(false);
  const [loadingGetDocument, setLoadingGetDocument] = useState(false);
  const [dialogDeleteDocument, setDialogDeleteDocument] = useState(false);
  const [idDeleteDocument, setIdDeleteDocument] = useState(false);
  const [dialogAddDocument, setDialogAddDocument] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <DashboardContext.Provider
        value={{
          listDocument,
          setListDocument,
          totalDocument,
          setTotalDocument,
          metaPageDocument,
          setMetaPageDocument,
          dialogShareDocument,
          setDialogShareDocument,
          idShareDocument,
          setIdShareDocument,
          loadingGetDocument,
          setLoadingGetDocument,
          dialogDeleteDocument,
          setDialogDeleteDocument,
          idDeleteDocument,
          setIdDeleteDocument,
          dialogAddDocument,
          setDialogAddDocument,
        }}
      >
        <Navbar />
        <AllDocument />
        <PaginationDocument />
        <ShareDocument />
        <DeleteDocument />
        <Footer />
      </DashboardContext.Provider>
    </div>
  );
}
