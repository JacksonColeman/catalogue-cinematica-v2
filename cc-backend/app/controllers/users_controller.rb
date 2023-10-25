class UsersController < ApplicationController
  def create
    user = User.new(user_params)

    if user.save
      render json: { message: 'Signup successful', user: user }
    else
      render json: { error: user.errors.full_messages.join(', ') }, status: :unprocessable_entity
    end
  end

  def current
    render json: { user: current_user }
  end

  private

  def user_params
    params.permit(:username, :password, :password_confirmation)
  end
end