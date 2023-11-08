class AddUserIdToLikes < ActiveRecord::Migration[7.1]
  def change
    add_reference :likes, :user, foreign_key: true
  end
end
