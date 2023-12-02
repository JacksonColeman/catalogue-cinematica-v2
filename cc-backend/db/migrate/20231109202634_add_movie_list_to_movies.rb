class AddMovieListToMovies < ActiveRecord::Migration[7.1]
  def change
    add_reference :movies, :movie_list, foreign_key: true
  end
end
