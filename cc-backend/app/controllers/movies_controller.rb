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
          render json: { movie: movie }
        else
          render json: { error: 'Movie not found' }, status: :not_found
        end
    end

    private

    def movie_params
        params.require(:movie).permit(:tmdb_id, :title)
    end
end
