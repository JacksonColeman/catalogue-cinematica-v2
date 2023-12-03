class CreateJoinTableMoviesMovieLists < ActiveRecord::Migration[7.1]
  def change
    create_join_table :movies, :movie_lists do |t|
      # t.index [:movie_id, :movie_list_id]
      # t.index [:movie_list_id, :movie_id]
    end
  end
end
