class ReviewSerializer < ActiveModel::Serializer
    attributes :id, :likes_count, :movie_id, :rating, :spoilers, :text, :created_at, :liked_by_current_user
  
    belongs_to :user
    belongs_to :movie
  
    def liked_by_current_user
      current_user_id = current_user&.id
      current_user_id && object.likes.exists?(user_id: current_user_id)
    end
  end