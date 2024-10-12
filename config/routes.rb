Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'api/auth'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  namespace :api do
    resources :jobapps do 
      resources :notes
      resources :interviews
    end

    get '/jobapp_stats', to: 'jobapps#jobapp_stats'
    get '/total_interview_count', to: 'jobapps#total_interview_count'
    get '/unique_interview_count', to: 'jobapps#unique_interview_count'
  end
end
