// src/components/Component.tsx
import React from 'react';

interface ComponentProps {
  x: number;
  y: number;
  name: string;
}

const Component: React.FC<ComponentProps> = ({ x, y, name }) => {
  return (
    <div
      style={{
        position: 'absolute',
        width: '150px',
        height: '100px',
        left: `${x}px`,
        top: `${y}px`,
        backgroundColor: 'lightblue',
        border: '1px solid #000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
      }}
    >
      {name}
    </div>
  );
};

export default Component;
