import { useState, useEffect } from 'react';

export default function ImageComponent({ element, updateElement, removeElement, canvasRef }) {
  const [isDragging, setIsDragging] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const startDrag = (e) => {
    setIsDragging(true);
  };

  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      if (!isDragging || !canvasRef.current) return;
      
      const canvasRect = canvasRef.current.getBoundingClientRect();
      let newX = e.clientX - canvasRect.left;
      let newY = e.clientY - canvasRect.top;

      updateElement(element.id, { x: newX, y: newY });
    };

    const handleGlobalMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleGlobalMouseMove);
      window.addEventListener('mouseup', handleGlobalMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging, element.id, updateElement, canvasRef]);

  useEffect(() => {
    const handleClickOutside = () => setIsFocused(false);
    if (isFocused) {
      window.addEventListener('click', handleClickOutside);
    }
    return () => window.removeEventListener('click', handleClickOutside);
  }, [isFocused]);

  const handleContainerClick = (e) => {
    e.stopPropagation();
    setIsFocused(true);
  };

  return (
    <div 
      className={`canvas-element ${isFocused ? 'focused' : ''}`}
      style={{
        left: element.x,
        top: element.y,
        transform: 'translate(-50%, -50%)',
        zIndex: isDragging ? 100 : 10
      }}
      onMouseDown={startDrag}
      onClick={handleContainerClick}
    >
      <div className="element-controls">
        <button className="control-btn delete" onClick={() => removeElement(element.id)} title="Remove image">
          ✕
        </button>
      </div>
      
      <img 
        src={element.src} 
        alt="uploaded element" 
        style={{
          width: element.width,
          height: 'auto',
          display: 'block',
          boxShadow: isFocused ? '0 0 0 2px var(--accent)' : 'none',
          borderRadius: '4px',
          pointerEvents: 'none' // allow parent dev to handle drag easily
        }} 
      />
    </div>
  );
}
