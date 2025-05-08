import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

// Components
import Table from './Table';
import SearchBar from "./SearchBar";
import Pagination from './Pagination';
import FiltersEmplacement from "./filterEmplacement";
import DetailsCard from "./ItemDetailsModal";
import { Props, PdfObject } from "./pdf";

// Styles
import "./IndexTable.css";

const IndexTable = () => {
  // Local state
  const [selectedRow, setSelectedRow] = useState(null);
  const [fileType, setFileType] = useState(false);

  // Redux state
  const dispatch = useDispatch();
  const list = useSelector(state => state.isHistory);
  const tableData = useSelector(state => state.tableData);
  const selectedRows = useSelector(state => state.SelectedRows);

  // Router params
  const { file } = useParams();
  
  // Derived state
  const selectedData = tableData.filter(row => selectedRows.includes(row.id));

  // Constants
  const EXPORT_MESSAGES = {
    NO_SELECTION: "Aucune ligne sélectionnée !",
    NO_DETAILS: "Aucun détail sélectionné !",
    DEFAULT_VALUE: "Non renseigné"
  };

  // Effects
  useEffect(() => {
    const fileTypeMap = {
      "List_inventory": "list",
      "history": "history",
      "List_user": "users"
    };

    if (fileTypeMap[file]) {
      dispatch({ type: "isHistory", payload: fileTypeMap[file] });
    }
  }, [dispatch, file]);

  // Export functions
  const downloadCSV = () => {
    if (selectedData.length === 0) {
      alert(EXPORT_MESSAGES.NO_SELECTION);
      return;
    }

    const csvContent = [
      Object.keys(selectedData[0]).join(","),
      ...selectedData.map(row => Object.values(row).join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "export_tableau.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadPDF = () => {
    if (selectedData.length === 0) {
      alert(EXPORT_MESSAGES.NO_SELECTION);
      return;
    }
    
    const props = Props({ selectedData });
    PdfObject({ props });
  };

  const downloadCardPDF = () => {
    if (!selectedRow) {
      alert(EXPORT_MESSAGES.NO_DETAILS);
      return;
    }

    const doc = new jsPDF();
    doc.text(`Détails de l'article #${selectedRow.id}`, 14, 10);

    const cardDetails = Object.entries(selectedRow).map(([key, value]) => {
      return `${key}: ${value !== null ? value : EXPORT_MESSAGES.DEFAULT_VALUE}`;
    });

    let yPosition = 20;
    cardDetails.forEach((detail) => {
      doc.text(detail, 14, yPosition);
      yPosition += 10;
    });

    doc.save(`Details_${selectedRow.id}.pdf`);
    setFileType(false);
  };

  // Render helpers
  const renderExportButtons = () => (
    <div className='mx-2'>
      <button 
        className="btn btn-success w-[fit-content]" 
        onClick={() => setFileType(!fileType)}
        title="Exporter"
      >
        <img 
          src={`${process.env.PUBLIC_URL}/downloads.png`} 
          className='w-[20px] h-[20px]'
          alt="Télécharger"
        />
      </button>

      {fileType && (
        <div className="card flex absolute z-2">
          <button 
            className="btn btn-success w-[fit-content]" 
            onClick={downloadCSV}
            title="Exporter en CSV"
          >
            <img 
              src={`${process.env.PUBLIC_URL}/csv-file-format-extension.png`} 
              className='w-[17px] h-[17px]'
              alt="CSV"
            />
          </button>
          <button 
            className="btn btn-danger w-[fit-content]" 
            onClick={downloadPDF}
            title="Exporter en PDF"
          >
            <img 
              src={`${process.env.PUBLIC_URL}/download-pdf.png`} 
              className='w-[17px] h-[17px]'
              alt="PDF"
            />
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className='relative'>
      <div className='flex'>
        <SearchBar />
        {file === "List_inventory" && renderExportButtons()}
      </div>

      <div className='flex justify-center'>
        <FiltersEmplacement />
      </div>

      <Table setSelectedRow={setSelectedRow} />
      <Pagination />

      {selectedRow && (
        <DetailsCard 
          selectedRow={selectedRow} 
          setSelectedRow={setSelectedRow} 
          downloadCardPDF={downloadCardPDF} 
        />
      )}
    </div>
  );
};

export default IndexTable;


