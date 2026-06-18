import React, { useState, useEffect, useRef } from 'react';

export default function PDFViewer({ pdfUrl, isHighRes = false, containerId = 'pdfCanvasList', onExpand = null }) {
  const [pdfDoc, setPdfDoc] = useState(null);
  const [scale, setScale] = useState(isHighRes ? 1.8 : 1.1);
  const [loading, setLoading] = useState(true);
  const [progressMsg, setProgressMsg] = useState('Initializing viewer...');
  const [useFallback, setUseFallback] = useState(false);
  
  const containerRef = useRef(null);
  const activeTaskRef = useRef(null);

  // Reset scale and document when PDF URL changes
  useEffect(() => {
    setScale(isHighRes ? 1.8 : 1.1);
    setPdfDoc(null);
    setLoading(true);
    setProgressMsg('Initializing viewer...');
    setUseFallback(false);

    const pdfjsLib = window.pdfjsLib;

    if (!pdfjsLib) {
      console.warn("pdf.js not loaded on window. Falling back to native browser viewer.");
      setUseFallback(true);
      setLoading(false);
      return;
    }

    // Configure worker
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';

    if (activeTaskRef.current) {
      activeTaskRef.current.destroy();
    }

    const loadingTask = pdfjsLib.getDocument(pdfUrl);
    activeTaskRef.current = loadingTask;

    loadingTask.onProgress = (progressData) => {
      if (progressData.total > 0) {
        const percent = Math.round((progressData.loaded / progressData.total) * 100);
        setProgressMsg(`${percent}% loaded (${Math.round(progressData.loaded / 1024 / 1024 * 10) / 10}MB / ${Math.round(progressData.total / 1024 / 1024 * 10) / 10}MB)`);
      } else {
        setProgressMsg(`${Math.round(progressData.loaded / 1024 / 1024 * 10) / 10}MB loaded`);
      }
    };

    loadingTask.promise
      .then((pdf) => {
        setPdfDoc(pdf);
        setLoading(false);
      })
      .catch((error) => {
        console.warn("pdf.js document loading failed. Falling back to native browser iframe.", error);
        setUseFallback(true);
        setLoading(false);
      });

    return () => {
      if (activeTaskRef.current) {
        activeTaskRef.current.destroy();
      }
    };
  }, [pdfUrl, isHighRes]);

  // Handle rendering of pages when document or scale changes
  useEffect(() => {
    if (!pdfDoc) return;

    const container = containerRef.current;
    if (!container) return;

    // Clear previous pages
    container.innerHTML = '';

    const renderPromises = [];

    for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
      const pageWrapper = document.createElement('div');
      pageWrapper.className = 'pdf-page-wrapper';
      pageWrapper.addEventListener('contextmenu', (e) => e.preventDefault());

      const canvas = document.createElement('canvas');
      canvas.className = 'pdf-page-canvas';
      pageWrapper.appendChild(canvas);
      container.appendChild(pageWrapper);

      const renderPromise = pdfDoc.getPage(pageNum).then((page) => {
        const ctx = canvas.getContext('2d');
        const viewport = page.getViewport({ scale });

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        const renderContext = {
          canvasContext: ctx,
          viewport: viewport,
        };
        return page.render(renderContext).promise;
      });
      
      renderPromises.push(renderPromise);
    }

    Promise.all(renderPromises).catch((error) => {
      console.warn("Error rendering PDF pages:", error);
    });
  }, [pdfDoc, scale]);

  const zoomIn = () => {
    setScale((prev) => Math.min(prev + 0.2, 2.5));
  };

  const zoomOut = () => {
    setScale((prev) => Math.max(prev - 0.2, 0.7));
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
  };

  return (
    <div 
      className="pdf-preview-box-wrapper" 
      style={{ width: '100%', height: '100%', position: 'relative' }}
      onContextMenu={handleContextMenu}
    >
      {loading && (
        <div className="pdf-loading">
          <div className="spinner"></div>
          <div className="pdf-loading-msg">Hold on, the design is just a second away...</div>
          <div className="pdf-loading-progress">{progressMsg}</div>
        </div>
      )}

      {useFallback ? (
        <iframe
          className="fallback-iframe"
          src={`${pdfUrl}#toolbar=0&navpanes=0`}
          style={{ border: 'none', width: '100%', height: '100%', borderRadius: '8px' }}
          title="PDF Fallback Viewer"
        />
      ) : (
        <div 
          className="pdf-canvas-list" 
          id={containerId} 
          ref={containerRef}
          style={{ display: loading ? 'none' : 'block' }}
        />
      )}

      {!loading && !useFallback && pdfDoc && (
        <div className="pdf-toolbar">
          <button 
            className="pdf-toolbar-btn" 
            onClick={zoomOut} 
            disabled={scale <= 0.7}
            title="Zoom Out"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ width: '14px', height: '14px' }}>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>
          <span className="pdf-zoom-level">{Math.round(scale * 100)}%</span>
          <button 
            className="pdf-toolbar-btn" 
            onClick={zoomIn} 
            disabled={scale >= 2.5}
            title="Zoom In"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ width: '14px', height: '14px' }}>
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>
          {onExpand && (
            <>
              <span className="pdf-toolbar-divider">|</span>
              <button 
                className="pdf-toolbar-btn expand-btn" 
                onClick={onExpand}
                title="View Full Screen"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ width: '14px', height: '14px' }}>
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                </svg>
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
