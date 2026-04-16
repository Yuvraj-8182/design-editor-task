import { useState, useRef, useEffect } from 'react';

export default function TextComponent({ element, updateElement, removeElement, canvasRef }) {
  const [isDragging, setIsDragging] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [textValue, setTextValue] = useState(element.text);
  const [isFocused, setIsFocused] = useState(false);

  const startDrag = (e) => {
    if (isEditing) return;
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
    const handleClickOutside = (e) => {
      if (isEditing) {
        setIsEditing(false);
        updateElement(element.id, { text: textValue });
      }
      setIsFocused(false);
    };

    if (isEditing || isFocused) {
      window.addEventListener('click', handleClickOutside);
    }
    return () => window.removeEventListener('click', handleClickOutside);
  }, [isEditing, isFocused, textValue, element.id, updateElement]);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleContainerClick = (e) => {
    e.stopPropagation();
    setIsFocused(true);
  };

  return (
    <div 
      className={`canvas-element ${isEditing ? 'editing' : ''} ${isFocused ? 'focused' : ''}`}
      style={{
        left: element.x,
        top: element.y,
        transform: 'translate(-50%, -50%)', // center it on cursor roughly
        zIndex: isDragging ? 100 : 10
      }}
      onMouseDown={startDrag}
      onDoubleClick={handleDoubleClick}
      onClick={handleContainerClick}
    >
      <div className="element-controls">
        <button className="control-btn delete" onClick={() => removeElement(element.id)} title="Remove text">
          ✕
        </button>
      </div>
      
      {isEditing ? (
        <textarea
          autoFocus
          value={textValue}
          onChange={(e) => setTextValue(e.target.value)}
          style={{
            ...element.style,
            background: 'transparent',
            border: '1px dashed var(--accent)',
            outline: 'none',
            resize: 'none',
            whiteSpace: 'pre-wrap',
            fontFamily: 'inherit',
            lineHeight: 1.2,
            minWidth: '100px'
          }}
          onMouseDown={(e) => e.stopPropagation()} // allow text selection
        />
      ) : (
        <div style={{ ...element.style, whiteSpace: 'pre-wrap', lineHeight: 1.2 }}>
          {element.text}
        </div>
      )}
    </div>
  );
}
