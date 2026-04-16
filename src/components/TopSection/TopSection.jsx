import './TopSection.css';

export default function TopSection({ onClear, onExport, undo, redo, canUndo, canRedo, zoom, setZoom }) {
  return (
    <header className="top-section">
      <div className="logo-area">
        <h1>Design<span>Editor</span></h1>
      </div>
      
      <div className="top-toolbar" style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <button className="btn" onClick={undo} disabled={!canUndo} style={{ opacity: !canUndo ? 0.5 : 1 }}>↩ Undo</button>
        <button className="btn" onClick={redo} disabled={!canRedo} style={{ opacity: !canRedo ? 0.5 : 1 }}>↪ Redo</button>
        
        <div style={{ display: 'flex', gap: '4px', alignItems: 'center', marginLeft: '16px', background: 'var(--bg-element)', padding: '4px', borderRadius: 'var(--radius-md)' }}>
          <button className="btn" onClick={() => setZoom(z => Math.max(0.1, z - 0.1))} style={{ padding: '6px 12px' }}>-</button>
          <span style={{ fontSize: '13px', fontWeight: 500, minWidth: '40px', textAlign: 'center' }}>{Math.round(zoom * 100)}%</span>
          <button className="btn" onClick={() => setZoom(z => z + 0.1)} style={{ padding: '6px 12px' }}>+</button>
        </div>
      </div>

      <div className="top-actions">
        <button className="btn" onClick={onClear}>Clear Canvas</button>
        <button className="btn btn-primary" onClick={onExport}>Export</button>
      </div>
    </header>
  );
}
