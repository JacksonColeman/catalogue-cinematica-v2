import React from "react";
import CastThumbnailComponent from "./CastThumbnailComponent";
import "./CastDisplay.css";

const CastDisplay = ({ credits }) => {
  const cast = credits.cast.slice(0, 6);
  const crew = credits.crew;
  return (
    <div className="cast-container" id="cast">
      <div className="cast-header">
        <h3 className="cast-title movie-details-header">Cast</h3>
        <a className="full-cast-link" href="#cast">
          Show Full Cast
        </a>
      </div>
      <div className="cast-list">
        {cast.map((actor) => (
          <CastThumbnailComponent key={actor.id} actor={actor} />
        ))}
      </div>
    </div>
  );
};

export default CastDisplay;
