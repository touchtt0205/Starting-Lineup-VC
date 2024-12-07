// src/components/Canvas.tsx
import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import Component from '../components/components';

interface CanvasProps1 {
  width: number;
  height: number;
}

const Canvas1: React.FC<CanvasProps1> = ({ width, height }) => {
  const [components, setComponents] = useState<{ id: string; x: number; y: number; name: string }[]>([]);
  const [fileName, setFileName] = useState<string>('');

  const addComponent = (x: number, y: number, name: string) => {
    const newComponent = { id: `${Date.now()}`, x, y, name };
    setComponents([...components, newComponent]);
  };

  const handleDownload = () => {
    const canvasElement = document.getElementById('canvas');
    if (canvasElement) {
      html2canvas(canvasElement).then((canvas) => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL();
        link.download = `${fileName || 'canvas'}.png`;
        link.click();
      });
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Enter file name"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
        />
      </div>
      <div id="canvas" style={{ position: 'relative', width, height, border: '1px solid black' }}>
        {components.map((comp) => (
          <Component key={comp.id} x={comp.x} y={comp.y} name={comp.name} />
        ))}
      </div>
      <button onClick={() => addComponent(100, 100, 'Component 1')}>Add Component</button>
      <button onClick={handleDownload}>Download Canvas</button>
    </div>
  );
};

export default Canvas1;
