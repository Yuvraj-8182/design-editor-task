import { useState } from 'react';
import './Sidebar.css';

export default function Sidebar({ elements, setElements, updateElement, removeElement, setCanvasBg, canvasBgImage, setCanvasBgImage }) {
  const [activeTab, setActiveTab] = useState('text');

  const addText = (level) => {
    const textConfig = {
      h1: { fontSize: '48px', fontWeight: 'bold' },
      h2: { fontSize: '32px', fontWeight: '600' },
      h3: { fontSize: '24px', fontWeight: '500' },
      p: { fontSize: '16px', fontWeight: 'normal' },
    };
    
    setElements(prev => [...prev, {
      id: Date.now().toString(),
      type: 'text',
      text: `Double click to edit ${level.toUpperCase()}`,
      style: { ...textConfig[level], color: '#18181b' },
      x: 50,
      y: 50,
    }]);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setElements(prev => [...prev, {
        id: Date.now().toString(),
        type: 'image',
        src: event.target.result,
        x: 100,
        y: 100,
        width: 300,
      }]);
    };
    reader.readAsDataURL(file);
    e.target.value = ''; 
  };

  const handleBgImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setCanvasBgImage(event.target.result);
    };
    reader.readAsDataURL(file);
    e.target.value = ''; 
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-tabs">
        <button 
          className={`tab-btn ${activeTab === 'text' ? 'active' : ''}`}
          onClick={() => setActiveTab('text')}
        >Text</button>
        <button 
          className={`tab-btn ${activeTab === 'upload' ? 'active' : ''}`}
          onClick={() => setActiveTab('upload')}
        >Upload</button>
        <button 
          className={`tab-btn ${activeTab === 'quick-edit' ? 'active' : ''}`}
          onClick={() => setActiveTab('quick-edit')}
        >Quick Edit</button>
        <button 
          className={`tab-btn ${activeTab === 'background' ? 'active' : ''}`}
          onClick={() => setActiveTab('background')}
        >Elements</button>
      </div>

      <div className="tab-content">
        {activeTab === 'text' && (
          <div className="section">
            <h3>Add Text</h3>
            <p className="helper-text">Click to add a text component</p>
            <div className="text-buttons">
              <button className="btn" onClick={() => addText('h1')} style={{fontSize: '24px', fontWeight: 'bold'}}>Add Heading 1</button>
              <button className="btn" onClick={() => addText('h2')} style={{fontSize: '20px', fontWeight: '600'}}>Add Heading 2</button>
              <button className="btn" onClick={() => addText('h3')} style={{fontSize: '18px', fontWeight: '500'}}>Add Heading 3</button>
              <button className="btn" onClick={() => addText('p')}>Add Paragraph</button>
            </div>
          </div>
        )}

        {activeTab === 'quick-edit' && (
          <div className="section">
            <h3>Quick Edit</h3>
            <p className="helper-text">Edit all text elements on the canvas</p>
            <div className="quick-edit-list">
              {elements.filter(el => el.type === 'text').length === 0 ? (
                <p className="no-elements-text">No text on canvas.</p>
              ) : (
                elements.filter(el => el.type === 'text').map((el, idx) => (
                  <div key={el.id} className="quick-edit-item">
                    <label className="quick-edit-label">Text {idx + 1}</label>
                    <div className="quick-edit-input-group">
                      <input 
                        className="quick-edit-input"
                        type="text" 
                        value={el.text} 
                        onChange={(e) => updateElement(el.id, { text: e.target.value })} 
                      />
                      <button className="quick-edit-delete" onClick={() => removeElement(el.id)} title="Remove Text">
                        ✕
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === 'upload' && (
          <div className="section">
            <h3>File Upload</h3>
            <p className="helper-text">Upload images from local device</p>
            <div className="upload-box">
              <input type="file" id="img-upload" accept="image/*" onChange={handleImageUpload} hidden />
              <label htmlFor="img-upload" className="btn btn-primary upload-label">
                Choose Image File
              </label>
            </div>
          </div>
        )}

        {activeTab === 'background' && (
          <div className="section">
            <h3>Background Customization</h3>
            
            <div className="control-group">
              <label>Background Color</label>
              <div className="color-picker-wrap">
                <input 
                  type="color" 
                  onChange={(e) => setCanvasBg(e.target.value)} 
                  defaultValue="#f4f4f5"
                />
                <span className="helper-text">Select a color</span>
              </div>
            </div>

            <div className="control-group">
              <label>Background Image</label>
              <input type="file" id="bg-upload" accept="image/*" onChange={handleBgImageUpload} hidden />
              <label htmlFor="bg-upload" className="btn upload-label" style={{marginBottom: '10px'}}>
                Set Image Background
              </label>
              
              {canvasBgImage && (
                <button className="btn danger-btn" onClick={() => setCanvasBgImage(null)}>
                  Remove Background Image
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
