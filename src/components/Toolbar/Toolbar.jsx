import './Toolbar.css';

export default function Toolbar({ selectedId, elements, updateElement, duplicateElement }) {
  if (!selectedId) return null;

  const currentElement = elements.find(el => el.id === selectedId);
  if (!currentElement) return null;

  const isText = currentElement.type === 'text';
  const isImage = currentElement.type === 'image';

  return (
    <div className="dynamic-toolbar">
      <div className="toolbar-label">
        Editing {isText ? 'Text' : 'Image'}
      </div>
      
      {isText && (
        <div className="toolbar-controls">
          <label>Font:</label>
          <select 
            value={currentElement.style?.fontFamily || 'sans-serif'}
            onChange={(e) => updateElement(selectedId, {
              style: { ...currentElement.style, fontFamily: e.target.value }
            })}
          >
            <option value="sans-serif">Sans Serif</option>
            <option value="serif">Serif</option>
            <option value="monospace">Monospace</option>
            <option value="'Courier New', Courier, monospace">Courier New</option>
            <option value="'Times New Roman', Times, serif">Times New Roman</option>
            <option value="'Arial', sans-serif">Arial</option>
          </select>

          <label>Color:</label>
          <input 
            type="color" 
            value={currentElement.style?.color || '#000000'} 
            onChange={(e) => updateElement(selectedId, { 
              style: { ...currentElement.style, color: e.target.value } 
            })} 
          />

          <label>Weight:</label>
          <select 
            value={currentElement.style?.fontWeight || 'normal'}
            onChange={(e) => updateElement(selectedId, {
              style: { ...currentElement.style, fontWeight: e.target.value }
            })}
          >
            <option value="normal">Normal</option>
            <option value="500">Medium</option>
            <option value="600">Semi Bold</option>
            <option value="bold">Bold</option>
          </select>

          <label>Size:</label>
          <input 
            type="number" 
            min="8" max="200"
            value={parseInt(currentElement.style?.fontSize) || 16}
            onChange={(e) => updateElement(selectedId, {
              style: { ...currentElement.style, fontSize: `${e.target.value}px` }
            })}
            style={{ width: '60px' }}
          />
        </div>
      )}

      {isImage && (
        <div className="toolbar-controls">
          <label>Width:</label>
          <input 
            type="number" 
            min="10" max="1000"
            value={currentElement.width || 300}
            onChange={(e) => updateElement(selectedId, { width: parseInt(e.target.value) })}
            style={{ width: '70px' }}
          />
        </div>
      )}

      <div className="toolbar-controls" style={{ marginLeft: 'auto', borderLeft: '1px solid var(--border)', paddingLeft: '16px' }}>
        <label>Layer:</label>
        <select 
          value={currentElement.zIndex || 10}
          onChange={(e) => updateElement(selectedId, { zIndex: parseInt(e.target.value) })}
        >
          <option value="5">Send to Back</option>
          <option value="10">Normal</option>
          <option value="50">Bring Forward</option>
        </select>
        
        <button 
          className="btn btn-primary" 
          onClick={duplicateElement}
          title="Duplicate Element"
          style={{ padding: '4px 12px', fontSize: '13px' }}
        >
          Copy / Paste
        </button>
      </div>
    </div>
  );
}
