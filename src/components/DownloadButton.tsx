"use client";

import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { saveAs } from "file-saver";
import { jsPDF } from "jspdf";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  BorderStyle,
  Header,
} from "docx";
import { toast } from "sonner";
import { generateCoverLetterFilename } from "../lib/document-utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Palette, Zap, Shield, FileText, Download } from "lucide-react";

interface DownloadButtonProps {
  content: string;
  fileName?: string;
  template?: string;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({
  content,
  fileName: propFileName,
  template = "professional",
}) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [fileName, setFileName] = useState(propFileName || "cover-letter");

  // Generate a smart filename based on the content
  useEffect(() => {
    if (content) {
      const generatedName = generateCoverLetterFilename(content);
      setFileName(generatedName);
    }
  }, [content]);

  // Format the current date
  const formatDate = () => {
    const date = new Date();
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Extract sender information (if available in the content)
  const extractSenderInfo = () => {
    // Look for common patterns in cover letters where contact info appears
    const lines = content.split("\n");
    let contactLines = [];

    // Typically contact info is at the end of the letter
    const lastLines = lines.slice(-6);
    for (const line of lastLines) {
      if (
        line.includes("@") || // Email
        line.match(/\d{3}[-\.\s]?\d{3}[-\.\s]?\d{4}/) || // Phone number
        line.match(/linkedin\.com/) // LinkedIn
      ) {
        contactLines.push(line.trim());
      }
    }

    return contactLines.join("\n");
  };
  const downloadAsPDF = () => {
    setIsDownloading(true);

    try {
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      // Apply template-specific layout
      switch (template.toLowerCase()) {
        case "modern":
          generateModernPDF(doc);
          break;
        case "creative":
          generateCreativePDF(doc);
          break;
        case "professional":
        default:
          generateProfessionalPDF(doc);
          break;
      }

      // Save the PDF
      doc.save(`${fileName}.pdf`);

      toast.success("PDF berhasil diunduh", {
        description: `File disimpan sebagai ${fileName}.pdf`,
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Gagal mengunduh sebagai PDF", {
        description: "Silakan coba lagi atau gunakan format yang berbeda",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const generateProfessionalPDF = (doc: jsPDF) => {
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    const maxWidth = pageWidth - 2 * margin;

    // Traditional business letter layout
    doc.setFont("Times New Roman", "normal");

    // Date at top right
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    const dateText = formatDate();
    doc.text(dateText, pageWidth - margin, margin + 5, { align: "right" });

    // Split content into paragraphs
    const paragraphs = content.split(/\n\s*\n/);
    let yPosition = margin + 20;

    paragraphs.forEach((para, index) => {
      if (para.trim()) {
        doc.setFont("Times New Roman", "normal");
        doc.setFontSize(12);

        // Split paragraph into lines
        const lines = doc.splitTextToSize(para.trim(), maxWidth);

        // Check for page break
        if (yPosition + lines.length * 5 > pageHeight - margin) {
          doc.addPage();
          yPosition = margin;
        }

        // Add the text
        doc.text(lines, margin, yPosition);
        yPosition += lines.length * 5 + 8; // spacing between paragraphs
      }
    });

    // Simple footer
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.text(
      `Generated on ${new Date().toLocaleDateString()}`,
      margin,
      pageHeight - 10,
    );
  };

  const generateModernPDF = (doc: jsPDF) => {
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 25;
    const maxWidth = pageWidth - 2 * margin;

    // Modern header with accent color
    doc.setFillColor(41, 128, 185); // Modern blue
    doc.rect(0, 0, pageWidth, 35, "F");

    // Header text
    doc.setFont("Arial", "bold");
    doc.setFontSize(18);
    doc.setTextColor(255, 255, 255);
    doc.text("COVER LETTER", margin, 22);

    // Date in header
    doc.setFontSize(10);
    const dateText = formatDate();
    doc.text(dateText, pageWidth - margin, 22, { align: "right" });

    // Content area with clean typography
    doc.setFont("Arial", "normal");
    doc.setTextColor(0, 0, 0);

    const paragraphs = content.split(/\n\s*\n/);
    let yPosition = 50;

    paragraphs.forEach((para, index) => {
      if (para.trim()) {
        // First paragraph (greeting) gets special treatment
        if (index === 0 && para.toLowerCase().includes("dear")) {
          doc.setFont("Arial", "bold");
          doc.setFontSize(12);
        } else {
          doc.setFont("Arial", "normal");
          doc.setFontSize(11);
        }

        const lines = doc.splitTextToSize(para.trim(), maxWidth);

        if (yPosition + lines.length * 5 > pageHeight - margin) {
          doc.addPage();
          yPosition = margin;
        }

        doc.text(lines, margin, yPosition);
        yPosition += lines.length * 5 + 6;
      }
    });

    // Modern footer with line
    doc.setDrawColor(41, 128, 185);
    doc.setLineWidth(0.5);
    doc.line(margin, pageHeight - 20, pageWidth - margin, pageHeight - 20);

    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text(
      `Professional Cover Letter • ${new Date().toLocaleDateString()}`,
      pageWidth / 2,
      pageHeight - 10,
      { align: "center" },
    );
  };

  const generateCreativePDF = (doc: jsPDF) => {
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    const maxWidth = pageWidth - 2 * margin - 40; // Extra margin for creative elements

    // Creative header with geometric elements
    doc.setFillColor(155, 89, 182); // Creative purple
    doc.circle(30, 25, 15, "F"); // Decorative circle

    doc.setFont("Arial", "bold");
    doc.setFontSize(20);
    doc.setTextColor(155, 89, 182);
    doc.text("Cover Letter", 50, 25);

    // Decorative line
    doc.setDrawColor(155, 89, 182);
    doc.setLineWidth(2);
    doc.line(50, 30, 120, 30);

    // Date with creative styling
    doc.setFont("Arial", "italic");
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    const dateText = formatDate();
    doc.text(dateText, pageWidth - margin, 25, { align: "right" });

    // Content with creative typography
    const paragraphs = content.split(/\n\s*\n/);
    let yPosition = 50;

    paragraphs.forEach((para, index) => {
      if (para.trim()) {
        // Alternating font styles for creativity
        if (index === 0 && para.toLowerCase().includes("dear")) {
          doc.setFont("Arial", "bold");
          doc.setFontSize(13);
          doc.setTextColor(155, 89, 182);
        } else if (
          para.toLowerCase().includes("sincerely") ||
          para.toLowerCase().includes("regards")
        ) {
          doc.setFont("Arial", "italic");
          doc.setFontSize(12);
          doc.setTextColor(100, 100, 100);
        } else {
          doc.setFont("Arial", "normal");
          doc.setFontSize(11);
          doc.setTextColor(0, 0, 0);
        }

        const lines = doc.splitTextToSize(para.trim(), maxWidth);

        if (yPosition + lines.length * 5 > pageHeight - margin - 30) {
          doc.addPage();
          yPosition = margin;
        }

        doc.text(lines, margin + 20, yPosition); // Indent for creative look
        yPosition += lines.length * 5 + 8;
      }
    });

    // Creative footer with decorative elements
    doc.setFillColor(155, 89, 182);
    doc.circle(margin, pageHeight - 15, 5, "F");
    doc.circle(pageWidth - margin, pageHeight - 15, 5, "F");

    doc.setFont("Arial", "italic");
    doc.setFontSize(8);
    doc.setTextColor(155, 89, 182);
    doc.text(
      `Creatively crafted • ${new Date().toLocaleDateString()}`,
      pageWidth / 2,
      pageHeight - 10,
      { align: "center" },
    );
  };
  const downloadAsDOCX = () => {
    setIsDownloading(true);

    try {
      let doc;

      // Apply template-specific layout
      switch (template.toLowerCase()) {
        case "modern":
          doc = generateModernDOCX();
          break;
        case "creative":
          doc = generateCreativeDOCX();
          break;
        case "professional":
        default:
          doc = generateProfessionalDOCX();
          break;
      }

      // Generate the DOCX file
      Packer.toBlob(doc).then((blob) => {
        saveAs(blob, `${fileName}.docx`);
        toast.success("DOCX berhasil diunduh", {
          description: `File disimpan sebagai ${fileName}.docx`,
        });
      });
    } catch (error) {
      console.error("Error generating DOCX:", error);
      toast.error("Gagal mengunduh sebagai DOCX", {
        description: "Silakan coba lagi atau gunakan format yang berbeda",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const generateProfessionalDOCX = () => {
    const paragraphs = content.split(/\n\s*\n/);
    const children = [];

    // Add date
    children.push(
      new Paragraph({
        text: formatDate(),
        alignment: AlignmentType.RIGHT,
        spacing: { after: 200 },
      }),
    );

    // Add each paragraph
    paragraphs.forEach((para) => {
      if (para.trim()) {
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: para.trim(),
                size: 24, // 12pt
                font: "Times New Roman",
              }),
            ],
            spacing: { after: 200 },
          }),
        );
      }
    });

    return new Document({
      sections: [
        {
          properties: {
            page: {
              margin: {
                top: 1440,
                right: 1440,
                bottom: 1440,
                left: 1440,
              },
            },
          },
          children: children,
        },
      ],
    });
  };

  const generateModernDOCX = () => {
    const paragraphs = content.split(/\n\s*\n/);
    const children = [];

    // Modern header
    children.push(
      new Paragraph({
        text: "COVER LETTER",
        heading: HeadingLevel.HEADING_1,
        alignment: AlignmentType.CENTER,
        spacing: { after: 300 },
        children: [
          new TextRun({
            text: "COVER LETTER",
            bold: true,
            size: 32,
            font: "Arial",
            color: "2980B9", // Modern blue
          }),
        ],
      }),
    );

    // Date
    children.push(
      new Paragraph({
        text: formatDate(),
        alignment: AlignmentType.RIGHT,
        spacing: { after: 200 },
        children: [
          new TextRun({
            text: formatDate(),
            size: 20,
            font: "Arial",
            color: "666666",
          }),
        ],
      }),
    );

    // Content paragraphs
    paragraphs.forEach((para, index) => {
      if (para.trim()) {
        const isGreeting = index === 0 && para.toLowerCase().includes("dear");
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: para.trim(),
                size: isGreeting ? 24 : 22,
                font: "Arial",
                bold: isGreeting,
              }),
            ],
            spacing: { after: 200 },
          }),
        );
      }
    });

    return new Document({
      sections: [
        {
          properties: {
            page: {
              margin: {
                top: 1440,
                right: 1440,
                bottom: 1440,
                left: 1440,
              },
            },
          },
          children: children,
        },
      ],
    });
  };

  const generateCreativeDOCX = () => {
    const paragraphs = content.split(/\n\s*\n/);
    const children = [];

    // Creative header
    children.push(
      new Paragraph({
        text: "Cover Letter",
        heading: HeadingLevel.HEADING_1,
        alignment: AlignmentType.CENTER,
        spacing: { after: 400 },
        children: [
          new TextRun({
            text: "Cover Letter",
            bold: true,
            size: 36,
            font: "Arial",
            color: "9B59B6", // Creative purple
            italics: true,
          }),
        ],
        border: {
          bottom: {
            color: "9B59B6",
            style: BorderStyle.SINGLE,
            size: 6,
          },
        },
      }),
    );

    // Date with creative styling
    children.push(
      new Paragraph({
        text: formatDate(),
        alignment: AlignmentType.RIGHT,
        spacing: { after: 300 },
        children: [
          new TextRun({
            text: formatDate(),
            size: 20,
            font: "Arial",
            color: "666666",
            italics: true,
          }),
        ],
      }),
    );

    // Content with creative formatting
    paragraphs.forEach((para, index) => {
      if (para.trim()) {
        const isGreeting = index === 0 && para.toLowerCase().includes("dear");
        const isClosing =
          para.toLowerCase().includes("sincerely") ||
          para.toLowerCase().includes("regards");

        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: para.trim(),
                size: isGreeting ? 26 : 22,
                font: "Arial",
                bold: isGreeting,
                italics: isClosing,
                color: isGreeting ? "9B59B6" : isClosing ? "666666" : "000000",
              }),
            ],
            spacing: { after: 250 },
            alignment: isClosing
              ? AlignmentType.RIGHT
              : AlignmentType.JUSTIFIED,
          }),
        );
      }
    });

    return new Document({
      sections: [
        {
          properties: {
            page: {
              margin: {
                top: 1440,
                right: 1440,
                bottom: 1440,
                left: 1800, // Extra left margin for creative look
              },
            },
          },
          children: children,
        },
      ],
    });
  };

  // Get template-specific icon and styling
  const getTemplateInfo = () => {
    switch (template.toLowerCase()) {
      case "modern":
        return {
          icon: Zap,
          color: "text-blue-600",
          name: "Modern",
          description: "Clean, contemporary layout",
        };
      case "creative":
        return {
          icon: Palette,
          color: "text-purple-600",
          name: "Creative",
          description: "Artistic design with unique elements",
        };
      case "professional":
      default:
        return {
          icon: Shield,
          color: "text-gray-700",
          name: "Professional",
          description: "Traditional business format",
        };
    }
  };

  const templateInfo = getTemplateInfo();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          disabled={isDownloading}
          className="flex items-center space-x-2"
        >
          {isDownloading ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600"></div>
              <span>Mengunduh...</span>
            </>
          ) : (
            <>
              <Download className="h-4 w-4" />
              <span>Unduh</span>
              <templateInfo.icon className={`h-3 w-3 ${templateInfo.color}`} />
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {/* <div className="px-2 py-1.5 text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <templateInfo.icon className={`h-4 w-4 ${templateInfo.color}`} />
            <div>
              <div className="font-medium">{templateInfo.name} Template</div>
              <div className="text-xs text-gray-500">
                {templateInfo.description}
              </div>
            </div>
          </div>
        </div> */}
        {/* <div className="my-1 h-px bg-gray-200"></div> */}
        <DropdownMenuItem
          onClick={downloadAsPDF}
          className="flex items-center space-x-2"
        >
          <FileText className="h-4 w-4" />
          <span>Unduh sebagai PDF</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={downloadAsDOCX}
          className="flex items-center space-x-2"
        >
          <FileText className="h-4 w-4" />
          <span>Unduh sebagai DOCX</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DownloadButton;
