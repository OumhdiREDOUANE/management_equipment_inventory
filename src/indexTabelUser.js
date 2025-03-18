import React, { useEffect, useState } from 'react'

import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import TableUser from'./TableUser'
import SearchBar from "./SearchBar"
import Pagination from './Pagination'
import FiltersEmplacement from "./filterEmplacement"
import { useDispatch, useSelector} from 'react-redux'
import DetailsCard from "./ItemDetailsModal"
import {useParams} from "react-router"
import {Props,PdfObject} from "./pdf" 
import "./IndexTable.css"

export default function IndexTabelUser() {
  const list = useSelector(state=>state.isHistory)
const {file}=useParams()
  const tableData = useSelector(state=>state.tableData)
  const isHistory = useSelector(state=>state.isHistory)

const dispatch =useDispatch()
useEffect(()=>{

  dispatch({type:"isHistory",payload:"users"})

},[])
  const [selectedRow, setSelectedRow] = useState(null);
  const [fileType, setFileType] = useState(false);
  const SelectedRows = useSelector(state=>state.SelectedRows)
  const selectedData = tableData.filter(row => SelectedRows.includes(row.id));
  const downloadCSV = () => {
    if (selectedData.length === 0) return alert("Aucune ligne sélectionnée !");
    
    const csvContent = [
      Object.keys(selectedData[0]).join(","),
      ...selectedData.map(row => Object.values(row).join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "table_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const downloadPDF = () => {
  if (selectedData.length === 0) return alert("Aucune ligne sélectionnée !");
    
  //   // const doc = new jsPDF();
  //   // doc.text("Table Export", 14, 10);
  
  //   // const headers = [Object.keys(selectedData[0])];
  //   // const data = selectedData.map(row => Object.values(row));
    
  //   // autoTable(doc, {
  //   //   head: headers,
  //   //   body: data,
  //   //   startY: 20
  //   // });
  
  //   // doc.save("table_export.pdf");
  //   // setFileType(false)
  //   <>
  //   <PdfObject props={<Props/>}/>

   
  //   </>
    
    
  const props = Props({selectedData}); // Get the props
  PdfObject({ props }); // Generate the PDF
  }
  const downloadCardPDF = () => {
    if (!selectedRow) return alert("Aucun détail sélectionné !");
  
    const doc = new jsPDF();
    doc.text(`Détails de l'article #${selectedRow.id}`, 14, 10);
  
    const cardDetails = Object.entries(selectedRow).map(([key, value]) => {
      return `${key}: ${value !== null ? value : "N/A"}`;
    });
  
    let yOffset = 20;
    cardDetails.forEach((detail, index) => {
      doc.text(detail, 14, yOffset);
      yOffset += 10;
    });
  
    doc.save(`Détails_${selectedRow.id}.pdf`);
    setFileType(false)
  };
  return (
    <div className='relative '>
      <div className='flex '>
    <SearchBar list ={list}/>
     
      </div>
      <div className='flex justify-center'>
     

      </div>
      
      <TableUser setSelectedRow={setSelectedRow}  />
      
      <Pagination />
      {selectedRow && <DetailsCard selectedRow={selectedRow} setSelectedRow={setSelectedRow} downloadCardPDF={downloadCardPDF} />}
    </div>
  )
}
