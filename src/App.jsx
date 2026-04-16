import { useState } from 'react';
import * as htmlToImage from 'html-to-image';
import { useHistory } from './hooks/useHistory';
import TopSection from './components/TopSection/TopSection';
import Sidebar from './components/Sidebar/Sidebar';
import MiddleSection from './components/MiddleSection/MiddleSection';
import Toolbar from './components/Toolbar/Toolbar';
import './App.css';

function App() {
  const { state: canvasState, set: pushHistory, undo, redo, canUndo, canRedo, clearHistory } = useHistory({
    elements: [],
    canvasBg: '#f4f4f5',
    canvasBgImage: null
  });

  const { elements, canvasBg, canvasBgImage } = canvasState;
  
  const [zoom, setZoom] = useState(1);
  const [selectedId, setSelectedId] = useState(null);

  const setElements = (updater) => {
    const newElements = typeof updater === 'function' ? updater(elements) : updater;
    pushHistory({ ...canvasState, elements: newElements });
  };

  const setCanvasBg = (bg) => {
    pushHistory({ ...canvasState, canvasBg: bg });
  };

  const setCanvasBgImage = (img) => {
    pushHistory({ ...canvasState, canvasBgImage: img });
  };

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear the canvas?')) {
      clearHistory({
        elements: [],
        canvasBg: '#f4f4f5',
        canvasBgImage: null
      });
      setSelectedId(null);
    }
  };

  const handleExport = () => {
    setSelectedId(null); // Deselect everything to remove hover bounds
    setTimeout(() => {
      const node = document.querySelector('.canvas-area');
      if (node) {
        // Enforce basic scale temporarily if needed, but standard toPng works perfectly without scaling overrides unless zooming is active. Best to reset zoom.
        htmlToImage.toPng(node, { quality: 1.0 })
          .then((dataUrl) => {
            const link = document.createElement('a');
            link.download = 'design-export.png';
            link.href = dataUrl;
            link.click();
          })
          .catch((error) => {
            console.error('Failed to export canvas!', error);
          });
      }
    }, 150);
  };

  const duplicateElement = () => {
    if (!selectedId) return;
    const elementToCopy = elements.find(el => el.id === selectedId);
    if (!elementToCopy) return;

    const newElement = {
      ...elementToCopy,
      id: Date.now().toString(),
      x: elementToCopy.x + 20,
      y: elementToCopy.y + 20,
    };
    
    setElements([...elements, newElement]);
    setSelectedId(newElement.id);
  };

  const updateElement = (id, newProps) => {
    setElements(prev => prev.map(el => el.id === id ? { ...el, ...newProps } : el));
  };

  const removeElement = (id) => {
    setElements(prev => prev.filter(el => el.id !== id));
    if (selectedId === id) setSelectedId(null);
  };

  return (
    <div className="app-layout">
      <TopSection 
        onClear={handleClear} 
        onExport={handleExport} 
        undo={undo}
        redo={redo}
        canUndo={canUndo}
        canRedo={canRedo}
        zoom={zoom}
        setZoom={setZoom}
      />
      <div className="main-content">
        <Sidebar 
          elements={elements}
          setElements={setElements} 
          updateElement={updateElement}
          removeElement={removeElement}
          setCanvasBg={setCanvasBg}
          canvasBgImage={canvasBgImage}
          setCanvasBgImage={setCanvasBgImage}
        />
        <div className="middle-wrapper" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Toolbar 
            selectedId={selectedId} 
            elements={elements} 
            updateElement={updateElement} 
            duplicateElement={duplicateElement}
          />
          <MiddleSection 
            elements={elements} 
            updateElement={updateElement}
            removeElement={removeElement}
            canvasBg={canvasBg}
            canvasBgImage={canvasBgImage}
            zoom={zoom}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
