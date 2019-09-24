class AddMdbIdToCulturalGoods < ActiveRecord::Migration[5.2]
  def change
  	add_column :cultural_goods, :movie_db_id, :string
  end
end
