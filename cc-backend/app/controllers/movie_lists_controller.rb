# app/controllers/movie_lists_controller.rb
class MovieListsController < ApplicationController
    before_action :set_movie_list, only: [:show, :add_movie, :remove_movie]
  
    def index
      @movie_lists = MovieList.all
      render json: @movie_lists
    end
  
    def show
      render json: @movie_list, include: 'movies'
    end
  
    def create
      @movie_list = MovieList.new(movie_list_params)
  
      if @movie_list.save
        render json: @movie_list
      else
        render json: { error: @movie_list.errors.full_messages.join(', ') }, status: :unprocessable_entity
      end
    end
  
    def add_movie
      # byebug
      movie = Movie.find(params[:movie_id])
  
      if @movie_list.movies.include?(movie)
        render json: { error: 'Movie already exists in the list' }, status: :unprocessable_entity
      else
        @movie_list.movies << movie
        render json: @movie_list, include: 'movies'
      end
    end

    def add_to_favorites
      user = current_user
      movie_id = params[:movie_id].to_i
      favorites_list = user.movie_lists.find_or_create_by(name: 'Favorites')
  
      if favorites_list.movies.exists?(tmdb_id: movie_id)
        render json: { message: 'Movie is already in Favorites list' }
      else
        movie = Movie.find_by(tmdb_id: movie_id)
  
        if movie
          favorites_list.movies << movie
          render json: { message: 'Movie added to Favorites list', movie: movie }
        else
          render json: { error: 'Movie not found' }, status: :not_found
        end
      end
    end
  
    def remove_movie
        movie = Movie.find(params[:movie_id])
      
        if @movie_list.movies.include?(movie)
          @movie_list.movies.delete(movie)
          render json: @movie_list, include: 'movies'
        else
          render json: { error: 'Movie not found in the list' }, status: :not_found
        end
    end

    def remove_from_favorites
      user = current_user
      movie_id = params[:movie_id].to_i
      favorites_list = user.movie_lists.find_by(name: 'Favorites')
  
      if favorites_list
        movie = favorites_list.movies.find_by(tmdb_id: movie_id)
  
        if movie
          favorites_list.movies.delete(movie)
          render json: { message: 'Movie removed from Favorites list', movie: movie }
        else
          render json: { error: 'Movie not found in Favorites list' }, status: :not_found
        end
      else
        render json: { error: "Favorites list not found for the user" }, status: :not_found
      end
    end

    def destroy
        if @movie_list.deletable
          @movie_list.destroy
          render json: { message: 'List deleted successfully' }
        else
          render json: { error: 'Cannot delete a non-deletable list' }, status: :unprocessable_entity
        end
      end

      def update_name
        if @movie_list.update(name: params[:name])
          render json: { message: 'List name updated successfully' }
        else
          render json: { error: @movie_list.errors.full_messages.join(', ') }, status: :unprocessable_entity
        end
      end

      def add_to_list
        user = current_user
        movie_id = params[:movie_id].to_i
        list_name = params[:list_name]
    
        movie_list = user.movie_lists.find_or_create_by(name: list_name)
        movie = Movie.find_by(tmdb_id: movie_id)
    
        if movie
          movie_list.movies << movie unless movie_list.movies.include?(movie)
          render json: { message: "Movie added to #{list_name} list", movie: movie }
        else
          render json: { error: 'Movie not found' }, status: :not_found
        end
      end

      def remove_from_list
        user = current_user
        movie_id = params[:movie_id].to_i
        list_name = params[:list_name]
    
        movie_list = user.movie_lists.find_by(name: list_name)
    
        if movie_list
          movie = movie_list.movies.find_by(tmdb_id: movie_id)
    
          if movie
            movie_list.movies.delete(movie)
            render json: { message: "Movie removed from #{list_name} list", movie: movie }
          else
            render json: { error: 'Movie not found in the specified list' }, status: :not_found
          end
        else
          render json: { error: "Movie list '#{list_name}' not found for the user" }, status: :not_found
        end
      end
  
    private
  
    def set_movie_list
      @movie_list = MovieList.find(params[:id])
    end
  
    def movie_list_params
      params.require(:movie_list).permit(:name, :deletable, :user_id)
    end

    def add_to_list_params
      params.permit(:movie_id, :list_name)
    end

    def remove_from_list_params
      params.permit(:movie_id, :list_name)
    end
  end
