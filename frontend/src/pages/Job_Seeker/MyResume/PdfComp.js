import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import ResumeStyle from "../MyResume/MyResume.module.css";

function PdfComp(props) {
  // console.log(props);
  const [numPages, setNumPages] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // Set PDF.js worker source URL when component mounts
    pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
  }, []); // This effect runs once on component mount to set the worker source URL

  useEffect(() => {

    // Fetch PDF document when props.pdf changes
    if (props.pdf) {
      // console.log(props.pdf);
      setLoading(true); // Set loading state to true when fetching new PDF
      setNumPages(null); // Reset numPages state
      setError(null); // Reset error state

      // Use async function to load PDF and handle success/error
      const loadPDF = async () => {
        try {
          const { numPages } = await pdfjs.getDocument(props.pdf).promise;
          setNumPages(numPages);
          setLoading(false); // Set loading state to false when document is loaded
        } catch (err) {
          console.error("Error loading PDF:", err);
          setError("Failed to load PDF"); // Set error state if loading fails
          setLoading(false); // Set loading state to false
        }
      };

      loadPDF();
    }
  }, [props.pdf]); // Trigger effect when props.pdf changes

  return (
    <div className={props.pagesize==="full"?`${ResumeStyle.show_full_pdf}`:`${ResumeStyle.show_pdf_box}`}>
      {loading && <p>Loading...</p>}
      {error && <p className={ResumeStyle.error}>Error: {error}</p>}
      {!loading && !error && numPages && (
        <Document
          file={props.pdf}
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          className={ResumeStyle.pdf_file}
        >
          {Array.from(new Array(numPages), (el, index) => (
            <Page
              key={index + 1}
              pageNumber={index + 1}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          ))}
        </Document>
      )}
    </div>
  );
}

export default PdfComp;
