Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'pages#index'
  get '/signup' , to: "pages#index"
 
  namespace :api do
    namespace :v1 do
        resources :users ,only: [:create,:new]
        get 'users/:email/edit', to: 'users#edit', param: :email, constraints: { email: /.*/ }
        get 'users/:email', to: 'users#show', param: :email, constraints: { email: /.*/ }
        resources :team_members

    end
  end
  get '*path',to: 'pages#index',via: :all
end
