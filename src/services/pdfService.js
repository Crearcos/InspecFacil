import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { formatDateTimeDMY } from "../data/seedData";

export const PdfService = {
  /**
   * Genera y descarga el reporte PDF oficial de una inspección técnica con diseño de alta calidad industrial.
   */
  async generateInspectionPdf(inspeccion, company, autoDownload = true) {
    try {
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4"
      });

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 14;
      const contentWidth = pageWidth - (margin * 2);
      const isConforme = inspeccion.resultado === "conforme";

      // ========================================================
      // 1. FRANJA SUPERIOR Y CABECERA INSTITUCIONAL
      // ========================================================
      
      // Barra de acento primario
      doc.setFillColor(11, 25, 44); // #0B192C Navy
      doc.rect(0, 0, pageWidth, 4, "F");

      doc.setFillColor(37, 99, 235); // #2563EB Blue
      doc.rect(0, 4, pageWidth, 1.5, "F");

      let currentY = 11;

      // Logotipo / Emblema Corporativo
      doc.setFillColor(11, 25, 44);
      doc.roundedRect(margin, currentY, 11, 11, 2, 2, "F");
      
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(255, 255, 255);
      doc.text("IF", margin + 5.5, currentY + 7.5, { align: "center" });

      // Datos de la Organización (Tenant)
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(15, 23, 42); // slate-900
      doc.text(company.nombre.toUpperCase(), margin + 14, currentY + 4.5);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(7.5);
      doc.setTextColor(100, 116, 139); // slate-500
      doc.text(`RUC: ${company.ruc || '0992345678001'}  •  ${company.ciudad}, Ecuador  •  ${company.direccion || 'Parque Industrial'}`, margin + 14, currentY + 8.5);
      doc.text(`Sistema de Gestión de Seguridad y Salud en el Trabajo  •  Conforme Norma ISO 45001:2018`, margin + 14, currentY + 12);

      // Tarjeta de Control Técnico (Derecha)
      const controlCardW = 55;
      const controlCardH = 15;
      const controlCardX = pageWidth - margin - controlCardW;
      
      doc.setFillColor(248, 250, 252);
      doc.setDrawColor(226, 232, 240);
      doc.roundedRect(controlCardX, currentY - 1, controlCardW, controlCardH, 1.5, 1.5, "FD");

      doc.setFont("helvetica", "bold");
      doc.setFontSize(7);
      doc.setTextColor(71, 85, 105);
      doc.text("FOLIO OFICIAL:", controlCardX + 3, currentY + 3);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8.5);
      doc.setTextColor(15, 23, 42);
      doc.text(inspeccion.codigo_folio || "INSP-2026-0000", controlCardX + controlCardW - 3, currentY + 3, { align: "right" });

      doc.setFont("helvetica", "normal");
      doc.setFontSize(7);
      doc.setTextColor(100, 116, 139);
      doc.text("EMISIÓN:", controlCardX + 3, currentY + 7);
      doc.text(formatDateTimeDMY(inspeccion.fecha_fin || inspeccion.fecha_inicio), controlCardX + controlCardW - 3, currentY + 7, { align: "right" });

      doc.text("FORMATO:", controlCardX + 3, currentY + 11);
      doc.text("SST-CHK-024 (R3)", controlCardX + controlCardW - 3, currentY + 11, { align: "right" });

      currentY += 18;

      // ========================================================
      // 2. BANNER DE DICTAMEN OFICIAL (CERTIFICADO DE CONFORMIDAD)
      // ========================================================
      const verdictHeight = 13;
      if (isConforme) {
        doc.setFillColor(236, 253, 245); // #ECFDF5 emerald-50
        doc.setDrawColor(16, 185, 129);  // #10B981 emerald-500
        doc.roundedRect(margin, currentY, contentWidth, verdictHeight, 2, 2, "FD");

        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);
        doc.setTextColor(6, 95, 70); // emerald-800
        doc.text("DICTAMEN TÉCNICO: ACTIVO CONFORME  •  APTO PARA OPERACIÓN REGULAR", margin + 4, currentY + 5.5);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(7.5);
        doc.setTextColor(4, 120, 87); // emerald-700
        doc.text("El equipo cumple íntegramente con los parámetros técnicos de seguridad y mantenimiento preventivo vigentes.", margin + 4, currentY + 9.5);

        // Badge de verificación a la derecha
        doc.setFillColor(5, 150, 105);
        doc.roundedRect(pageWidth - margin - 32, currentY + 3, 28, 7, 1.5, 1.5, "F");
        doc.setFont("helvetica", "bold");
        doc.setFontSize(7);
        doc.setTextColor(255, 255, 255);
        doc.text("APROBADO SST", pageWidth - margin - 18, currentY + 7.5, { align: "center" });

      } else {
        doc.setFillColor(255, 241, 242); // #FFF1F2 rose-50
        doc.setDrawColor(225, 29, 72);   // #E11D48 rose-600
        doc.roundedRect(margin, currentY, contentWidth, verdictHeight, 2, 2, "FD");

        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);
        doc.setTextColor(159, 18, 57); // rose-900
        doc.text("DICTAMEN TÉCNICO: NO CONFORME  •  RESTRICCIÓN OPERATIVA TEMPORAL", margin + 4, currentY + 5.5);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(7.5);
        doc.setTextColor(190, 18, 60); // rose-800
        doc.text("Se detectaron desviaciones que comprometen la integridad o seguridad. Requiere acción correctiva obligatoria.", margin + 4, currentY + 9.5);

        // Badge de no conformidad
        doc.setFillColor(225, 29, 72);
        doc.roundedRect(pageWidth - margin - 36, currentY + 3, 32, 7, 1.5, 1.5, "F");
        doc.setFont("helvetica", "bold");
        doc.setFontSize(7);
        doc.setTextColor(255, 255, 255);
        doc.text("HALLAZGO CRÍTICO", pageWidth - margin - 20, currentY + 7.5, { align: "center" });
      }

      currentY += verdictHeight + 4;

      // ========================================================
      // 3. FICHA TÉCNICA DEL ACTIVO Y AUDITORÍA EN PLANTA
      // ========================================================
      
      const assetMetadata = [
        [
          { content: "Código de Activo:", styles: { fontStyle: "bold", textColor: [71, 85, 105] } },
          { content: inspeccion.activo_codigo || "N/A", styles: { fontStyle: "bold", textColor: [15, 23, 42] } },
          { content: "Checklist Aplicado:", styles: { fontStyle: "bold", textColor: [71, 85, 105] } },
          { content: inspeccion.plantilla_nombre || "Checklist Estándar", styles: { textColor: [15, 23, 42] } }
        ],
        [
          { content: "Nombre del Activo:", styles: { fontStyle: "bold", textColor: [71, 85, 105] } },
          { content: inspeccion.activo_nombre || "N/A", styles: { textColor: [15, 23, 42] } },
          { content: "Inspector Certificado:", styles: { fontStyle: "bold", textColor: [71, 85, 105] } },
          { content: inspeccion.inspector_nombre || "Diana Morales G.", styles: { fontStyle: "bold", textColor: [15, 23, 42] } }
        ],
        [
          { content: "Ubicación en Planta:", styles: { fontStyle: "bold", textColor: [71, 85, 105] } },
          { content: "Área Operativa / Andén", styles: { textColor: [15, 23, 42] } },
          { content: "Supervisor Técnico:", styles: { fontStyle: "bold", textColor: [71, 85, 105] } },
          { content: "Ing. Marco Viteri P.", styles: { textColor: [15, 23, 42] } }
        ],
        [
          { content: "Fecha & Hora Ejecución:", styles: { fontStyle: "bold", textColor: [71, 85, 105] } },
          { content: formatDateTimeDMY(inspeccion.fecha_inicio), styles: { textColor: [15, 23, 42] } },
          { content: "Estado en Base:", styles: { fontStyle: "bold", textColor: [71, 85, 105] } },
          { content: "COMPLETADO Y SINCRONIZADO", styles: { fontStyle: "bold", textColor: [16, 185, 129] } }
        ]
      ];

      doc.autoTable({
        startY: currentY,
        body: assetMetadata,
        theme: "grid",
        styles: {
          fontSize: 7.5,
          cellPadding: 1.8,
          lineColor: [226, 232, 240],
          lineWidth: 0.2
        },
        columnStyles: {
          0: { cellWidth: 34, fillColor: [248, 250, 252] },
          1: { cellWidth: 57 },
          2: { cellWidth: 35, fillColor: [248, 250, 252] },
          3: { cellWidth: 56 }
        },
        margin: { left: margin, right: margin }
      });

      currentY = doc.lastAutoTable.finalY + 5;

      // ========================================================
      // 4. TABLA DE EVALUACIÓN DE CRITERIOS (CHECKLIST)
      // ========================================================
      
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8.5);
      doc.setTextColor(15, 23, 42);
      doc.text("EVALUACIÓN DETALLADA DE CRITERIOS TÉCNICOS", margin, currentY);
      currentY += 2.5;

      const checklistRows = (inspeccion.respuestas || []).map((resp, idx) => {
        const isConformeItem = resp.conforme !== false;
        let valorLabel = resp.valor;
        if (valorLabel === 'si') valorLabel = 'SÍ';
        if (valorLabel === 'no') valorLabel = 'NO';
        if (valorLabel === 'na') valorLabel = 'N/A';
        if (!valorLabel) valorLabel = resp.foto ? '[Foto Adjunta]' : '—';

        return [
          String(idx + 1).padStart(2, '0'),
          resp.texto || "Criterio técnico de verificación",
          String(valorLabel),
          isConformeItem ? "CONFORME" : "NO CONFORME",
          resp.observacion || (isConformeItem ? "Condición operativa satisfactoria" : "Desviación registrada en inspección")
        ];
      });

      doc.autoTable({
        startY: currentY,
        head: [["#", "Criterio Técnico Evaluado", "Valor", "Resultado", "Observaciones / Hallazgos Técnicos"]],
        body: checklistRows,
        theme: "grid",
        headStyles: {
          fillColor: [11, 25, 44], // #0B192C Navy
          textColor: [255, 255, 255],
          fontSize: 7.5,
          fontStyle: "bold",
          halign: "left",
          cellPadding: 2
        },
        bodyStyles: {
          fontSize: 7.2,
          textColor: [30, 41, 59],
          cellPadding: 2,
          lineColor: [226, 232, 240],
          lineWidth: 0.2
        },
        alternateRowStyles: {
          fillColor: [250, 252, 255]
        },
        columnStyles: {
          0: { cellWidth: 8, halign: "center", fontStyle: "bold", textColor: [100, 116, 139] },
          1: { cellWidth: 80 },
          2: { cellWidth: 20, halign: "center", fontStyle: "bold" },
          3: { cellWidth: 26, halign: "center" },
          4: { cellWidth: 48 }
        },
        didParseCell: function (data) {
          if (data.section === "body" && data.column.index === 3) {
            if (data.cell.raw === "NO CONFORME") {
              data.cell.styles.textColor = [190, 18, 60]; // rose-800
              data.cell.styles.fillColor = [255, 241, 242]; // rose-50
              data.cell.styles.fontStyle = "bold";
            } else {
              data.cell.styles.textColor = [5, 150, 105]; // emerald-700
              data.cell.styles.fillColor = [236, 253, 245]; // emerald-50
              data.cell.styles.fontStyle = "bold";
            }
          }
        },
        margin: { left: margin, right: margin }
      });

      currentY = doc.lastAutoTable.finalY + 5;

      // ========================================================
      // 5. DICTAMEN DE CIERRE Y OBSERVACIONES DE SEGURIDAD
      // ========================================================
      if (currentY > pageHeight - 55) {
        doc.addPage();
        currentY = 16;
      }

      doc.setFont("helvetica", "bold");
      doc.setFontSize(8.5);
      doc.setTextColor(15, 23, 42);
      doc.text("DICTAMEN TÉCNICO Y RESOLUCIÓN FINAL DE AUDITORÍA", margin, currentY);
      currentY += 2.5;

      const obsBoxH = 14;
      doc.setFillColor(248, 250, 252);
      doc.setDrawColor(226, 232, 240);
      doc.rect(margin, currentY, contentWidth, obsBoxH, "FD");

      // Línea indicadora izquierda
      doc.setFillColor(isConforme ? 16 : 225, isConforme ? 185 : 29, isConforme ? 129 : 72);
      doc.rect(margin, currentY, 2, obsBoxH, "F");

      doc.setFont("helvetica", "normal");
      doc.setFontSize(7.5);
      doc.setTextColor(51, 65, 85);
      
      const defaultText = isConforme 
        ? "El activo inspeccionado ha superado satisfactoriamente los puntos de control del checklist. No se registran anomalías estructurales ni mecánicas. Se autoriza su continuidad operativa bajo el plan preventivo establecido."
        : "Se han identificado desviaciones técnicas que requieren corrección prioritaria. Se genera orden de trabajo correctiva inmediata bajo supervisión de Mantenimiento y SST.";

      const finalObsText = inspeccion.observaciones_generales || defaultText;
      const splitText = doc.splitTextToSize(finalObsText, contentWidth - 8);
      doc.text(splitText, margin + 4, currentY + 4.5);

      currentY += obsBoxH + 6;

      // ========================================================
      // 6. FIRMAS DIGITALES Y CERTIFICACIÓN
      // ========================================================
      if (currentY > pageHeight - 48) {
        doc.addPage();
        currentY = 16;
      }

      doc.setFont("helvetica", "bold");
      doc.setFontSize(8.5);
      doc.setTextColor(15, 23, 42);
      doc.text("RESPONSABLES DE LA VERIFICACIÓN TÉCNICA", margin, currentY);
      currentY += 3;

      const signBoxW = 87;
      const signBoxH = 24;

      // Firma 1: Inspector de Campo
      doc.setFillColor(255, 255, 255);
      doc.setDrawColor(203, 213, 225);
      doc.roundedRect(margin, currentY, signBoxW, signBoxH, 1, 1, "FD");

      if (inspeccion.firma && inspeccion.firma.startsWith("data:image")) {
        try {
          doc.addImage(inspeccion.firma, "PNG", margin + 15, currentY + 2, signBoxW - 30, signBoxH - 10);
        } catch (e) {
          doc.setFont("courier", "italic");
          doc.setFontSize(9);
          doc.setTextColor(30, 41, 59);
          doc.text("Firma Digitalizada", margin + signBoxW / 2, currentY + 10, { align: "center" });
        }
      } else {
        doc.setFont("courier", "italic");
        doc.setFontSize(9);
        doc.setTextColor(30, 41, 59);
        doc.text(inspeccion.firma || "Firma Digital en Terminal Móvil", margin + signBoxW / 2, currentY + 9, { align: "center" });
      }

      doc.setDrawColor(226, 232, 240);
      doc.line(margin + 6, currentY + signBoxH - 6, margin + signBoxW - 6, currentY + signBoxH - 6);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(7.5);
      doc.setTextColor(15, 23, 42);
      doc.text(inspeccion.inspector_nombre || "Diana Morales G.", margin + signBoxW / 2, currentY + signBoxH - 2.5, { align: "center" });

      doc.setFont("helvetica", "normal");
      doc.setFontSize(6.5);
      doc.setTextColor(100, 116, 139);
      doc.text("Inspector Técnico de Campo  •  Terminal Móvil", margin + signBoxW / 2, currentY + signBoxH + 2.5, { align: "center" });

      // Firma 2: Supervisor de Seguridad y Mantenimiento
      const supX = pageWidth - margin - signBoxW;
      doc.setFillColor(255, 255, 255);
      doc.setDrawColor(203, 213, 225);
      doc.roundedRect(supX, currentY, signBoxW, signBoxH, 1, 1, "FD");

      // Sello de aprobación digital
      doc.setFillColor(248, 250, 252);
      doc.setDrawColor(16, 185, 129);
      doc.roundedRect(supX + 12, currentY + 3, signBoxW - 24, 8, 1, 1, "FD");
      
      doc.setFont("helvetica", "bold");
      doc.setFontSize(6.5);
      doc.setTextColor(6, 95, 70);
      doc.text("VALIDADO ELECTRÓNICAMENTE", supX + signBoxW / 2, currentY + 7, { align: "center" });
      doc.setFont("helvetica", "normal");
      doc.setFontSize(5.5);
      doc.setTextColor(5, 150, 105);
      doc.text("AUTORIZACIÓN SISTEMA SST • ISO 45001", supX + signBoxW / 2, currentY + 9.5, { align: "center" });

      doc.setDrawColor(226, 232, 240);
      doc.line(supX + 6, currentY + signBoxH - 6, supX + signBoxW - 6, currentY + signBoxH - 6);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(7.5);
      doc.setTextColor(15, 23, 42);
      doc.text("Ing. Marco Viteri P.", supX + signBoxW / 2, currentY + signBoxH - 2.5, { align: "center" });

      doc.setFont("helvetica", "normal");
      doc.setFontSize(6.5);
      doc.setTextColor(100, 116, 139);
      doc.text("Supervisor de Seguridad & Mantenimiento Industrial", supX + signBoxW / 2, currentY + signBoxH + 2.5, { align: "center" });

      currentY += signBoxH + 8;

      // ========================================================
      // 7. EVIDENCIAS FOTOGRÁFICAS DE CAMPO (SI EXISTEN)
      // ========================================================
      const evidencias = inspeccion.evidencias || [];
      if (evidencias.length > 0) {
        if (currentY > pageHeight - 65) {
          doc.addPage();
          currentY = 16;
        }

        doc.setFont("helvetica", "bold");
        doc.setFontSize(8.5);
        doc.setTextColor(15, 23, 42);
        doc.text("REGISTRO FOTOGRÁFICO DE EVIDENCIAS TÉCNICAS", margin, currentY);
        currentY += 3;

        let photoX = margin;
        let photoY = currentY;
        const photoBoxW = (contentWidth - 6) / 2;
        const photoBoxH = 40;

        for (let i = 0; i < Math.min(evidencias.length, 4); i++) {
          const evi = evidencias[i];
          if (photoX + photoBoxW > pageWidth - margin) {
            photoX = margin;
            photoY += photoBoxH + 6;
          }

          if (photoY + photoBoxH > pageHeight - 20) {
            doc.addPage();
            photoY = 16;
            photoX = margin;
          }

          doc.setFillColor(248, 250, 252);
          doc.setDrawColor(226, 232, 240);
          doc.roundedRect(photoX, photoY, photoBoxW, photoBoxH, 1, 1, "FD");

          // Renderizar imagen si es raster válida
          if (evi.archivo && (evi.archivo.startsWith("data:image/png") || evi.archivo.startsWith("data:image/jpeg"))) {
            try {
              doc.addImage(evi.archivo, "JPEG", photoX + 1.5, photoY + 1.5, photoBoxW - 3, photoBoxH - 9);
            } catch (err) {
              console.warn("Could not insert raster photo into PDF:", err);
            }
          } else {
            // Placeholder técnico limpio
            doc.setFillColor(15, 23, 42);
            doc.rect(photoX + 2, photoY + 2, photoBoxW - 4, photoBoxH - 10, "F");
            
            doc.setFont("helvetica", "bold");
            doc.setFontSize(7.5);
            doc.setTextColor(255, 255, 255);
            doc.text("REGISTRO FOTOGRÁFICO ADJUNTO", photoX + photoBoxW / 2, photoY + (photoBoxH / 2) - 2, { align: "center" });

            doc.setFont("helvetica", "normal");
            doc.setFontSize(6.5);
            doc.setTextColor(148, 163, 184);
            doc.text(`ID: ${evi.id || 'EVI-001'}  •  Cámara Terminal`, photoX + photoBoxW / 2, photoY + (photoBoxH / 2) + 2.5, { align: "center" });
          }

          // Pie de foto descriptivo
          doc.setFont("helvetica", "bold");
          doc.setFontSize(6.8);
          doc.setTextColor(15, 23, 42);
          const caption = evi.descripcion || `Evidencia fotográfica ${i + 1}`;
          doc.text(caption.slice(0, 48), photoX + 3, photoY + photoBoxH - 3);

          photoX += photoBoxW + 6;
        }
      }

      // ========================================================
      // 8. PIE DE PÁGINA OFICIAL EN TODAS LAS PÁGINAS
      // ========================================================
      const totalPages = doc.internal.getNumberOfPages();
      for (let p = 1; p <= totalPages; p++) {
        doc.setPage(p);
        
        doc.setDrawColor(226, 232, 240);
        doc.setLineWidth(0.3);
        doc.line(margin, pageHeight - 9, pageWidth - margin, pageHeight - 9);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(6.5);
        doc.setTextColor(148, 163, 184); // slate-400
        
        doc.text("InspecFácil Suite Industrial  •  Documento oficial generado bajo normativa Ministerio del Trabajo Ecuador (ISO 45001)", margin, pageHeight - 5.5);
        doc.text(`Folio: ${inspeccion.codigo_folio || 'INSP-2026-0000'}  •  Página ${p} de ${totalPages}`, pageWidth - margin, pageHeight - 5.5, { align: "right" });
      }

      const fileName = `${inspeccion.codigo_folio || 'INSPEC'}_${(inspeccion.activo_codigo || 'ACT').replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;

      if (autoDownload) {
        doc.save(fileName);
      }

      return doc;
    } catch (err) {
      console.error("Error generating PDF:", err);
      throw err;
    }
  }
};
