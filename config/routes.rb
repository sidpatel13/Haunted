Rails.application.routes.draw do

  get '/pages/home', to: 'pages#home'
  get '/pages/game', to: 'pages#game'
  get '/pages/chat', to: 'pages#chat'
  
end
