import { useRef } from 'react';
import TextComponent from '../TextComponent/TextComponent';
import ImageComponent from '../ImageComponent/ImageComponent';
import './MiddleSection.css';

export default function MiddleSection({ elements, setElements, canvasBg, canvasBgImage }) {
  const canvasRef = useRef(null);

  const updateElement = (id, newProps) => {
    setElements(prev => prev.map(el => el.id === id ? { ...el, ...newProps } : el));
  };

  const removeElement = (id) => {
    setElements(prev => prev.filter(el => el.id !== id));
  };

  return (
    <main className="middle-section">
      <div className="canvas-container">
        <div 
          className="canvas-area" 
          ref={canvasRef}
          style={{ 
            backgroundColor: canvasBg,
            backgroundImage: canvasBgImage ? `url(${canvasBgImage})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
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
