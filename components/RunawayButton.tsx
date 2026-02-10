import React, { useState, useRef } from 'react';

interface RunawayButtonProps {
  label: string;
  onClick: () => void;
}

const RunawayButton: React.FC<RunawayButtonProps> = ({ label, onClick }) => {
  const [position, setPosition] = useState<{ top: string; left: string } | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const moveButton = () => {
    // Calculate random position within the viewport (approximate safe area)
    // We use fixed positioning to break out of the flow
    const x = Math.random() * 80 + 10; // 10% to 90%
    const y = Math.random() * 80 + 10; // 10% to 90%
    
    setPosition({
      top: `${y}%`,
      left: `${x}%`
    });
  };

  return (
    <button
      ref={buttonRef}
      onMouseEnter={moveButton}
      onTouchStart={moveButton} // For mobile users
      onClick={onClick} // Technically reachable if they are very fast, but intended to be impossible
      className="px-8 py-3 bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold rounded-full transition-all duration-200 shadow-md z-50 whitespace-nowrap"
      style={
        position
          ? {
              position: 'fixed',
              top: position.top,
              left: position.left,
              transform: 'translate(-50%, -50%)',
            }
          : {}
      }
    >
      {label}
    </button>
  );
};

export default RunawayButton;