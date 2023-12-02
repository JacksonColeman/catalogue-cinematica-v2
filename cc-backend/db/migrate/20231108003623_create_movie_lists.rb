class CreateMovieLists < ActiveRecord::Migration[7.1]
  def change
    create_table :movie_lists do |t|
      t.string :name
      t.boolean :deletable
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
