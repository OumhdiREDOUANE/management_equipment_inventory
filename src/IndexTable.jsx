import React, { useEffect, useState } from 'react'

import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import Table from'./Table'
import SearchBar from "./SearchBar"
import Pagination from './Pagination'
import FiltersEmplacement from "./filterEmplacement"
import { useDispatch, useSelector} from 'react-redux'
import DetailsCard from "./ItemDetailsModal"
import {useParams} from "react-router"
import {Props,PdfObject} from "./pdf" 
import "./IndexTable.css"

export default function IndexTable() {
  const list = useSelector(state=>state.isHistory)
const {file}=useParams()
  const tableData = useSelector(state=>state.tableData)
const dispatch =useDispatch()
useEffect(()=>{
  console.log(file)
if(file=="List_inventory"){
  dispatch({type:"isHistory",payload:"list"})

}else if(file=="history"){

  dispatch({type:"isHistory",payload:"history"})
}
else if(file=="List_user"){
  dispatch({type:"isHistory",payload:"users"})
}
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
        <SearchBar/>
      {file=="List_inventory"&&<div className='mx-2 '>
        <button className="btn btn-success w-[fit-content] " onClick={()=>setFileType(!fileType)}><img src="/downloads.png" className='w-[20px] h-[20px]'/></button>
       
      {fileType &&
      <div className="card flex absolute z-2">
  <button className="btn btn-success w-[fit-content]  " onClick={downloadCSV}><img src="/csv-file-format-extension.png" className='w-[17px] h-[17px]'/></button>
        <button className="btn btn-danger w-[fit-content]" onClick={downloadPDF}><img src="/download-pdf.png" className='w-[17px] h-[17px]'/></button> 
      </div>
  
  
}
</div>}
      </div>
      <div className='flex justify-center'>
      <FiltersEmplacement />

      </div>
      
      <Table setSelectedRow={setSelectedRow}  />
      
      <Pagination />
      {selectedRow && <DetailsCard selectedRow={selectedRow} setSelectedRow={setSelectedRow} downloadCardPDF={downloadCardPDF} />}
    </div>
  )
}
