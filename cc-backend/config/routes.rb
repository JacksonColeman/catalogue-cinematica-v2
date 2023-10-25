Rails.application.routes.draw do
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  post '/signup', to: 'users#create'
  get '/current_user', to: 'users#current'
  get '/check', to: 'sessions#check'
end
