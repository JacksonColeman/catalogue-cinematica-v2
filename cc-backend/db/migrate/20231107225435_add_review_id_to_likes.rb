class AddReviewIdToLikes < ActiveRecord::Migration[7.1]
  def change
    add_reference :likes, :review, foreign_key: true
  end
end
