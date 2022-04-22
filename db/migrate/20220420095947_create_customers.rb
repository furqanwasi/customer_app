class CreateCustomers < ActiveRecord::Migration[7.0]
  def change
    create_table :customers do |t|
      t.string :name, presence: true
      t.string :email, presence: true, index: { unique: true }

      t.timestamps
    end
  end
end
