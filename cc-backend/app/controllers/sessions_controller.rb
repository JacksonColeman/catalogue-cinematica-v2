# app/controllers/api/sessions_controller.rb
class SessionsController < ApplicationController
  # POST /api/sessions (for user login)
  def create
    user = User.find_by(username: params[:username])
  
    if user && user.authenticate(params[:password])
      session[:user_id] = user.id
      render json: { user: user, message: 'Login successful' }, status: :ok
    else
      errors = ["Invalid username or password"]
      render json: { errors: errors }, status: :unauthorized
    end
  end

  # GET /api/sessions/check 
  def check
    puts session
      if session[:user_id]
        user = User.find_by(id: session[:user_id])
        render json: { active_session: true, user: user }, status: :ok
      else
        render json: { active_session: false }, status: :ok
      end
  end

  # DELETE /api/sessions (for user logout)
  def destroy
    session[:user_id] = nil
    head :no_content
  end
end
