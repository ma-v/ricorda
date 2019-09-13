class CreateMemories < ActiveRecord::Migration[5.2]
  def change
    create_table :memories do |t|
      t.date :date
      t.integer :rating
      t.text :review
      t.references :user, foreign_key: true
      t.references :cultural_good, foreign_key: true
      t.references :venue, foreign_key: true

      t.timestamps
    end
  end
end
