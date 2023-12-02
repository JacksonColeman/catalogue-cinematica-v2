// MovieDetailsComponent.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CastThumbnailComponent from "./CastThumbnailComponent";
import "./MovieDetailsComponent.css"; // Import the CSS file
import { LuClock4 } from "react-icons/lu";
import { BiCameraMovie } from "react-icons/bi";
import { BsPencilSquare } from "react-icons/bs";
import { RiVideoAddLine } from "react-icons/ri";
import {
  AiOutlineCalendar,
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineComment,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import MovieReviewForm from "../Reviews/MovieReviewForm";
import ReviewContainer from "../Reviews/ReviewContainer";
import CastDisplay from "./CastDisplay";

const MovieDetailsComponent = () => {
  const [openReviewModal, setOpenReviewModal] = useState(false);
  const [movieDetails, setMovieDetails] = useState(null);
  const { id } = useParams();
  const [reviewFormActive, setReviewFormActive] = useState(false);

  const movieData = {
    tmdb_id: movieDetails?.id,
    title: movieDetails?.title,
    backdrop_path: movieDetails?.backdrop_path,
    poster_path: movieDetails?.poster_path,
  };

  const postMovie = async () => {
    // Make a fetch POST request
    fetch("/api/movies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        credentials: "true",
        // Add any other headers you might need, e.g., authorization headers
      },
      body: JSON.stringify({ movie: movieData }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Movie creation failed");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Movie created successfully:", data);
        // Do something with the response, like redirecting or updating the UI
      })
      .catch((error) => {
        console.error("Movie creation error:", error);
        // Handle the error as needed
      });
  };

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`
          https://api.themoviedb.org/3/movie/${id}?append_to_response=credits&api_key=${"67efd9f8bb8609b38ab7599192991049"}`);
        const data = await response.json();
        setMovieDetails(data);
        console.log(data);
      } catch (error) {}
    };

    fetchMovieDetails();
  }, [id]);

  if (!movieDetails) {
    return <div>Loading...</div>;
  }

  const director = movieDetails.credits.crew.filter(
    ({ job }) => job === "Director"
  );
  const credits = movieDetails.credits;
  const cast = movieDetails.credits.cast;
  const backdrop = movieDetails.backdrop_path
    ? `https://image.tmdb.org/t/p/original/${movieDetails.backdrop_path}`
    : "fish";

  const poster_path = movieDetails.poster_path
    ? `https://image.tmdb.org/t/p/w300/${movieDetails.poster_path}`
    : "fish";

  const backgroundImageStyle = {
    backgroundImage: `linear-gradient(to bottom, transparent 40%, var(--cc-dark-grey)),linear-gradient(to top, transparent 90%, rgba(0, 0, 0, 1)),linear-gradient(to left, rgba(0, 0, 0, 0.1) 90%, rgba(0, 0, 0, 1)),linear-gradient(to right, transparent 90%, rgba(0, 0, 0, 1)), url(${backdrop})`,
  };

  return (
    <div className="movie-details-container">
      <MovieReviewForm
        movie={movieDetails}
        postMovie={postMovie}
        active={openReviewModal}
        handleCloseModal={() => setOpenReviewModal(false)}
      />
      <div style={backgroundImageStyle} className="backdrop-img-container">
        <div className="movie-details-text">
          <p className="movie-title">{movieDetails.title.toUpperCase()}</p>
          <div className="text-container">
            {director[0] ? (
              <p className="director">
                <BiCameraMovie className="camera-icon" /> Directed by{" "}
                <strong>{director[0]?.name}</strong>
              </p>
            ) : null}
            <p className="release-date">
              <AiOutlineCalendar className="cal-icon" />
              <span>{movieDetails.release_date.slice(0, 4)}</span>
            </p>
            <p className="runtime">
              <LuClock4 className="clock-icon" />
              <span className="runtime-text">{movieDetails.runtime} mins</span>
            </p>
          </div>
          <div className="btn-group">
            <a
              href="#top"
              onClick={() => setOpenReviewModal(true)}
              className="movie-btn"
            >
              <BsPencilSquare />
              <span className="movie-btn-text">Review</span>
            </a>
            <button className="movie-btn">
              {" "}
              <AiOutlineHeart />
              <span className="movie-btn-text">Favorite</span>
            </button>
            <button className="movie-btn">
              <RiVideoAddLine />
              <span className="movie-btn-text">Add to List</span>
            </button>
          </div>
        </div>

        <div className="overview-container">
          <p className="tagline">{movieDetails.tagline.toUpperCase()}</p>
          <p className="overview">{movieDetails.overview}</p>
        </div>
      </div>

      {/* Container for text elements */}

      <div className="movie-more-details-container">
        <CastDisplay credits={credits} />

        {/* <MovieReviewForm movie={movieDetails}  /> */}
        <ReviewContainer movie={movieDetails} />
      </div>
    </div>
  );
};

export default MovieDetailsComponent;
