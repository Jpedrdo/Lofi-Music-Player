import React, { useState, useRef } from "react";
import Player from "../components/Player";
import Song from "../components/Song";
import Library from "../components/Library";
import Nav from "../components/Nav";
import { playlistData } from "../data";
import { newIndexCalc } from "../utils";

const MainView = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songs] = useState(playlistData);
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [libraryStatus, setLibraryStatus] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
    volume: 0,
  });

  const playMusic = async (handlePlay) => {
    const playing = handlePlay ? !isPlaying : true;
    setTimeout(async () => {
      await audioRef.current[playing ? "play" : "pause"]();
    }, 150);
    setIsPlaying(playing);
  };

  const timeStuff = ({ target }) => {
    const { currentTime, duration, volume } = target;
    const roundedCurrent = Math.round(currentTime);
    const roundedDuration = Math.round(duration);
    const percentage = Math.round((roundedCurrent / roundedDuration) * 100);

    setSongInfo({
      ...songInfo,
      currentTime: currentTime,
      duration: duration || 0,
      animationPercentage: percentage,
      volume: volume,
    });
  };

  const handleDragTime = ({ target }) => {
    const { value } = target;
    audioRef.current.currentTime = value;
    setSongInfo({ ...songInfo, currentTime: value });
  };

  const changeSong = async (direction, index) => {
    const newCurrentSong = async () => {
      const newIndex =
        index !== undefined
          ? index
          : newIndexCalc[direction ? "+" : "-"](currentSong.index, 1);
      if (newIndex > -1 && newIndex < songs.length) {
        return setCurrentSong(songs[newIndex]);
      }
    };

    await newCurrentSong();
    isPlaying && playMusic();
  };

  const handleVolume = ({ target }) => {
    const { value } = target;
    audioRef.current.volume = value;
    setSongInfo({ ...songInfo, volume: value });
  };

  const handleDrawer = () => setLibraryStatus(!libraryStatus);

  return (
    <div className={`App ${libraryStatus ? "library-active" : ""}`}>
      <Nav libraryStatus={libraryStatus} handleDrawer={handleDrawer} />
      <Song isPlaying={isPlaying} currentSong={currentSong} />
      <Player
        isPlaying={isPlaying}
        songInfo={songInfo}
        colorInput={currentSong.color}
        playMusic={playMusic}
        changeSong={changeSong}
        handleDragTime={handleDragTime}
        handleVolume={handleVolume}
        noSpikBack={currentSong.index === 0}
        noSkipForward={currentSong.index === songs.length - 1}
      />
      <Library
        songs={songs}
        libraryStatus={libraryStatus}
        indexSelected={currentSong.index}
        changeSong={changeSong}
      />
      <audio
        onLoadedMetadata={timeStuff}
        onTimeUpdate={timeStuff}
        ref={audioRef}
        src={currentSong.audio}
        onEnded={changeSong}
      />
    </div>
  );
};

export default MainView;
