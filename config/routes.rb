Rails.application.routes.draw do

  devise_for :users, :controllers => { omniauth_callbacks: 'omniauth_callbacks' }
  
  root 'home#index'
  get '/rooms', to: 'rooms#generate'
  get '/:room_session', to: 'rooms#show'
end
