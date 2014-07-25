Rails.application.routes.draw do
  root to: 'pages#root'
  
  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :update]
    resource :session, only: [:create, :destroy]
    resources :scripts
  end

  
end
