class CreateCulturalGoods < ActiveRecord::Migration[5.2]
  def change
    create_table :cultural_goods do |t|
      t.string :title
      t.string :type
      t.string :thematic
      t.references :creator, foreign_key: true

      t.timestamps
    end
  end
end
