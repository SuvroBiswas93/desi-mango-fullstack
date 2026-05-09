// // utils/pdfGenerator.js
// import { hindSiliguriBase64 } from "./font"; // আপনার হিন্দ সিলিগুরি ফন্টের Base64 এনকোডেড স্ট্রিং

// // ── কোম্পানির তথ্য এখানে পরিবর্তন করুন ──────────────────────────────────────
// const COMPANY = {
//   name:    "Antique Product",
//   tagline: "Quality You Can Trust",
//   email:   "support@yourcompany.com",
//   phone:   "+880 1700-000000",
//   address: "123 Business Ave, Dhaka 1200, Bangladesh",
//   website: "www.yourcompany.com",
// };
// //  ---- ─────────────────────────────────────────────────────────────────────────────



// // রঙের প্যালেট (প্রিমিয়াম ডার্ক + গোল্ড অ্যাকসেন্ট)
// const C = {
//   dark:       [15,  23,  42],   // slate-900
//   mid:        [30,  41,  59],   // slate-800
//   accent:     [234, 179,  8],   // amber-500 (gold)
//   accentDark: [180, 130,  0],   // amber-700
//   white:      [255, 255, 255],
//   light:      [248, 250, 252],  // slate-50
//   muted:      [100, 116, 139],  // slate-500
//   border:     [203, 213, 225],  // slate-300
//   rowAlt:     [241, 245, 249],  // slate-100
// };

// /** ছোট helper: RGB অ্যারে থেকে setFillColor / setTextColor / setDrawColor */
// const fill  = (doc, rgb) => doc.setFillColor  (...rgb);
// const text  = (doc, rgb) => doc.setTextColor  (...rgb);
// const draw  = (doc, rgb) => doc.setDrawColor  (...rgb);

// export const downloadInvoice = async (placedOrder) => {
//   if (!placedOrder) return;

//   const { jsPDF } = await import("jspdf/dist/jspdf.es.min.js");
//   const { default: autoTable } = await import("jspdf-autotable");

//   const doc = new jsPDF({ unit: "mm", format: "a4" });
//   const PW = 210;
//   const ML = 14;
//   const MR = 196;

//   const displayOrderId = placedOrder.orderId || placedOrder._id?.toString?.() || "0000";
//   const date = new Date().toLocaleDateString("en-GB", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//   });

//   fill(doc, C.dark);
//   doc.rect(0, 0, PW, 50, "F");
//   fill(doc, C.accent);
//   doc.rect(0, 0, 5, 50, "F");

//   text(doc, C.accent);
//   doc.setFont("helvetica", "bold");
//   doc.setFontSize(22);
//   doc.text(COMPANY.name, ML + 6, 20);

//   text(doc, [180, 190, 210]);
//   doc.setFont("helvetica", "italic");
//   doc.setFontSize(9);
//   doc.text(COMPANY.tagline, ML + 6, 27);

//   text(doc, C.white);
//   doc.setFont("helvetica", "bold");
//   doc.setFontSize(28);
//   doc.text("INVOICE", MR, 22, { align: "right" });

//   text(doc, C.accent);
//   doc.setFont("helvetica", "normal");
//   doc.setFontSize(9);
//   doc.text(`#${displayOrderId}`, MR, 30, { align: "right" });
//   doc.text(`Date: ${date}`, MR, 36, { align: "right" });

//   fill(doc, C.accent);
//   doc.rect(0, 50, PW, 1.5, "F");

//   const billX = ML;
//   const billY = 57;
//   const billW = 88;

//   fill(doc, C.light);
//   doc.rect(billX, billY, billW, 40, "F");
//   draw(doc, C.border);
//   doc.setLineWidth(0.3);
//   doc.rect(billX, billY, billW, 40, "S");

//   fill(doc, C.dark);
//   doc.rect(billX, billY, billW, 8, "F");
//   text(doc, C.accent);
//   doc.setFont("helvetica", "bold");
//   doc.setFontSize(8);
//   doc.text("BILL TO", billX + 4, billY + 5.5);

//   text(doc, C.dark);
//   doc.setFont("helvetica", "bold");
//   doc.setFontSize(10);
//   doc.text(placedOrder.customer?.name || "—", billX + 4, billY + 15);

//   text(doc, C.muted);
//   doc.setFont("helvetica", "normal");
//   doc.setFontSize(9);
//   doc.text(`Phone: ${placedOrder.customer?.phone || "—"}`, billX + 4, billY + 21);

//   const addressLines = doc.splitTextToSize(
//     `Address: ${placedOrder.customer?.address || "—"}`,
//     billW - 8,
//   );
//   doc.text(addressLines, billX + 4, billY + 27);

//   const summaryX = 110;
//   const summaryW = 86;

