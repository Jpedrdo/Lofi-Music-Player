import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faPlay,
  faPause,
  faAngleRight,
  faVolumeDown,
} from "@fortawesome/free-solid-svg-icons";
import { formatTime } from "../utils";

const Player = ({
  isPlaying,
  songInfo,
  playMusic,
  changeSong,
  handleDragTime,
  colorInput,
  handleVolume,
  noSpikBack,
  noSkipForward,
}) => {
  const { currentTime, duration, volume } = songInfo;
  const [activeVolume, setActiveVolume] = useState(false);
  const icons = [
    {
      name: "skip-back",
      icon: faAngleLeft,
      disabled: noSpikBack,
      onClick: () => changeSong(),
    },
    {
      name: "play",
      icon: isPlaying ? faPause : faPlay,
      onClick: () => playMusic(true),
    },
    {
      name: "skip-forward",
      icon: faAngleRight,
      disabled: noSkipForward,
      onClick: () => changeSong(true),
    },
  ];

  return (
    <div className="player">
      <div className="time-control">
        <p>{formatTime(currentTime)}</p>
        <div
          style={{
            background: `linear-gradient(to right, ${colorInput[0]},${colorInput[1]})`,
          }}
          className="track"
        >
          <input
            type="range"
            min={0}
            max={duration}
            value={currentTime}
            onChange={(e) => handleDragTime(e, true)}
          />
        </div>
        <p>{duration ? formatTime(duration) : "0:00"}</p>
      </div>
      <div className="play-control">
        {icons.map(({ icon, name, disabled, onClick }) => (
          <FontAwesomeIcon
            key={name}
            className={`${name} ${disabled ? "iconDisabled" : "iconClick"}`}
            onClick={onClick}
            size="2x"
            icon={icon}
          />
        ))}
        <div className="flex-volume">
          <FontAwesomeIcon
            className="iconClick"
            onClick={() => setActiveVolume(!activeVolume)}
            icon={faVolumeDown}
          />
          {activeVolume && (
            <div
              className="volume-control"
              style={{
                background: `linear-gradient(to right, ${colorInput[0]},${colorInput[1]})`,
              }}
            >
              <input
                value={volume}
                max="1"
                min="0"
                step="0.01"
                type="range"
                onChange={handleVolume}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Player;
