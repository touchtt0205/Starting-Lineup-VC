import React from "react";

interface PlayerProps {
  players: { name: string; image: File | null }[];
  onNameChange: (index: number, value: string) => void;
  onImageUpload: (index: number, file: File | null) => void;
}

const Player: React.FC<PlayerProps> = ({ players, onNameChange, onImageUpload }) => {
  return (
    <div className="flex justify-between px-20 py-12">
      {players.map((player, index) => (
        <div key={index} className="relative border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-100">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => onImageUpload(index, e.target.files?.[0] || null)}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-gray-300 file:text-gray-700 hover:file:bg-gray-400"
          />
          <input
            type="text"
            placeholder="Player Name"
            value={player.name}
            onChange={(e) => onNameChange(index, e.target.value)}
            className="w-full mt-2 p-2 border border-gray-300 rounded"
          />
        </div>
      ))}
    </div>
  );
};

export default Player;
