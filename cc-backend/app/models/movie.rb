class Movie < ApplicationRecord
    validates :tmdb_id, presence: true, uniqueness: true
    validates :title, presence: true
    has_many :reviews
    has_and_belongs_to_many :movie_lists
end
