class MovieSerializer < ActiveModel::Serializer
    attributes :id, :tmdb_id, :title, :poster_path, :backdrop_path
  end
  