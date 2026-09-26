import React, { useState } from "react";
import {
  ShoppingCart,
  X,
  Minus,
  Plus,
  Trash2,
  ArrowRight,
  ShieldCheck,
  Download,
  FileSpreadsheet,
  Check,
  Copy,
  Package,
} from "lucide-react";
import { useCart } from "../../../context/CartContext";
import { useAuth } from "../../../context/AuthContext";
import { useToast } from "../../../context/ToastContext";
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    closeCartDrawer,
    updateQty,
    removeFromCart,
    subtotal,
    clearCart,
  } = useCart();
  const { currentUser } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [copiedSku, setCopiedSku] = useState<string | null>(null);

  if (!isCartOpen) return null;

  const gstAmount = Math.round(subtotal * 0.18);
  const grandTotal = subtotal + gstAmount;

  const handleCheckoutRfq = () => {
    if (cart.length === 0) {
      showToast("Your RFQ Cart is empty. Add products to request a quotation.");
      return;
    }

    closeCartDrawer();

    const transferItemsToForm = () => {
      const summaryList = cart
        .map(
          (item) =>
            `• [${item.brand}] ${item.name} (Part No: ${item.partNo}) — Qty: ${item.qty} ${item.unit} @ ₹${item.price.toLocaleString("en-IN")}/${item.unit}`
        )
        .join("\n");

      const notesField = document.getElementById("rfqNotes") as HTMLTextAreaElement;
      if (notesField) {
        notesField.value = `Formal Project RFQ for Bill of Materials:\n\n${summaryList}\n\nEstimated Subtotal: ₹${subtotal.toLocaleString("en-IN")}\nGST (18%): ₹${gstAmount.toLocaleString("en-IN")}\nEstimated Total: ₹${grandTotal.toLocaleString("en-IN")}\n\nPlease share formal GST tax quotation with delivery lead time from Bangalore Central Hub.`;
        notesField.focus();
      }
      showToast("BOM items loaded into RFQ form below!");
    };

    if (window.location.pathname !== "/") {
      navigate("/#rfqSection");
      setTimeout(transferItemsToForm, 300);
    } else {
      document.getElementById("rfqSection")?.scrollIntoView({ behavior: "smooth" });
      setTimeout(transferItemsToForm, 100);
    }
  };

  // EXPORT BILL OF MATERIALS AS OFFICIAL PDF
  const handleExportBOMPDF = () => {
    if (cart.length === 0) return;

    try {
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      // 1. Top Brand Banner
      doc.setFillColor(59, 14, 28); // #3b0e1c Deep Maroon
      doc.rect(0, 0, 210, 36, "F");

      // Company Title
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.text("SIDDHI KABEL CORPORATION PRIVATE LIMITED", 14, 13);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.setTextColor(254, 205, 211);
      doc.text("Official Authorized Distributor & Channel Partner", 14, 19);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(7.5);
      doc.setTextColor(226, 232, 240);
      doc.text("LAPP Kabel Germany · EATON Moeller · PARTEX Sweden · MENNEKES", 14, 24);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(7.5);
      doc.setTextColor(255, 255, 255);
      doc.text("Phone: +91 96200 00947 / +91 80 2221 4455  |  Email: sales@siddhikabel.com / enquiry@siddhikabel.com", 14, 30);

      // 2. Document Title Ribbon
      doc.setFillColor(241, 245, 249);
      doc.rect(14, 42, 182, 17, "F");
      doc.setDrawColor(203, 213, 225);
      doc.rect(14, 42, 182, 17, "S");

      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(15, 23, 42);
      doc.text("BILL OF MATERIALS (BOM) & COMMERCIAL SPECIFICATION", 18, 49);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(100, 116, 139);
      const quoteRef = `SKC-BOM-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${Math.floor(1000 + Math.random() * 9000)}`;
      const dateStr = new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
      const clientName = currentUser ? `Customer: ${currentUser.companyName} (${currentUser.contactPerson})` : "Customer: Direct Corporate Client";
      doc.text(`BOM Ref: ${quoteRef}  |  Date: ${dateStr}  |  ${clientName}`, 18, 55);

      // 3. Items Table Header
      let y = 66;
      doc.setFillColor(15, 23, 42);
      doc.rect(14, y, 182, 8, "F");

      doc.setFont("helvetica", "bold");
      doc.setFontSize(7.5);
      doc.setTextColor(255, 255, 255);
      doc.text("#", 17, y + 5.5);
      doc.text("Brand & Part No", 24, y + 5.5);
      doc.text("Item Name & Specification", 70, y + 5.5);
      doc.text("Quantity", 134, y + 5.5);
      doc.text("Unit Rate", 152, y + 5.5);
      doc.text("Total (INR)", 175, y + 5.5);

      y += 8;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);

      cart.forEach((item, index) => {
        if (y > 250) {
          doc.addPage();
          y = 20;
        }

        const rowBg = index % 2 === 0 ? 255 : 248;
        doc.setFillColor(rowBg, rowBg, rowBg);
        doc.rect(14, y, 182, 11, "F");
        doc.setDrawColor(241, 245, 249);
        doc.line(14, y + 11, 196, y + 11);

        doc.setTextColor(100, 116, 139);
        doc.text(String(index + 1), 17, y + 7);

        // Brand & SKU
        doc.setFont("helvetica", "bold");
        doc.setTextColor(15, 23, 42);
        doc.text(item.brand.split(" ")[0], 24, y + 4.5);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(6.8);
        doc.setTextColor(100, 116, 139);
        doc.text(item.partNo, 24, y + 9);

        // Description
        doc.setFontSize(7.5);
        doc.setTextColor(15, 23, 42);
        const cleanName = item.name.length > 40 ? item.name.substring(0, 38) + "..." : item.name;
        doc.text(cleanName, 70, y + 7);

        // Qty
        doc.setTextColor(51, 65, 85);
        doc.text(`${item.qty} ${item.unit}`, 134, y + 7);

        // Unit Price
        doc.text(`Rs. ${item.price.toLocaleString("en-IN")}`, 152, y + 7);

        // Line Total
        const lineTotal = item.price * item.qty;
        doc.setFont("helvetica", "bold");
        doc.text(`Rs. ${lineTotal.toLocaleString("en-IN")}`, 175, y + 7);

        y += 11;
      });

      // 4. Totals Block
      y += 6;
      if (y > 240) {
        doc.addPage();
        y = 20;
      }

      const totalsBoxX = 120;
      const totalsBoxW = 76;
      doc.setFillColor(248, 250, 252);
      doc.rect(totalsBoxX, y, totalsBoxW, 26, "F");
      doc.setDrawColor(203, 213, 225);
      doc.rect(totalsBoxX, y, totalsBoxW, 26, "S");

      doc.setFont("helvetica", "normal");
      doc.setFontSize(7.5);
      doc.setTextColor(71, 85, 105);
      doc.text("BOM Subtotal:", totalsBoxX + 4, y + 6);
      doc.text(`Rs. ${subtotal.toLocaleString("en-IN")}`, totalsBoxX + totalsBoxW - 4, y + 6, { align: "right" });

      doc.text("Estimated GST (18%):", totalsBoxX + 4, y + 12);
      doc.text(`Rs. ${gstAmount.toLocaleString("en-IN")}`, totalsBoxX + totalsBoxW - 4, y + 12, { align: "right" });

      doc.setDrawColor(203, 213, 225);
      doc.line(totalsBoxX, y + 16, totalsBoxX + totalsBoxW, y + 16);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(8.5);
      doc.setTextColor(15, 23, 42);
      doc.text("Estimated Quote Total:", totalsBoxX + 4, y + 22);
      doc.setTextColor(220, 38, 38);
      doc.text(`Rs. ${grandTotal.toLocaleString("en-IN")}`, totalsBoxX + totalsBoxW - 4, y + 22, { align: "right" });

      // 5. Commercial Terms & Warranty
      y += 34;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.setTextColor(15, 23, 42);
      doc.text("Commercial Terms & OEM Authenticity Warranty:", 14, y);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(7.2);
      doc.setTextColor(100, 116, 139);
      doc.text("1. All items are 100% factory original OEM supplied under manufacturer warranty with batch traceability.", 14, y + 4.5);
      doc.text("2. Immediate dispatch available from Bangalore Central Stock warehouse subject to prior confirmation.", 14, y + 8.5);
      doc.text("3. Manufacturer Test Certificates (EN 10204 3.1) and GST Tax Invoices are attached with all dispatches.", 14, y + 12.5);

      // 6. Footer
      doc.setDrawColor(226, 232, 240);
      doc.line(14, 282, 196, 282);
      doc.setFontSize(7);
      doc.setTextColor(148, 163, 184);
      doc.text("Siddhi Kabel Corporation Pvt Ltd · Bangalore Headquarters", 14, 287);
      doc.text("Official Technical RFQ BOM", 196, 287, { align: "right" });

      doc.save(`Siddhi-Kabel-BOM-${new Date().toISOString().slice(0, 10)}.pdf`);
      showToast("Downloaded Bill of Materials (BOM) as PDF!");
    } catch (err) {
      console.error("PDF generation failed:", err);
      showToast("Generating PDF... Please wait.");
    }
  };

  const handleExportCSV = () => {
    if (cart.length === 0) return;
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["Brand,Part No,Product Name,Quantity,Unit,Est Rate (INR),Est Amount (INR)"]
        .concat(
          cart.map(
            (i) =>
              `"${i.brand}","${i.partNo}","${i.name.replace(/"/g, '""')}",${i.qty},"${i.unit}",${i.price},${i.price * i.qty}`
          )
        )
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `Siddhi-Kabel-RFQ-BOM-${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Bill of Materials (BOM) exported to CSV!");
  };

  const handleCopySku = (sku: string) => {
    navigator.clipboard?.writeText(sku);
    setCopiedSku(sku);
    showToast(`Copied SKU: ${sku}`);
    setTimeout(() => setCopiedSku(null), 1800);
  };

  const getBrandBadge = (brand: string) => {
    const b = brand.toLowerCase();
    if (b.includes("lapp")) {
      return "bg-amber-50 text-amber-900 border-amber-300";
    }
    if (b.includes("eaton")) {
      return "bg-sky-50 text-sky-900 border-sky-300";
    }
    if (b.includes("partex")) {
      return "bg-emerald-50 text-emerald-900 border-emerald-300";
    }
    if (b.includes("menn")) {
      return "bg-purple-50 text-purple-900 border-purple-300";
    }
    return "bg-slate-100 text-slate-800 border-slate-300";
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-3 sm:p-6 lg:p-8 flex items-center justify-center animate-fade-in select-none">
      {/* Blurred Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-md transition-opacity"
        onClick={closeCartDrawer}
      />

      {/* POPUP PAGE MODAL WINDOW (Simple, Professional 21st Century) */}
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden flex flex-col max-h-[92vh] z-10 animate-scale-up">
        
        {/* Header */}
        <div className="px-5 sm:px-7 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-900 text-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-rose-600 text-white rounded-2xl shadow-md">
              <ShoppingCart size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-white tracking-tight">
                  RFQ Quotation Cart & Bill of Materials
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono text-xs font-bold border border-slate-700">
                  {cart.length} {cart.length === 1 ? "item" : "items"}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                Siddhi Kabel Corporation · Bangalore Central Logistics Stock
                {currentUser ? ` · ${currentUser.companyName}` : ""}
              </p>
            </div>
          </div>

          <button
            onClick={closeCartDrawer}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close cart popup"
          >
            <X size={20} />
          </button>
        </div>

        {/* Cart Items List with Interactive Hover Effects */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 divide-y divide-slate-100 space-y-3">
          {cart.length > 0 ? (
            cart.map((item) => {
              const itemTotal = item.price * item.qty;

              return (
                <div
                  key={item.id}
                  className="pt-3 first:pt-0 pb-1 rounded-2xl p-3 sm:p-4 border border-transparent hover:border-slate-200 hover:bg-slate-50/80 transition-all duration-200 group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      
                      {/* Brand & Part No Badges */}
                      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border font-mono ${getBrandBadge(
                            item.brand
                          )}`}
                        >
                          {item.brand}
                        </span>

                        <button
                          type="button"
                          onClick={() => handleCopySku(item.partNo)}
                          className="flex items-center gap-1 text-[11px] text-slate-500 hover:text-slate-900 font-mono bg-white hover:bg-slate-100 px-2 py-0.5 rounded border border-slate-200 transition-colors"
                          title="Click to copy part number"
                        >
                          {copiedSku === item.partNo ? (
                            <>
                              <Check size={11} className="text-emerald-600" />
                              <span className="text-emerald-700 font-bold">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy size={11} />
                              <span>{item.partNo}</span>
                            </>
                          )}
                        </button>
                      </div>

                      {/* Product Name */}
                      <h4 className="text-xs sm:text-sm font-bold text-slate-950 group-hover:text-sky-600 transition-colors line-clamp-2 leading-snug">
                        {item.name}
                      </h4>

                      {/* Unit Price */}
                      <div className="text-xs text-slate-500 font-mono mt-1">
                        Basic Rate: <span className="font-bold text-slate-900">₹{item.price.toLocaleString("en-IN")}</span> / {item.unit}
                      </div>
                    </div>

                    {/* Stepper & Line Total */}
                    <div className="flex sm:flex-col items-center sm:items-end justify-between gap-3 shrink-0">
                      <div className="flex items-center gap-2">
                        {/* Interactive Quantity Stepper with Hover */}
                        <div className="flex items-center border border-slate-300 rounded-xl overflow-hidden bg-white shadow-2xs">
                          <button
                            type="button"
                            onClick={() =>
                              updateQty(
                                item.id,
                                Math.max(1, item.qty - (item.unit === "meter" ? 50 : 1))
                              )
                            }
                            className="p-1.5 sm:p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-950 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                            title="Decrease quantity"
                          >
                            <Minus size={13} />
                          </button>
                          
                          <input
                            type="number"
                            value={item.qty}
                            onChange={(e) =>
                              updateQty(
                                item.id,
                                Math.max(1, parseInt(e.target.value) || 1)
                              )
                            }
                            className="w-16 sm:w-20 text-center text-xs font-mono font-bold bg-transparent outline-none py-1 text-slate-950"
                          />

                          <button
                            type="button"
                            onClick={() =>
                              updateQty(
                                item.id,
                                item.qty + (item.unit === "meter" ? 50 : 1)
                              )
                            }
                            className="p-1.5 sm:p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-950 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                            title="Increase quantity"
                          >
                            <Plus size={13} />
                          </button>
                        </div>

                        {/* Trash Button with Red Hover */}
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all hover:scale-110 active:scale-95 cursor-pointer border border-transparent hover:border-rose-200"
                          title="Remove item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      {/* Calculated Total for line */}
                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 block uppercase font-mono tracking-wider">
                          Line Total
                        </span>
                        <span className="text-sm font-mono font-bold text-slate-950">
                          ₹{itemTotal.toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-12 sm:py-16 flex flex-col items-center justify-center text-center p-6">
              <div className="w-16 h-16 rounded-3xl bg-slate-100 flex items-center justify-center text-slate-400 mb-4 shadow-inner">
                <Package size={28} />
              </div>
              <h4 className="text-base font-bold text-slate-950 mb-1">
                Your RFQ Quotation Cart is Empty
              </h4>
              <p className="text-xs text-slate-500 max-w-sm mb-6 leading-relaxed">
                Add industrial cables, switchgear, wire marking printers, or CEE industrial plugs from our catalog to prepare your project Bill of Materials.
              </p>
              <button
                onClick={closeCartDrawer}
                className="px-5 py-2.5 bg-slate-950 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-md hover:scale-102 cursor-pointer"
              >
                Explore Product Catalog
              </button>
            </div>
          )}
        </div>

        {/* Footer Action Console */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-6 border-t border-slate-200 bg-slate-50/90 shrink-0 space-y-4">
            
            {/* Commercial Summary Row */}
            <div className="bg-white rounded-2xl p-3.5 sm:p-4 border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
              <div className="flex items-center gap-4 text-slate-600">
                <div>
                  <span className="text-slate-400 text-[10px] block uppercase">BOM Subtotal</span>
                  <span className="font-bold text-slate-950 text-sm">₹{subtotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="border-l border-slate-200 pl-4">
                  <span className="text-slate-400 text-[10px] block uppercase">Est. GST (18%)</span>
                  <span className="font-medium text-slate-700">₹{gstAmount.toLocaleString("en-IN")}</span>
                </div>
              </div>

              <div className="sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100">
                <span className="text-slate-400 text-[10px] block uppercase font-sans font-semibold">
                  Estimated Quotation Total
                </span>
                <span className="text-lg font-black text-rose-600 font-mono">
                  ₹{grandTotal.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            {/* Action Buttons Row */}
            <div className="flex flex-col sm:flex-row items-center gap-2.5">
              
              {/* PRIMARY BOM EXPORT: DOWNLOAD PDF */}
              <button
                type="button"
                onClick={handleExportBOMPDF}
                className="w-full sm:w-auto flex-1 py-3 px-4 bg-white hover:bg-slate-100 text-slate-900 border border-slate-300 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 shadow-2xs hover:scale-102 hover:shadow-md cursor-pointer group"
                title="Download official Bill of Materials PDF"
              >
                <Download size={15} className="text-rose-600 group-hover:scale-115 transition-transform" />
                <span>Export BOM (Download PDF)</span>
              </button>

              {/* Secondary CSV */}
              <button
                type="button"
                onClick={handleExportCSV}
                className="w-full sm:w-auto py-3 px-3.5 bg-white hover:bg-slate-100 text-slate-600 hover:text-slate-950 border border-slate-300 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                title="Export BOM table as CSV spreadsheet"
              >
                <FileSpreadsheet size={14} />
                <span>CSV</span>
              </button>

              {/* Clear button */}
              <button
                type="button"
                onClick={clearCart}
                className="w-full sm:w-auto py-3 px-3.5 bg-white hover:bg-rose-50 text-slate-500 hover:text-rose-600 border border-slate-300 hover:border-rose-200 rounded-xl text-xs font-semibold transition-all cursor-pointer"
                title="Clear all cart items"
              >
                Clear
              </button>

              {/* Main RFQ Submission Button — Maroon & Light Beige Theme */}
              <button
                type="button"
                onClick={handleCheckoutRfq}
                className="w-full sm:w-auto flex-1 py-3 px-5 bg-gradient-to-r from-[#6b1620] via-[#7a1a26] to-[#581018] hover:from-[#7a1a26] hover:to-[#6b1620] text-[#faf6f0] font-black rounded-xl text-xs uppercase tracking-wider transition-all shadow-md shadow-[#6b1620]/30 flex items-center justify-center gap-2 hover:scale-102 cursor-pointer border border-[#851e2b]/50"
              >
                <span>Request GST Proforma</span>
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Micro Trust Indicators */}
            <div className="flex items-center justify-center gap-4 text-[10px] text-slate-500 font-mono text-center pt-1">
              <span className="flex items-center gap-1 text-emerald-700 font-medium">
                <ShieldCheck size={12} className="text-emerald-600" />
                100% Genuine OEM Warranty
              </span>
              <span>·</span>
              <span>Same-Day Bangalore Dispatch</span>
              <span>·</span>
              <span>EN 10204 3.1 Test Certificates</span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
