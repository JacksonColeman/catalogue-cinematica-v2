class MovieList < ApplicationRecord
    belongs_to :user
    has_many :movies
  
    validates :name, presence: true
    validates :user_id, uniqueness: { scope: :name, message: 'List with this name already exists for the user' }
    validates :deletable, inclusion: { in: [true, false] }
  end