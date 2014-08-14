Rails.application.routes.draw do

  devise_for :users, :controllers => { omniauth_callbacks: 'omniauth_callbacks' }
  get '/pages/home', to: 'pages#home'
  get '/pages/game', to: 'pages#game'
  get '/pages/chat', to: 'pages#chat'
  
end
