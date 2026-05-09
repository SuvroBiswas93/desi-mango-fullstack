const COMPANY = {
  name: "Antique Product",
  tagline: "Quality You Can Trust",
  email: "support@yourcompany.com",
  phone: "+880 1700-000000",
  address: "123 Business Ave, Dhaka 1200, Bangladesh",
  website: "www.yourcompany.com",
};

const C = {
  dark: [15, 23, 42],
  mid: [30, 41, 59],
  accent: [234, 179, 8],
  white: [255, 255, 255],
  light: [248, 250, 252],
  muted: [100, 116, 139],
  border: [203, 213, 225],
  rowAlt: [241, 245, 249],
};

const fill = (doc, rgb) => doc.setFillColor(...rgb);
const text = (doc, rgb) => doc.setTextColor(...rgb);
const draw = (doc, rgb) => doc.setDrawColor(...rgb);

export const generateInvoicePdfBase64 = async (order) => {
  const { jsPDF } = await import("jspdf/dist/jspdf.es.min.js");
  const { default: autoTable } = await import("jspdf-autotable");

  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const PW = 210;
  const ML = 14;
  const MR = 196;
  const displayOrderId = order.orderId || order._id?.toString?.() || "0000";
  const date = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  fill(doc, C.dark);
  doc.rect(0, 0, PW, 50, "F");
  fill(doc, C.accent);
  doc.rect(0, 0, 5, 50, "F");

  text(doc, C.accent);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text(COMPANY.name, ML + 6, 20);

  text(doc, [180, 190, 210]);
  doc.setFont("helvetica", "italic");
  doc.setFontSize(9);
  doc.text(COMPANY.tagline, ML + 6, 27);

  text(doc, C.white);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(28);
  doc.text("INVOICE", MR, 22, { align: "right" });

  text(doc, C.accent);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(`#${displayOrderId}`, MR, 30, { align: "right" });
  doc.text(`Date: ${date}`, MR, 36, { align: "right" });

  fill(doc, C.accent);
  doc.rect(0, 50, PW, 1.5, "F");

  const billX = ML;
  const billY = 57;
  const billW = 88;

  fill(doc, C.light);
  doc.rect(billX, billY, billW, 40, "F");
  draw(doc, C.border);
  doc.setLineWidth(0.3);
  doc.rect(billX, billY, billW, 40, "S");

  fill(doc, C.dark);
  doc.rect(billX, billY, billW, 8, "F");
  text(doc, C.accent);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.text("BILL TO", billX + 4, billY + 5.5);

  text(doc, C.dark);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text(order.customer?.name || "-", billX + 4, billY + 15);

  text(doc, C.muted);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(`Phone: ${order.customer?.phone || "-"}`, billX + 4, billY + 21);

  const addressLines = doc.splitTextToSize(
    `Address: ${order.customer?.address || "-"}`,
    billW - 8,
  );
  doc.text(addressLines, billX + 4, billY + 27);

  const summaryX = 110;
  const summaryW = 86;

  fill(doc, C.light);
  doc.rect(summaryX, billY, summaryW, 40, "F");
  draw(doc, C.border);
  doc.setLineWidth(0.3);
  doc.rect(summaryX, billY, summaryW, 40, "S");

  fill(doc, C.dark);
  doc.rect(summaryX, billY, summaryW, 8, "F");
  text(doc, C.accent);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.text("ORDER DETAILS", summaryX + 4, billY + 5.5);

  [
    ["Order ID", `#${displayOrderId}`],
    ["Date", date],
    ["Status", order.status || "Pending"],
    ["Payment", order.customer?.paymentMethod || "Cash on Delivery"],
  ].forEach(([label, value], index) => {
    const y = billY + 13 + index * 6.5;
    text(doc, C.muted);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.text(label, summaryX + 4, y);
    text(doc, C.dark);
    doc.setFont("helvetica", "bold");
    doc.text(value, summaryX + summaryW - 4, y, { align: "right" });
  });

  const tableRows = (order.products || []).map((product, index) => [
    index + 1,
    product.name || "-",
    product.quantity || 1,
    `Taka:${Number(product.price || 0).toLocaleString()}`,
    `Taka:${((product.price || 0) * (product.quantity || 1)).toLocaleString()}`,
  ]);

  autoTable(doc, {
    head: [["#", "Product Name", "Qty", "Unit Price", "Total"]],
    body: tableRows,
    startY: 103,
    margin: { left: ML, right: ML },
    tableWidth: MR - ML,
    styles: { font: "helvetica", fontSize: 9, textColor: C.dark, cellPadding: 3.5 },
    headStyles: {
      fillColor: C.dark,
      textColor: C.accent,
      fontStyle: "bold",
      halign: "center",
    },
    columnStyles: {
      0: { halign: "center", cellWidth: 10 },
      1: { halign: "left", cellWidth: 90 },
      2: { halign: "center", cellWidth: 18 },
      3: { halign: "right", cellWidth: 32 },
      4: { halign: "right", cellWidth: 32 },
    },
    alternateRowStyles: { fillColor: C.rowAlt },
    theme: "plain",
  });

  const tableBottom = doc.lastAutoTable.finalY;
  const summaryY = tableBottom + 8;
  const subtotal = (order.products || []).reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
    0,
  );
  const shipping = order.shipping || 0;
  const total = order.total ?? subtotal + shipping;

  fill(doc, C.light);
  doc.rect(118, summaryY, MR - 118, 32, "F");
  draw(doc, C.border);
  doc.setLineWidth(0.3);
  doc.rect(118, summaryY, MR - 118, 32, "S");

  const drawSummaryRow = (label, value, y, bold = false) => {
    text(doc, bold ? C.dark : C.muted);
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(bold ? 10 : 9);
    doc.text(label, 123, y);
    text(doc, bold ? C.accent : C.dark);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(bold ? 11 : 9);
    doc.text(value, MR - 4, y, { align: "right" });
  };

  drawSummaryRow("Subtotal", `Taka:${subtotal.toLocaleString()}`, summaryY + 9);
  drawSummaryRow("Shipping", `Taka:${shipping.toLocaleString()}`, summaryY + 17);
  draw(doc, C.border);
  doc.line(122, summaryY + 20, MR - 2, summaryY + 20);
  drawSummaryRow("Grand Total", `Taka:${total.toLocaleString()}`, summaryY + 28, true);

  const footerY = 272;
  fill(doc, C.mid);
  doc.rect(0, footerY, PW, 25, "F");
  fill(doc, C.accent);
  doc.rect(0, footerY, PW, 1.2, "F");

  [`Email: ${COMPANY.email}`, `Phone: ${COMPANY.phone}`, `Web: ${COMPANY.website}`].forEach(
    (label, index) => {
      const x = (PW / 3) * index + PW / 6;
      text(doc, C.accent);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.text(label, x, footerY + 10, { align: "center" });
    },
  );

  text(doc, [150, 160, 175]);
  doc.setFont("helvetica", "italic");
  doc.setFontSize(6.5);
  doc.text(
    `${COMPANY.address} | This is a computer-generated invoice. No signature required.`,
    PW / 2,
    footerY + 21,
    { align: "center" },
  );

  return Buffer.from(doc.output("arraybuffer")).toString("base64");
};
