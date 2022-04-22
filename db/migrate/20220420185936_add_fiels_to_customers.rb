class AddFielsToCustomers < ActiveRecord::Migration[7.0]
  def change
    add_column :customers, :cost, :string
    add_column :customers, :budget_type, :string
    add_column :customers, :other_type, :string
    add_column :customers, :line_items, :json
  end
end
