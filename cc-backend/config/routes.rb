Rails.application.routes.draw do
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  post '/signup', to: 'users#create'
  get '/current_user', to: 'users#current'
  get '/check', to: 'sessions#check'
  resources :movies, only: [:show, :create]

  resources :users, only: [:create, :show]

  resources :reviews, only: [:create, :index], param: :tmdb_id do
    collection do
      get 'user/:user_id', to: 'reviews#reviews_by_user', as: 'by_user'
      get 'all', to: 'reviews#all', as: 'all'
      get :like
    end
    member do
      put :update
    end
  end

  resources :reviews, only: [:update, :destroy] do
  end

  resources :movie_lists, only: [:index, :show, :create, :destroy, :update] do
    member do
      post 'add_movie/:movie_id', to: 'movie_lists#add_movie', as: 'add_movie'
      delete 'remove_movie/:movie_id', to: 'movie_lists#remove_movie', as: 'remove_movie'
      patch :update_name
    end
    collection do
      post 'add_to_favorites/:movie_id', action: :add_to_favorites, as: 'add_to_favorites'
      delete 'remove_from_favorites/:movie_id', action: :remove_from_favorites, as: 'remove_from_favorites'
      post 'add_to_list', action: :add_to_list
      delete 'remove_from_list', action: :remove_from_list
    end
  end

  post '/reviews/:id/like', to: 'reviews#like', as: 'like_review'
  delete '/reviews/:id/unlike', to: 'reviews#unlike', as: 'unlike_review'
end
