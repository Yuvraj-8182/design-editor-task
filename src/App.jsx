import { useState } from 'react';
import TopSection from './components/TopSection/TopSection';
import Sidebar from './components/Sidebar/Sidebar';
import MiddleSection from './components/MiddleSection/MiddleSection';
import './App.css';

function App() {
  const [elements, setElements] = useState([]);
  const [canvasBg, setCanvasBg] = useState('#f4f4f5');
  const [canvasBgImage, setCanvasBgImage] = useState(null);

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear the canvas?')) {
      setElements([]);
      setCanvasBgImage(null);
      setCanvasBg('#f4f4f5');
    }
  };

  const handleExport = () => {
    alert('Export feature coming soon!');
  };

  return (
    <div className="app-layout">
      <TopSection onClear={handleClear} onExport={handleExport} />
      <div className="main-content">
        <Sidebar 
          setElements={setElements} 
          setCanvasBg={setCanvasBg}
          canvasBgImage={canvasBgImage}
          setCanvasBgImage={setCanvasBgImage}
        />
        <MiddleSection 
          elements={elements} 
          setElements={setElements} 
          canvasBg={canvasBg}
          canvasBgImage={canvasBgImage}
        />
      </div>
    </div>
  );
}

export default App;
