import React from "react";

interface PreviewProps {
  players: { name: string; image: File | null }[];
  teamNames: string[];
}

const Preview: React.FC<PreviewProps> = ({ players, teamNames }) => {
  return (
    <div className="relative mx-auto bg-gray-200 border-2 border-gray-400 rounded-lg" style={{ width: "1400px", height: "1000px" }}>
      <div className="absolute top-5 left-1/4 transform -translate-x-1/2 text-5xl font-bold text-gray-800">
        {teamNames[0] || "Team 1 Name"}
      </div>
      <div className="absolute top-5 right-1/4 transform translate-x-1/2 text-5xl font-bold text-gray-800">
        {teamNames[1] || "Team 2 Name"}
      </div>

      {/* กรอบผู้เล่น */}
      <div className="flex justify-between px-20 py-32">
        {/* ฝั่ง 1 */}
        <div className="w-1/2">
          <div className="grid grid-cols-3 gap-4">
            {players.slice(0, 6).map((player, index) => (
              <div key={index} className="relative border-2 border-solid border-gray-300 rounded-lg p-4 bg-white">
                {player.image && (
                  <img
                    src={URL.createObjectURL(player.image)}
                    alt={`Player ${index + 1}`}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                )}
                <div className="mt-2 text-center text-gray-800 text-lg font-semibold">
                  {player.name || `Player ${index + 1}`}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ฝั่ง 2 */}
        <div className="w-1/2">
          <div className="grid grid-cols-3 gap-4">
            {players.slice(7, 13).map((player, index) => (
              <div key={index + 7} className="relative border-2 border-solid border-gray-300 rounded-lg p-4 bg-white">
                {player.image && (
                  <img
                    src={URL.createObjectURL(player.image)}
                    alt={`Player ${index + 8}`}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                )}
                <div className="mt-2 text-center text-gray-800 text-lg font-semibold">
                  {player.name || `Player ${index + 8}`}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;