//   fill(doc, C.light);
//   doc.rect(summaryX, billY, summaryW, 40, "F");
//   draw(doc, C.border);
//   doc.setLineWidth(0.3);
//   doc.rect(summaryX, billY, summaryW, 40, "S");

//   fill(doc, C.dark);
//   doc.rect(summaryX, billY, summaryW, 8, "F");
//   text(doc, C.accent);
//   doc.setFont("helvetica", "bold");
//   doc.setFontSize(8);
//   doc.text("ORDER DETAILS", summaryX + 4, billY + 5.5);

//   const orderDetails = [
//     ["Order ID", `#${displayOrderId}`],
//     ["Date", date],
//     ["Status", placedOrder.status || "Pending"],
//     ["Payment", placedOrder.customer?.paymentMethod || "Cash on Delivery"],
//   ];

//   orderDetails.forEach(([label, value], index) => {
//     const y = billY + 13 + index * 6.5;
//     text(doc, C.muted);
//     doc.setFont("helvetica", "normal");
//     doc.setFontSize(8.5);
//     doc.text(label, summaryX + 4, y);

//     text(doc, C.dark);
//     doc.setFont("helvetica", "bold");
//     doc.text(value, summaryX + summaryW - 4, y, { align: "right" });
//   });

//   const tableRows = (placedOrder.products || []).map((product, index) => [
//     index + 1,
//     product.name || "-",
//     product.quantity || 1,
//     `Taka:${Number(product.price || 0).toLocaleString()}`,
//     `Taka:${((product.price || 0) * (product.quantity || 1)).toLocaleString()}`,
//   ]);

//   autoTable(doc, {
//     head: [["#", "Product Name", "Qty", "Unit Price", "Total"]],
//     body: tableRows,
//     startY: 103,
//     margin: { left: ML, right: ML },
//     tableWidth: MR - ML,
//     styles: {
//       font: "helvetica",
//       fontSize: 9,
//       textColor: C.dark,
//       cellPadding: 3.5,
//     },
//     headStyles: {
//       fillColor: C.dark,
//       textColor: C.accent,
//       fontStyle: "bold",
//       halign: "center",
//     },
//     columnStyles: {
//       0: { halign: "center", cellWidth: 10 },
//       1: { halign: "left", cellWidth: 90 },
//       2: { halign: "center", cellWidth: 18 },
//       3: { halign: "right", cellWidth: 32 },
//       4: { halign: "right", cellWidth: 32 },
//     },
//     alternateRowStyles: { fillColor: C.rowAlt },
//     theme: "plain",
//     didDrawCell: (data) => {
//       if (data.section === "head") {
//         const { x, y, width, height } = data.cell;
//         fill(doc, C.accent);
//         doc.rect(x, y + height - 0.8, width, 0.8, "F");
//       }
//     },
//   });

//   const tableBottom = doc.lastAutoTable.finalY;
//   const summaryY = tableBottom + 8;
//   const summaryWidth = MR - 118;

//   fill(doc, C.light);
//   doc.rect(118, summaryY, summaryWidth, 32, "F");
//   draw(doc, C.border);
//   doc.setLineWidth(0.3);
//   doc.rect(118, summaryY, summaryWidth, 32, "S");

//   const subtotal = (placedOrder.products || []).reduce(
//     (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
//     0,
//   );
//   const shipping = placedOrder.shipping || 0;
//   const total = placedOrder.total ?? subtotal + shipping;

//   const drawSummaryRow = (label, value, y, bold = false) => {
//     text(doc, bold ? C.dark : C.muted);
//     doc.setFont("helvetica", bold ? "bold" : "normal");
//     doc.setFontSize(bold ? 10 : 9);
//     doc.text(label, 118 + 5, y);

//     text(doc, bold ? C.accent : C.dark);
//     doc.setFont("helvetica", "bold");
//     doc.setFontSize(bold ? 11 : 9);
//     doc.text(value, MR - 4, y, { align: "right" });
//   };

//   drawSummaryRow("Subtotal", `Taka:${subtotal.toLocaleString()}`, summaryY + 9);
//   drawSummaryRow("Shipping", `Taka:${shipping.toLocaleString()}`, summaryY + 17);

//   draw(doc, C.border);
//   doc.setLineWidth(0.4);
//   doc.line(118 + 4, summaryY + 20, MR - 2, summaryY + 20);

//   drawSummaryRow("Grand Total", `Taka:${total.toLocaleString()}`, summaryY + 28, true);

//   const noteY = summaryY + 6;
//   fill(doc, C.rowAlt);
//   doc.rect(ML, noteY, summaryWidth - 2, 22, "F");
//   draw(doc, C.border);
//   doc.setLineWidth(0.25);
//   doc.rect(ML, noteY, summaryWidth - 2, 22, "S");

