Rails.application.routes.draw do
  resources :customers do
    member do
      post '/udpate_line_items', to: 'customer_lists#update', as: :update_line_items
      get 'show_line_items', to: 'customer_lists#show'
    end
  end
  root "customers#index"
end
