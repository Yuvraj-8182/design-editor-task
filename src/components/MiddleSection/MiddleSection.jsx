import { useRef } from 'react';
import TextComponent from '../TextComponent/TextComponent';
import ImageComponent from '../ImageComponent/ImageComponent';
import './MiddleSection.css';

export default function MiddleSection({ elements, updateElement, removeElement, canvasBg, canvasBgImage, zoom, selectedId, setSelectedId }) {
  const canvasRef = useRef(null);

  const handleCanvasClick = (e) => {
    // If clicking directly on the canvas-area (not children), deselect everything
    if (e.target.className === 'canvas-area') {
      setSelectedId(null);
    }
  };

  return (
    <main className="middle-section" style={{ flex: 1, overflow: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="canvas-container" style={{ transform: `scale(${zoom})`, transformOrigin: 'center center', transition: 'transform 0.2s ease' }}>
        <div 
          className="canvas-area" 
          ref={canvasRef}
          onClick={handleCanvasClick}
          style={{ 
            backgroundColor: canvasBg,
            backgroundImage: canvasBgImage ? `url(${canvasBgImage})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative'
          }}
        >
          {elements.map(el => {
            if (el.type === 'text') {
              return (
                <TextComponent 
                  key={el.id} 
                  element={el} 
                  updateElement={updateElement} 
                  removeElement={removeElement}
                  canvasRef={canvasRef}
                  isSelected={selectedId === el.id}
                  onSelect={() => setSelectedId(el.id)}
                />
              );
            }
            if (el.type === 'image') {
               return (
                 <ImageComponent
                   key={el.id}
                   element={el}
                   updateElement={updateElement}
                   removeElement={removeElement}
                   canvasRef={canvasRef}
                   isSelected={selectedId === el.id}
                   onSelect={() => setSelectedId(el.id)}
                 />
               );
            }
            return null;
          })}
        </div>
      </div>
    </main>
  );
}
