const CastThumbnailComponent = ({actor}) => {


    return (
        <div>
            <img src={`https://image.tmdb.org/t/p/w185/${actor.profile_path}`} />
            <strong>{actor.name}</strong>
            <p>{actor.character}</p>
        </div>
    )
}

export default CastThumbnailComponent