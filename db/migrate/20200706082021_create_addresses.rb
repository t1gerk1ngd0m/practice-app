class CreateAddresses < ActiveRecord::Migration[6.0]
  def change
    create_table :addresses do |t|
      t.string :prefecture
      t.string :city
      t.references :customer, null: false, foreign_key: true

      t.timestamps
    end
  end
end
