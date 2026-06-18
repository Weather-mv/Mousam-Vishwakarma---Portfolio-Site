import React, { useState, useEffect, useRef } from 'react';

export default function PDFViewer({ pdfUrl, isHighRes = false, containerId = 'pdfCanvasList' }) {
  const [loading, setLoading] = useState(true);
  const [progressMsg, setProgressMsg] = useState('Initializing viewer...');
  const [useFallback, setUseFallback] = useState(false);
  const containerRef = useRef(null);
  const activeTaskRef = useRef(null);

  const isRemote = pdfUrl && (pdfUrl.startsWith('http://') || pdfUrl.startsWith('https://'));

  useEffect(() => {
    if (isRemote) {
      setUseFallback(true);
      setLoading(false);
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    // Clear previous pages
    container.innerHTML = '';
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
        setLoading(false);
        container.innerHTML = ''; // Ensure container is empty

        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          const pageWrapper = document.createElement('div');
          pageWrapper.className = 'pdf-page-wrapper';
          pageWrapper.addEventListener('contextmenu', (e) => e.preventDefault());

          const canvas = document.createElement('canvas');
          canvas.className = 'pdf-page-canvas';
          pageWrapper.appendChild(canvas);
          container.appendChild(pageWrapper);

          pdf.getPage(pageNum).then((page) => {
            const ctx = canvas.getContext('2d');
            const scale = isHighRes ? 2.0 : 1.2;
            const viewport = page.getViewport({ scale });

            canvas.width = viewport.width;
            canvas.height = viewport.height;

            const renderContext = {
              canvasContext: ctx,
              viewport: viewport,
            };
            page.render(renderContext);
          });
        }
      })
      .catch((error) => {
        console.warn("pdf.js rendering failed. Falling back to native browser iframe.", error);
        setUseFallback(true);
        setLoading(false);
      });

    return () => {
      if (activeTaskRef.current) {
        activeTaskRef.current.destroy();
      }
    };
  }, [pdfUrl, isHighRes, isRemote]);

  // Handle right click suppression on the preview container
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
          src={isRemote ? `https://docs.google.com/viewer?url=${encodeURIComponent(pdfUrl)}&embedded=true` : `${pdfUrl}#toolbar=0&navpanes=0`}
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
    </div>
  );
}
