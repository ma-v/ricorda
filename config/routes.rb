Rails.application.routes.draw do
  devise_for :users
  root to: 'memories#home'
  resources :memories
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
