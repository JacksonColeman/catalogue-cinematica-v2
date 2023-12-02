class Movie < ApplicationRecord
    validates :tmdb_id, presence: true, uniqueness: true
    validates :title, presence: true
    validates :poster_path, presence: true
    validates :backdrop_path, presence: true
    has_many :reviews
    belongs_to :movie_list, optional: true
end
