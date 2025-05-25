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

interface DownloadButtonProps {
  content: string;
  fileName?: string;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({
  content,
  fileName: propFileName,
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
      // Initialize jsPDF
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      // Get page dimensions
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 20; // margin in mm
      const maxWidth = pageWidth - 2 * margin;

      // Set background color for header
      doc.setFillColor(245, 245, 245); // light gray
      doc.rect(0, 0, pageWidth, 40, "F"); // header background

      // Add a subtle border at the bottom of the header
      doc.setDrawColor(200, 200, 200); // light gray border
      doc.setLineWidth(0.5);
      doc.line(0, 40, pageWidth, 40);

      // Add title in header
      doc.setFont("Times New Roman", "bold");
      doc.setFontSize(22);
      doc.setTextColor(50, 50, 50); // dark gray text
      doc.text("PROFESSIONAL COVER LETTER", pageWidth / 2, 25, {
        align: "center",
      });

      // Add date at the top right
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100); // medium gray text
      const dateText = formatDate();
      doc.text(dateText, pageWidth - margin - 2, margin + 35);

      // Add content
      doc.setFont("Times New Roman", "normal");
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0); // black text

      // Split the content into paragraphs
      const paragraphs = content.split(/\n\s*\n/);
      let yPosition = 50; // Start position after header

      // Process each paragraph
      paragraphs.forEach((para, index) => {
        if (para.trim()) {
          // Apply different formatting to the salutation and signature
          if (index === 0 && para.toLowerCase().includes("dear")) {
            // Salutation
            doc.setFont("Times New Roman", "normal");
          } else if (
            index === paragraphs.length - 1 &&
            (para.toLowerCase().includes("sincerely") ||
              para.toLowerCase().includes("regards") ||
              para.toLowerCase().includes("thank you"))
          ) {
            // Signature
            doc.setFont("Times New Roman", "normal");
          } else {
            // Regular paragraph
            doc.setFont("Times New Roman", "normal");
          }

          // Split paragraph into lines to fit width
          const lines = doc.splitTextToSize(para.trim(), maxWidth);

          // Check if we need to add a new page
          if (yPosition + lines.length * 5 > pageHeight - margin) {
            doc.addPage();
            yPosition = margin;
          }

          // Add the text
          doc.text(lines, margin, yPosition);

          // Move position for next paragraph (add more space between paragraphs)
          yPosition += lines.length * 5 + 5;
        }
      });

      // Add footer
      doc.setFontSize(9);
      doc.text(
        "Generated on " + new Date().toLocaleString(),
        margin,
        pageHeight - 10,
      );

      // Save the PDF
      doc.save(`${fileName}.pdf`);

      toast.success("PDF downloaded successfully", {
        description: `File saved as ${fileName}.pdf`,
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to download as PDF", {
        description: "Please try again or use a different format",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const downloadAsDOCX = () => {
    setIsDownloading(true);

    try {
      // Split content into paragraphs
      const paragraphs = content.split(/\n\s*\n/);
      const children = [];

      // Add date
      children.push(
        new Paragraph({
          text: formatDate(),
          alignment: AlignmentType.RIGHT,
          spacing: {
            after: 200,
          },
        }),
      );

      // Add each paragraph with proper spacing
      paragraphs.forEach((para) => {
        if (para.trim()) {
          children.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: para.trim(),
                  size: 24, // 12pt
                }),
              ],
              spacing: {
                after: 200, // space after paragraph
              },
            }),
          );
        }
      });

      // Initialize a new Document with more formatting
      const doc = new Document({
        sections: [
          {
            properties: {
              page: {
                margin: {
                  top: 1440, // 1 inch (in twips)
                  right: 1440,
                  bottom: 1440,
                  left: 1440,
                },
              },
            },
            headers: {
              default: new Header({
                children: [
                  new Paragraph({
                    text: "COVER LETTER",
                    heading: HeadingLevel.HEADING_1,
                    alignment: AlignmentType.CENTER,
                    spacing: {
                      after: 200,
                    },
                    border: {
                      bottom: {
                        color: "auto",
                        style: BorderStyle.SINGLE,
                        size: 6,
                      },
                    },
                  }),
                ],
              }),
            },
            children: children,
          },
        ],
      });

      // Generate the DOCX file
      Packer.toBlob(doc).then((blob) => {
        saveAs(blob, `${fileName}.docx`);
        toast.success("DOCX downloaded successfully", {
          description: `File saved as ${fileName}.docx`,
        });
      });
    } catch (error) {
      console.error("Error generating DOCX:", error);
      toast.error("Failed to download as DOCX", {
        description: "Please try again or use a different format",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" disabled={isDownloading}>
          {isDownloading ? "Downloading..." : "Download"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={downloadAsPDF}>
          Download as PDF
        </DropdownMenuItem>
        <DropdownMenuItem onClick={downloadAsDOCX}>
          Download as DOCX
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DownloadButton;
