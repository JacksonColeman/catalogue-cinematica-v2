class Review < ApplicationRecord
  belongs_to :user
  belongs_to :movie
  has_many :likes, dependent: :destroy

  validates :user_id, uniqueness: { scope: :movie_id, message: 'You can only submit one review per movie.' }
  validates :likes_count, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
  validates :rating, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 1, less_than_or_equal_to: 10 }
  validates :text, presence: true
  validates :spoilers, inclusion: { in: [true, false] }
end
