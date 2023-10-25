class AddSpoilersToReviews < ActiveRecord::Migration[7.1]
  def change
    add_column :reviews, :spoilers, :boolean
  end
end
