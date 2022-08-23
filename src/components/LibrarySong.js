import React from "react";

const LibrarySong = ({ song, indexSelected, changeSong }) => {
  const { name, artist, cover, index } = song;
  return (
    <div
      onClick={() => changeSong(false, index)}
      className={`library-song ${indexSelected === index ? "selected" : ""}`}
    >
      <img src={cover} alt={name} />
      <div className="song-description">
        <h3>{name}</h3>
        <h4>{artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
