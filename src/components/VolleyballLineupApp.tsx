import React, { useState, useRef } from 'react';
import { Camera, X, Download } from 'lucide-react';
import html2canvas from 'html2canvas';


interface PlayerData {
  name: string;
  image: string | null;
}

const initialPlayerState: PlayerData = {
  name: '',
  image: null
};

const VolleyballLineupApp: React.FC = () => {
  const [teamAName, setTeamAName] = useState('Team A');
  const [teamBName, setTeamBName] = useState('Team B');
  const [teamAPlayers, setTeamAPlayers] = useState<PlayerData[]>(
    Array(7).fill(initialPlayerState)
  );
  const [teamBPlayers, setTeamBPlayers] = useState<PlayerData[]>(
    Array(7).fill(initialPlayerState)
  );
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const lineupRef = useRef<HTMLDivElement>(null);

  const handleImageUpload = (
    teamSide: 'A' | 'B',
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const players = teamSide === 'A' ? [...teamAPlayers] : [...teamBPlayers];
        players[index] = { ...players[index], image: reader.result as string };
  
        if (teamSide === 'A') {
          setTeamAPlayers(players);
        } else {
          setTeamBPlayers(players);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleNameChange = (
    teamSide: 'A' | 'B',
    index: number,
    name: string
  ) => {
    const players = teamSide === 'A' ? [...teamAPlayers] : [...teamBPlayers];
    players[index] = { ...players[index], name };
  
    if (teamSide === 'A') {
      setTeamAPlayers(players);
    } else {
      setTeamBPlayers(players);
    }
  };
  
  const removeImage = (teamSide: 'A' | 'B', index: number) => {
    const players = teamSide === 'A' ? [...teamAPlayers] : [...teamBPlayers];
    players[index] = { ...players[index], image: null };
  
    if (teamSide === 'A') {
      setTeamAPlayers(players);
    } else {
      setTeamBPlayers(players);
    }
  };
  
const exportLineup = () => {
  if (lineupRef.current) {
    html2canvas(lineupRef.current, { 
      scale: 1.5 ,
      width: 1250,
      height: 750   
    }).then((canvas) => {
      const dataUrl = canvas.toDataURL('image/png');
      setPreviewImage(dataUrl);
    }).catch((error) => {
      console.error('Error generating lineup image:', error);
    });
  }
};
  

  const downloadImage = () => {
    if (previewImage) {
      const link = document.createElement('a');
      link.download = 'volleyball_lineup.png';
      link.href = previewImage;
      link.click();
      setPreviewImage(null);
    }
  };

  const renderPlayerSlot = (
    teamSide: 'A' | 'B',
    index: number,
    player: PlayerData,
    isLibero: boolean = false,
    isPreviewMode: boolean = false // เพิ่มพารามิเตอร์เพื่อแยกการแสดงผลระหว่างการ preview และการแก้ไข
  ) => {
    const playerName = player.name || `Player ${index + 1}`;
  
    return (
      <div 
        key={index} 
        className={`flex flex-col items-center p-2 ${
          isLibero ? 'bg-yellow-100' : 'bg-white'
        } border rounded-lg`}
      >
        <div className="relative w-32 h-32 mb-2">
          {player.image ? (
            <>
              <img 
                src={player.image} 
                alt={`Player ${index + 1}`} 
                className="w-full h-full object-cover rounded-lg"
              />
              {!isPreviewMode && (
                <button 
                  onClick={() => removeImage(teamSide, index)} 
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                >
                  <X size={25} />
                </button>
              )}
            </>
          ) : (
            <label className="cursor-pointer flex items-center justify-center w-full h-full bg-gray-200 rounded-lg">
              <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={(e) => handleImageUpload(teamSide, index, e)}
              />
              <Camera size={48} className="text-gray-500" />
            </label>
          )}
        </div>
        
        {/* เช็คว่าถ้าอยู่ในโหมด Preview ก็จะแสดงแค่ชื่อผู้เล่น ไม่แสดง input */}
        {!isPreviewMode ? (
          <input 
            type="text" 
            placeholder={`${isLibero ? 'Libero' : 'Player'} ${index + 1}`}
            value={player.name}
            onChange={(e) => handleNameChange(teamSide, index, e.target.value)}
            className="w-full text-center border rounded px-2 py-1"
          />
        ) : (
          <div className="w-full text-center font-semibold">{playerName}</div> // ในโหมด Preview จะแสดงชื่อแทน
        )}
      </div>
    );
  };
  

  return (
    <div className="container mx-auto p-4">
      {/* Preview Modal */}
      {previewImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-4xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Lineup Preview</h2>
              <button 
                onClick={() => setPreviewImage(null)} 
                className="text-red-500 hover:text-red-700"
              >
                <X size={24} />
              </button>
            </div>
            <div className="flex justify-center mb-4">
              <img 
                src={previewImage} 
                alt="Lineup Preview" 
                className="max-w-full max-h-[70vh] object-contain"
              />
            </div>
            <div className="flex justify-center">
              <button 
                onClick={downloadImage}
                className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 flex items-center"
              >
                <Download className="mr-2" /> Download Image
              </button>
            </div>
          </div>
        </div>
      )}

      <div 
        ref={lineupRef} 
        className="bg-white p-6 rounded-lg shadow-lg"
      >
        <div className="flex justify-between mb-6">
          <input 
            type="text" 
            value={teamAName} 
            onChange={(e) => setTeamAName(e.target.value)}
            className="text-2xl font-bold text-center w-full mr-4 border-b-2"
            placeholder="Team A Name"
          />
          <input 
            type="text" 
            value={teamBName} 
            onChange={(e) => setTeamBName(e.target.value)}
            className="text-2xl font-bold text-center w-full ml-4 border-b-2"
            placeholder="Team B Name"
          />
        </div>
        <div className="flex justify-between gap-8">
        <div className="flex-1 grid grid-cols-3 gap-4">
          
          {/* Libero */}
          <div className="col-span-1 flex flex-col justify-center items-start">
            {renderPlayerSlot('A', 6, teamAPlayers[6], true)}
          </div>
          {/* Main 6 Players */}
          <div className="col-span-2 grid grid-cols-2 gap-4">
            {[0, 1, 2, 3, 4, 5].map(index => 
              renderPlayerSlot('A', index, teamAPlayers[index])
            )}
          </div>
        </div>
          
          {/* Team B Lineup */}
          <div className="flex-1 grid grid-cols-3 gap-4">
            {/* Main 6 Players */}
            <div className="col-span-2 grid grid-cols-2 gap-4">
              {[0, 1, 2, 3, 4, 5].map(index => 
                renderPlayerSlot('B', index, teamBPlayers[index])
              )}
            </div>
            {/* Libero */}
            <div className="col-span-1 flex flex-col justify-center">
              {renderPlayerSlot('B', 6, teamBPlayers[6], true)}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 text-center">
        <button 
          onClick={exportLineup}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Preview Lineup
        </button>
      </div>
    </div>
  );
};

export default VolleyballLineupApp;