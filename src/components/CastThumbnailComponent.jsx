import React from 'react';
import './CastThumbnailComponent.css'; // Import the CSS file

const CastThumbnailComponent = ({ actor }) => {
  return (
    <div className='cast-thumbnail'>
      <img src={`https://image.tmdb.org/t/p/original/${actor.profile_path}`} alt={`${actor.name} Thumbnail`} />
      <div className="cast-text">
        <div className="actor-name">{actor.name}</div>
        <div className="actor-character">{actor.character}</div>
      </div>
    </div>
  );
};

export default CastThumbnailComponent;