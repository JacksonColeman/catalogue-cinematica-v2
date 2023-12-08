class MoviesController < ApplicationController
    def create
        movie = Movie.new(movie_params)

        if movie.save
          render json: { message: 'Movie created successfully', movie: movie }
        else
          render json: { error: movie.errors.full_messages.join(', ') }, status: :unprocessable_entity
        end
    end

    # get movie by TMDB ID
    def show
        movie = Movie.find_by(tmdb_id: params[:id])
        if movie
          render json: {movie: movie,  check: check_movie_in_user_lists}
        else
          render json: { error: 'Movie not found' }, status: :not_found
        end
    end

    private

    def movie_params
        params.require(:movie).permit(:tmdb_id, :title, :backdrop_path, :poster_path)
    end

    def check_movie_in_user_lists
      user = current_user
    
      # Check if the user is present
      return { is_favorite: false, is_watchlist: false } unless user
    
      movie_id = params[:id].to_i
    
      favorites_list = user.movie_lists.find_by(name: 'Favorites')
      watchlist_list = user.movie_lists.find_by(name: 'Watchlist')
    
      is_favorite = favorites_list.present? && favorites_list.movies.exists?(tmdb_id: movie_id)
      is_watchlist = watchlist_list.present? && watchlist_list.movies.exists?(tmdb_id: movie_id)
    
      { is_favorite: is_favorite, is_watchlist: is_watchlist }
    end
end
