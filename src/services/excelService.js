import * as XLSX from "xlsx";
import { formatDateTimeDMY } from "../data/seedData";

export const ExcelService = {
  exportMonthlyComplianceReport(inspecciones, company) {
    try {
      // 1. Prepare detailed inspection rows
      const dataRows = inspecciones.map((insp, index) => {
        const nonCompliant = (insp.respuestas || []).filter(r => !r.conforme);
        const hallazgosText = nonCompliant.map(r => r.texto).join("; ") || "Ninguno";
        
        return {
          "No.": index + 1,
          "Folio Inspección": insp.codigo_folio || `INSP-${index + 1}`,
          "Fecha y Hora": formatDateTimeDMY(insp.fecha_fin || insp.fecha_inicio),
          "Código Activo": insp.activo_codigo || "N/A",
          "Equipo / Activo": insp.activo_nombre || "N/A",
          "Checklist / Plantilla": insp.plantilla_nombre || "General",
          "Inspector Responsable": insp.inspector_nombre || "Diana Morales",
          "Dictamen SST": insp.resultado === "conforme" ? "CONFORME" : "NO CONFORME",
          "Hallazgos Críticos": hallazgosText,
          "Estado": (insp.estado || "completada").toUpperCase()
        };
      });

      // 2. Prepare Summary Metrics
      const total = inspecciones.length;
      const conformes = inspecciones.filter(i => i.resultado === "conforme").length;
      const noConformes = total - conformes;
      const cumplimientoPorcentaje = total > 0 ? ((conformes / total) * 100).toFixed(1) : "0.0";

      const summaryRows = [
        { "Indicador": "Empresa", "Valor": company.nombre },
        { "Indicador": "RUC", "Valor": company.ruc },
        { "Indicador": "Ciudad / Sede", "Valor": company.ciudad },
        { "Indicador": "Fecha de Emisión", "Valor": formatDateTimeDMY(new Date()) },
        { "Indicador": "Total de Inspecciones Realizadas", "Valor": total },
        { "Indicador": "Inspecciones Conformes (Aprobadas)", "Valor": conformes },
        { "Indicador": "Inspecciones No Conformes (Con Hallazgo)", "Valor": noConformes },
        { "Indicador": "Índice de Conformidad Operativa (%)", "Valor": `${cumplimientoPorcentaje}%` }
      ];

      // Create workbook
      const wb = XLSX.utils.book_new();

      const wsDetalle = XLSX.utils.json_to_sheet(dataRows);
      const wsResumen = XLSX.utils.json_to_sheet(summaryRows);

      // Adjust column widths
      wsDetalle['!cols'] = [
        { wch: 6 },  // No
        { wch: 18 }, // Folio
        { wch: 20 }, // Fecha
        { wch: 15 }, // Codigo
        { wch: 35 }, // Equipo
        { wch: 35 }, // Checklist
        { wch: 25 }, // Inspector
        { wch: 16 }, // Dictamen
        { wch: 45 }, // Hallazgos
        { wch: 15 }  // Estado
      ];

      wsResumen['!cols'] = [
        { wch: 35 },
        { wch: 35 }
      ];

      XLSX.utils.book_append_sheet(wb, wsResumen, "Resumen Ejecutivo SST");
      XLSX.utils.book_append_sheet(wb, wsDetalle, "Detalle de Inspecciones");

      const fileName = `Reporte_Conformidad_${(company.nombre || 'InspecFacil').replace(/[^a-zA-Z0-9]/g, '_')}_Oct2026.xlsx`;
      XLSX.writeFile(wb, fileName);
      return true;
    } catch (err) {
      console.error("Error exporting to Excel:", err);
      throw err;
    }
  }
};