//   fill(doc, C.accent);
//   doc.rect(ML, noteY, 3, 22, "F");

//   text(doc, C.dark);
//   doc.setFont("helvetica", "bold");
//   doc.setFontSize(9);
//   doc.text("Thank You for Your Order!", ML + 7, noteY + 8);

//   text(doc, C.muted);
//   doc.setFont("helvetica", "normal");
//   doc.setFontSize(8);
//   doc.text(
//     "We appreciate your business. For any queries, feel free to contact us.",
//     ML + 7, noteY + 14, { maxWidth: summaryWidth - 14 }
//   );

//   const footerY = 272;
//   fill(doc, C.mid);
//   doc.rect(0, footerY, PW, 25, "F");
//   fill(doc, C.accent);
//   doc.rect(0, footerY, PW, 1.2, "F");

//   const footerCols = [
//     `Email: ${COMPANY.email}`,
//     `Phone: ${COMPANY.phone}`,
//     `Web: ${COMPANY.website}`,
//   ];

//   footerCols.forEach((textLabel, index) => {
//     const x = (PW / 3) * index + PW / 6;
//     text(doc, C.accent);
//     doc.setFont("helvetica", "bold");
//     doc.setFontSize(9);
//     doc.text(textLabel, x, footerY + 10, { align: "center" });
//   });

//   text(doc, [150, 160, 175]);
//   doc.setFont("helvetica", "italic");
//   doc.setFontSize(6.5);
//   doc.text(
//     `${COMPANY.address} | This is a computer-generated invoice. No signature required.`,
//     PW / 2, footerY + 21, { align: "center" }
//   );

//   doc.save(`Invoice_${displayOrderId}.pdf`);
// };




// utils/pdfGenerator.js
export const downloadInvoice = (placedOrder) => {
  if (!placedOrder) return;

  const printContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Invoice ${placedOrder.orderId}</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          padding: 40px;
          max-width: 800px;
          margin: 0 auto;
        }
        .header {
          background: #0f172a;
          color: #fbbf24;
          padding: 20px;
          text-align: center;
          border-radius: 10px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
        }
        th, td {
          border: 1px solid #ddd;
          padding: 10px;
          text-align: left;
        }
        th {
          background: #0f172a;
          color: #fbbf24;
        }
        .total {
          background: #fef3c7;
          font-weight: bold;
        }
        .footer {
          text-align: center;
          margin-top: 30px;
          padding: 20px;
          background: #f0fdf4;
        }
        @media print {
          body {
            padding: 20px;
          }
          .no-print {
            display: none;
          }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>দেশি আম</h1>
        <p>Quality You Can Trust</p>
      </div>
      
      <h2>অর্ডার সফল হয়েছে!</h2>
      <p><strong>অর্ডার আইডি:</strong> ${placedOrder.orderId}</p>
      <p><strong>তারিখ:</strong> ${new Date().toLocaleDateString('bn-BD')}</p>
      
      <h3>গ্রাহকের তথ্য</h3>
      <p><strong>নাম:</strong> ${placedOrder.customer?.name || '—'}</p>
      <p><strong>ফোন:</strong> ${placedOrder.customer?.phone || '—'}</p>
      <p><strong>ঠিকানা:</strong> ${placedOrder.customer?.address || '—'}</p>
      
      <table>
        <thead>
          <tr><th>পণ্যের নাম</th><th>পরিমাণ</th><th>মূল্য</th><th>মোট</th></tr>
        </thead>
        <tbody>
          ${(placedOrder.products || []).map(p => `
            <tr>
              <td>${p.name}</td>
              <td>${p.quantity}</td>
              <td>${p.price} ৳</td>
              <td>${p.price * p.quantity} ৳</td>
            </tr>
          `).join('')}
        </tbody>
        <tfoot>
          <tr class="total">
            <td colspan="3"><strong>মোট</strong></td>
            <td><strong>${placedOrder.total || 0} ৳</strong></td>
          </tr>
        </tfoot>
      
    
      
      <div class="footer">
        <p>🎉 আপনার অর্ডারের জন্য ধন্যবাদ!</p>
        <p>support@yourcompany.com | +880 1700-000000</p>
      </div>
      
      <div class="no-print" style="text-align: center; margin-top: 20px;">
        <button onclick="window.print()" style="padding: 10px 20px; background: #0f172a; color: white; border: none; border-radius: 5px; cursor: pointer;">
          প্রিন্ট / PDF সেভ করুন
        </button>
      </div>
    </body>
    </html>
  `;

  const win = window.open('', '_blank');
  win.document.write(printContent);
  win.document.close();
  
  // অটো প্রিন্ট ডায়ালগ খুলবে
  setTimeout(() => {
    win.print();
  }, 500);
};