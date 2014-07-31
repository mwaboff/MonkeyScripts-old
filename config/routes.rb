Rails.application.routes.draw do
  root to: 'pages#root'
  
  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :update, :show]
    resource :session, only: [:create, :destroy]
    resources :scripts
    get "/search", to: "searchs#search"
  end

  get "/install/:id.user.:format", to: "pages#install_script"
end
