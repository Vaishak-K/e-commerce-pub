"use client";

import { Button } from "@nextui-org/button";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { ToWords } from "to-words";

declare module "jspdf" {
  interface jsPDF {
    lastAutoTable: any; // You can replace `any` with a more specific type if necessary
  }
}

export default function RenderedOrders({ ord, products, address }: any) {
  const HandleDownloadPDF = () => {
    const pdf = new jsPDF();

    // Add Logo (optional)
    // pdf.setFont("", "italic");
    // pdf.addImage("/4thepeoplelogo.jpeg", "JPEG", 10, 10, 40, 10);
    pdf.setFontSize(14);

    // Title
    pdf.text("Tax Invoice/Bill of Supply/Cash Memo", 120, 15);
    pdf.setFont("", "bolditalic");
    pdf.text("(Original for Recipient)", 120, 20);
    pdf.setFontSize(15);
    // Add Billing Address
    pdf.setFont("", "bold");
    pdf.text("Billing Address", 10, 50);
    pdf.setFont("", "normal");
    pdf.setFontSize(14);

    // Ensure values are strings and handle undefined/null gracefully
    pdf.text(address?.name || "Unknown", 10, 60);
    pdf.text(address?.address1 || "Unknown Address", 10, 65);
    pdf.text(address?.address2 || "", 10, 70); // If no address2, just leave it empty
    pdf.text(
      `Contact Number: ${Number(address?.phonenumber) || "N/A"}`,
      10,
      75
    );
    pdf.text(`Pincode: ${Number(address?.pincode) || "N/A"}`, 10, 80);

    // Add Sold by
    pdf.setFontSize(15);
    pdf.setFont("", "bold");
    pdf.text("Sold by", 120, 50);
    pdf.setFont("", "normal");
    pdf.setFontSize(14);
    pdf.text("SBC Home Needs", 120, 60);
    pdf.text("1st Floor, ABC Building", 120, 65);
    pdf.text("Palakkad", 120, 70);
    pdf.text(
      `Invoice Date: ${ord?.createdAt?.toDateString() || "N/A"}`,
      10,
      110
    );

    // Add Invoice ID and Date
    pdf.text(`Order Date: ${ord?.createdAt?.toDateString() || "N/A"}`, 10, 100);
    pdf.text(`Invoice ID: ${ord?.id || "N/A"}`, 10, 105);

    pdf.setFontSize(12);
    // Add Table Header and Rows
    const tableColumn = [
      "S.No",
      "Description",
      "Price",
      "Quantity",
      "Net Amount",
      "SGST",
      "CGST",
      "Total",
    ];
    const tableRows: any = [];
    let quantity = JSON.parse(ord?.quantity);
    const val = Object.keys(quantity);
    val?.forEach((qt: any, i: number) => {
      const findpro = products.find((a: any) => a.id === qt);
      const total = Number(findpro?.price) * Number(quantity[qt]);
      console.log("FindPRo", findpro);
      tableRows.push([
        i + 1,
        `${findpro?.name}\nHSN Code:` || "Unknown Item",
        total - (total * Number(findpro?.tax || 0)) / 100,
        quantity[qt] || "0",
        (total - (total * Number(findpro?.tax || 0)) / 100) * quantity[qt],
        `${(findpro?.tax / 2).toFixed(1)}%` || "0%",
        `${(findpro?.tax / 2).toFixed(1)}%` || "0%",
        findpro?.price * quantity[qt] || "0",
      ]);
    });

    // Adding table to PDF
    (pdf as any).autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 120,
      theme: "grid",
    });

    // Grand Total and Amount in Words
    const sectableRows: any = [];
    let lengthof = (ord?.price).toString().length;
    lengthof = lengthof > 5 ? lengthof : 0;
    const toWords = new ToWords();
    let amountInWords = toWords.convert(Math.floor(ord?.price));
    sectableRows.push([
      `${" ".repeat(145 - lengthof)}Grand Total: ${ord?.price}/-`,
    ]);
    sectableRows.push([`Amount in Words: ${amountInWords} Only`]);

    const a = pdf.lastAutoTable.finalY;
    (pdf as any).autoTable({
      head: [],
      body: sectableRows,
      startY: a,
      theme: "grid",
    });
    const b = pdf.lastAutoTable.finalY;
    let c = pdf.internal.pageSize.height;
    pdf.setFontSize(16);
    pdf.setFont("", "bolditalic");
    pdf.text("Thank you for Shopping with us :)", 60, c - 10);

    // Save the PDF
    const date = new Date();
    pdf.output("pdfobjectnewwindow");
    pdf.save(`Invoice_No_${ord?.id}-${date.getMilliseconds()}.pdf`);
  };

  return (
    <>
      <div className="flex justify-between">
        <Button onClick={HandleDownloadPDF}>Download PDF</Button>
        <Button onClick={HandleDownloadPDF}>Download PDF</Button>
      </div>
    </>
  );
}
