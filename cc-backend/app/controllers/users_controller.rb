class UsersController < ApplicationController
  def create
    user = User.new(user_params)

    if user.save
      session[:user_id] = user.id
      render json: { message: 'Signup successful', user: user }
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def current
    render json: current_user, serializer: UserSerializer, status: :ok
  end

  def show
    user = User.find_by(id: params[:id])

    if user
      render json: user, serializer: UserSerializer, status: :ok
    else
      render json: { error: 'User not found' }, status: :not_found
    end
  end

  private

  def user_params
    params.permit(:username, :password, :password_confirmation)
  end
end
