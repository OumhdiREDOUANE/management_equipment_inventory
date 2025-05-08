import jsPDFInvoiceTemplate from "jspdf-invoice-template";

import {logo} from "./logo"
export  function PdfObject ({props}){
     jsPDFInvoiceTemplate(props);
 
}
const getCurrentDateTime = () => {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}`;
};

export   function Props ({selectedData}){
    var  props = {
        outputType: "save", 
        returnJsPDFDocObject: true,
        fileName: "Invoice 2021",
    orientationLandscape: true,
    compress: true,
    logo: {
src :logo,        //optional, when src= data:uri (nodejs case)
        width: 43.33, //aspect ratio = width/height
        height: 16.66,
        margin: {
            top: 0, //negative or positive num, from the current position
            left: 0 //negative or positive num, from the current position
        },
        
    },
   
    business: {
        name: localStorage.getItem("nomUser"),
    },
    
    invoice: {
        label: "N° inventaire #: ",
        num:selectedData.length ,
        
        invGenDate: "date de impriment: "+getCurrentDateTime(),
        headerBorder: true,
        tableBodyBorder: true,
        header: [
            { title: "n°inventaire", style: { width: 20 } },  // عرض صغير
            { title: "Description", style: { width: 70 } },   // عرض كبير
            { title: "Unité", style: { width: 20 } },
            { title: "Quantité", style: { width: 25 } },
            { title: "Affectation", style: { width: 35 } },
            { title: "Réaffectation", style: { width: 35 } },
            { title: "État", style: { width: 20 } },
            { title: "Emplacement", style: { width: 30 } },
            { title: "Responsable", style: { width: 50 } }
        ],
        table: selectedData.map((item) => ([
            "\n"+ item?.inventaire ?? "N/A"+ "\n\n",
           "\n"+ item?.Désignation ?? "N/A"+ "\n\n",
            "\n"+item?.Unité?.toString() ?? "N/A"+ "\n\n",
            "\n"+item?.Quantité?.toString() ?? "N/A"+ "\n\n",
            "\n"+item?.Affectation ?? "N/A"+ "\n\n",
            "\n"+item?.Réaffectation ?? "N/A"+ "\n\n",
            "\n"+item?.État ?? "N/A"+ "\n\n",
           "\n"+ item?.Emplacement ?? "N/A"+ "\n\n",
           "\n"+ item?.Responsable ?? "N/A"+ "\n\n"
           
        ])),
        
        
       
    },
    
};
return props
 }