  import React, { useRef, useState } from "react";
  import { toPng } from "html-to-image";
  import { saveAs } from "file-saver";
  import bgimg from "../assets/BG.png";
  import { FaCameraRetro } from 'react-icons/fa'; // ใช้ไอคอนจาก FontAwesome

  interface Player {
    name: string;
    image: File | null;
  }

  const Canvas: React.FC = () => {
    const canvasRef = useRef<HTMLDivElement>(null);
    const [players, setPlayers] = useState<Player[]>(Array(7).fill({ name: "", image: null }));
    const [teamName, setTeamName] = useState("");
    const [isPreview, setIsPreview] = useState(false);

    const handleImageUpload = (index: number, file: File | null) => {
      setPlayers((prevPlayers) => {
        const updatedPlayers = [...prevPlayers];
        updatedPlayers[index] = { ...updatedPlayers[index], image: file };
        return updatedPlayers;
      });
    };

    const handleNameChange = (index: number, value: string) => {
      setPlayers((prevPlayers) => {
        const updatedPlayers = [...prevPlayers];
        updatedPlayers[index] = { ...updatedPlayers[index], name: value };
        return updatedPlayers;
      });
    };

    const handleExport = () => {
      if (canvasRef.current) {
        toPng(canvasRef.current, {
          width: 1440,  // กำหนดขนาดภาพที่ต้องการ
          height: 1080,
        })
          .then((dataUrl) => {
            saveAs(dataUrl, "lineup.png");
          })
          .catch((err) => {
            console.error("Error exporting image:", err);
          });
      }
    };
    

    const isThai = (text:string) => {
      return /[ก-ฮ]/.test(text); // ตรวจสอบว่ามีตัวอักษรไทยหรือไม่
    };

    const getFontSize = (text: string): string => {
      const baseSize = 60; // ขนาดฟอนต์เริ่มต้น
      const maxLength = 10; // ความยาวสูงสุดที่ไม่ต้องปรับขนาด
      const textLength = text.length;
  
      if (textLength > maxLength) {
        return `${baseSize -12}px`;
      }      
      return `${baseSize}px`; // ขนาดฟอนต์เริ่มต้น
    };
  

    return (
      <div className="p-5">
        {!isPreview && (
          <div className="text-center mb-4">
            <input
              type="text"
              placeholder="Team Name"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              className="w-full max-w-md p-2 border border-gray-300 rounded"
            />
          </div>
        )}

        {isPreview ? (
          <div
            ref={canvasRef}
            className="relative mx-auto"
            style={{
              width: "1440px",
              height: "1080px",
              backgroundImage: `url(${bgimg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              justifyContent: "center", 
              alignItems: "center", 
              display: "block", // ใช้ display block
              margin: "0 auto", // จัดให้อยู่กลาง
              position: "relative",
            }}
          >
          <div
            className="absolute"
            style={{
              left: "0",
              top: "250px",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              fontSize: getFontSize(teamName),
              fontWeight: "bold",
              color: "white",
              fontFamily: isThai(teamName) ? "'Chakra Petch', sans-serif" : "'Sports World', sans-serif",
            }}
          >
            {teamName || "Team Name"}
          </div>

          {/* Layout สำหรับผู้เล่น */}
          <div className="relative">
              {/* Player 1 */}
              <div
                className="relative border-2 border-solid border-gray-300 rounded-lg p-2 bg-white"
                style={{ position: "absolute", left: "450px", top: "420px", width: "150px", height: "220px" }}
              >
                <div className="w-full h-4/4 bg-gray-200 flex items-center justify-center rounded-lg">
                  {players[0].image ? (
                    <img
                      src={URL.createObjectURL(players[0].image)}
                      alt="Player 1"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <span className="text-gray-400">No Image</span>
                  )}
                </div>
                <div
                  className="mt-2 text-center text-gray-800 text-lg font-semibold"
                  style={{
                    fontFamily: isThai(players[2].name) ? 'Noto Sans Thai, sans-serif' : 'Bebas Neue, sans-serif',
                    fontWeight: 400, // ปรับน้ำหนักฟอนต์เป็นปกติ
                  }}
                >
                  {players[0].name || "Player 1"}
                </div>
              </div>

              {/* Player 2 */}
              <div
                className="relative border-2 border-solid border-gray-300 rounded-lg p-2 bg-white"
                style={{ position: "absolute", left: "635px", top: "420px", width: "150px", height: "220px" }}
              >
                <div className="w-full h-4/4 bg-gray-200 flex items-center justify-center rounded-lg">
                  {players[1].image ? (
                    <img
                      src={URL.createObjectURL(players[1].image)}
                      alt="Player 2"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <span className="text-gray-400">No Image</span>
                  )}
                </div>
                <div
                  className="mt-2 text-center text-gray-800 text-lg font-semibold"
                  style={{
                    fontFamily: isThai(players[2].name) ? 'Noto Sans Thai, sans-serif' : 'Bebas Neue, sans-serif',
                    fontWeight: 400, // ปรับน้ำหนักฟอนต์เป็นปกติ
                  }}
                >                {players[1].name || "Player 2"}
                </div>
              </div>

              {/* Player 3 */}
              <div
                className="relative border-2 border-solid border-gray-300 rounded-lg p-2 bg-white"
                style={{ position: "absolute", left: "820px", top: "420px", width: "150px", height: "220px" }}
              >
                <div className="w-full h-4/4 bg-gray-200 flex items-center justify-center rounded-lg">
                  {players[2].image ? (
                    <img
                      src={URL.createObjectURL(players[2].image)}
                      alt="Player 3"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <span className="text-gray-400">No Image</span>
                  )}
                </div>
                <div
                  className="mt-2 text-center text-gray-800 text-lg font-semibold"
                  style={{
                    fontFamily: isThai(players[2].name) ? 'Noto Sans Thai, sans-serif' : 'Bebas Neue, sans-serif',
                    fontWeight: 400,
                  }}
                >
                  {players[2].name || "Player 3"}
                </div>
              </div>

              {/* Player 4 */}
              <div
                className="relative border-2 border-solid border-gray-300 rounded-lg p-2 bg-white"
                style={{ position: "absolute", left: "450px", top: "670px", width: "150px", height: "220px" }}
              >
                <div className="w-full h-4/4 bg-gray-200 flex items-center justify-center rounded-lg">
                  {players[3].image ? (
                    <img
                      src={URL.createObjectURL(players[3].image)}
                      alt="Player 4"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <span className="text-gray-400">No Image</span>
                  )}
                </div>
                <div
                  className="mt-2 text-center text-gray-800 text-lg font-semibold"
                  style={{
                    fontFamily: isThai(players[2].name) ? 'Noto Sans Thai, sans-serif' : 'Bebas Neue, sans-serif',
                    fontWeight: 400, // ปรับน้ำหนักฟอนต์เป็นปกติ
                  }}
                >
                  {players[3].name || "Player 4"}
                </div>
              </div>

              {/* Player 5 */}
              <div
                className="relative border-2 border-solid border-gray-300 rounded-lg p-2 bg-white"
                style={{ position: "absolute", left: "630px", top: "670px", width: "150px", height: "220px" }}
              >
                <div className="w-full h-4/4 bg-gray-200 flex items-center justify-center rounded-lg">
                  {players[4].image ? (
                    <img
                      src={URL.createObjectURL(players[4].image)}
                      alt="Player 5"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <span className="text-gray-400">No Image</span>
                  )}
                </div>
                <div
                  className="mt-2 text-center text-gray-800 text-lg font-semibold"
                  style={{
                    fontFamily: isThai(players[2].name) ? 'Noto Sans Thai, sans-serif' : 'Bebas Neue, sans-serif',
                    fontWeight: 400, // ปรับน้ำหนักฟอนต์เป็นปกติ
                  }}
                >
                  {players[4].name || "Player 5"}
                </div>
              </div>

              {/* Player 6 */}
              <div
                className="relative border-2 border-solid border-gray-300 rounded-lg p-2 bg-white"
                style={{ position: "absolute", left: "820px", top: "670px", width: "150px", height: "220px" }}
              >
                <div className="w-full h-4/4 bg-gray-200 flex items-center justify-center rounded-lg">
                  {players[5].image ? (
                    <img
                      src={URL.createObjectURL(players[5].image)}
                      alt="Player 6"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <span className="text-gray-400">No Image</span>
                  )}
                </div>
                <div
                  className="mt-2 text-center text-gray-800 text-lg font-semibold"
                  style={{
                    fontFamily: isThai(players[2].name) ? 'Noto Sans Thai, sans-serif' : 'Bebas Neue, sans-serif',
                    fontWeight: 400, // ปรับน้ำหนักฟอนต์เป็นปกติ
                  }}
                >
                  {players[5].name || "Player 6"}
                </div>
              </div>

              {/* Player 7 */}
              <div
                className="relative border-2 border-solid border-gray-300 rounded-lg p-2 bg-white"
                style={{ position: "absolute", left: "990px", top: "750px", width: "150px", height: "220px" }}
              >
                <div className="w-full h-4/4 bg-gray-200 flex items-center justify-center rounded-lg">
                  {players[6].image ? (
                    <img
                      src={URL.createObjectURL(players[6].image)}
                      alt="Player 7"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <span className="text-gray-400">No Image</span>
                  )}
                </div>
                <div
                  className="mt-2 text-center text-gray-800 text-lg font-semibold"
                  style={{
                    fontFamily: isThai(players[2].name) ? 'Noto Sans Thai, sans-serif' : 'Bebas Neue, sans-serif',
                    fontWeight: 400, // ปรับน้ำหนักฟอนต์เป็นปกติ
                  }}
                >
                  {players[6].name || "Player 7"}
                </div>
              </div>
            </div>
            </div>
          ) : (
            <div className="relative mx-auto bg-gray-200 border-2 border-gray-400 rounded-lg" style={{ width: "1440px", height: "1080px" }}>
              <div className="grid grid-cols-3 gap-4 px-20 py-32">
                {players.map((player, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div
                      className="flex flex-col items-center justify-center border-2 border-solid border-gray-400 p-2 rounded"
                      style={{ width: "150px", height: "280px" }}
                    >
                      {/* แสดงรูปภาพ */}
                      {player.image ? (
                        <div className="w-full h-full flex items-center justify-center">
                          <img
                            src={URL.createObjectURL(player.image)}
                            alt={`Player ${index + 1}`}
                            className="w-full h-full object-contain rounded-md" // ทำให้ภาพไม่เกินกรอบ
                          />
                        </div>
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-md">
                          <label htmlFor={`file-upload-${index}`} className="cursor-pointer flex flex-col items-center text-gray-400">
                            <FaCameraRetro className="w-10 h-10 text-gray-400" />
                            <span className="mt-2">Upload Image</span> {/* ข้อความอยู่ใต้ไอคอน */}
                          </label>
                          <input
                            id={`file-upload-${index}`}
                            type="file"
                            onChange={(e) => handleImageUpload(index, e.target.files?.[0] || null)}
                            className="hidden"
                          />
                        </div>
                      )}

                      {/* ชื่อผู้เล่น */}
                      <div className="flex items-center mt-2 w-full">
                        <input
                          type="text"
                          placeholder={`Player ${index + 1} Name`}
                          value={player.name}
                          onChange={(e) => handleNameChange(index, e.target.value)}
                          className="p-2 border border-gray-300 rounded mt-2 text-center w-full"
                        />
                      </div>

                      

                    </div>
                  </div>
                ))}
              </div>
            </div>

        )}

        <div className="text-center mt-4">
          {isPreview ? (
            <>
            <button
                onClick={() => setIsPreview(false)}
                className="bg-yellow-500 text-white py-2 px-4 rounded"
              >
                Back to Edit
              </button>
              <button
                onClick={handleExport}
                className="bg-green-500 text-white py-2 px-4 ml-4 rounded"
              >
                Export to PNG
              </button>
              
            </>
          ) : (
            <button
              onClick={() => setIsPreview(true)}
              className="bg-blue-500 text-white py-2 px-6 rounded mt-10"
              style={{ position: 'relative', zIndex: 10 }} // เพิ่ม zIndex ที่นี่
            >
              Preview
            </button>
    )}
        </div>

      </div>
    );
  };

  export default Canvas;
