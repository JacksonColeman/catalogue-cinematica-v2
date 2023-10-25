class Movie < ApplicationRecord
    validates :tmdb_id, presence: true, uniqueness: true
    validates :title, presence: true
    has_many :reviews
end
