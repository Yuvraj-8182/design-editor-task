import './TopSection.css';

export default function TopSection({ onClear, onExport }) {
  return (
    <header className="top-section">
      <div className="logo-area">
        <h1>Design<span>Editor</span></h1>
      </div>
      <div className="top-actions">
        <button className="btn" onClick={onClear}>Clear Canvas</button>
        <button className="btn btn-primary" onClick={onExport}>Export Design</button>
      </div>
    </header>
  );
}
