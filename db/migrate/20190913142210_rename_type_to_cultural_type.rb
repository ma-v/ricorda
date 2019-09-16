class RenameTypeToCulturalType < ActiveRecord::Migration[5.2]
  def change
  	rename_column :cultural_goods, :type, :cultural_type
  end
end
