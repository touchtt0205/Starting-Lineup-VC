import React from "react";

interface TeamNameProps {
  teamNames: string[];
  onTeamNameChange: (index: number, value: string) => void;
}

const TeamName: React.FC<TeamNameProps> = ({ teamNames, onTeamNameChange }) => {
  return (
    <div className="text-center mb-4">
      <div className="flex justify-center gap-4 mb-4">
        <input
          type="text"
          placeholder="Team 1 Name"
          value={teamNames[0]}
          onChange={(e) => onTeamNameChange(0, e.target.value)}
          className="w-full max-w-md p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Team 2 Name"
          value={teamNames[1]}
          onChange={(e) => onTeamNameChange(1, e.target.value)}
          className="w-full max-w-md p-2 border border-gray-300 rounded"
        />
      </div>
    </div>
  );
};

export default TeamName;
