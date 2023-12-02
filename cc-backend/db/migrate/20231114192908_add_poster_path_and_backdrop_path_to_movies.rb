class AddPosterPathAndBackdropPathToMovies < ActiveRecord::Migration[7.1]
  def change
    add_column :movies, :poster_path, :string
    add_column :movies, :backdrop_path, :string
  end
end
