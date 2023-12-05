class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :reviews, :movie_lists

  def reviews
    object.reviews.order(created_at: :desc).collect do |review|
      {
        id: review.id,
        likes_count: review.likes_count,
        movie_id: review.movie_id,
        rating: review.rating,
        spoilers: review.spoilers,
        text: review.text,
        created_at: review.created_at,
        user: {
          id: object.id,
          username: object.username
        },
        movie: {
          tmdb_id: review.movie.tmdb_id,
          id: review.movie.id,
          title: review.movie.title,
          backdrop_path: review.movie.backdrop_path,
          poster_path: review.movie.poster_path
        },
        liked_by_current_user: liked_by_current_user(review)
      }
    end
  end

  def movie_lists
    object.movie_lists.collect do |movie_list|
      {
        id: movie_list.id,
        name: movie_list.name,
        movies: movie_list.movies.collect do |movie|
          {
            id: movie.id,
            tmdb_id: movie.tmdb_id,
            title: movie.title,
            backdrop_path: movie.backdrop_path,
            poster_path: movie.poster_path
          }
        end
      }
    end
  end

  private

  def liked_by_current_user(review)
    current_user_id = current_user&.id
    current_user_id && review.likes.exists?(user_id: current_user_id)
  end
end
