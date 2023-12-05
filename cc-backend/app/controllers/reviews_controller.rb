class ReviewsController < ApplicationController
  def create
    # byebug
    tmdb_id = params[:review].delete(:tmdb_id)
    movie = Movie.find_by(tmdb_id: tmdb_id)

    if movie.nil?
      render json: { error: "Movie with TMDB ID #{tmdb_id} not found" }, status: :not_found
      return
    end

    review = Review.new(review_params.merge(user_id: current_user.id, movie_id: movie.id))

    if review.save
      render json: { message: 'Review created successfully', review: review }
    else
      render json: { error: review.errors.full_messages.join(', ') }, status: :unprocessable_entity
    end
  end

  def index
    movie = Movie.find_by(tmdb_id: params[:tmdb_id])

    if movie
      reviews = Review.where(movie_id: movie.id).order(created_at: :desc)
      reviews_data = reviews.map { |review| review_json(review) }
      render json: reviews_data, include: 'user'
    else
      render json: { error: 'Movie not found' }, status: :not_found
    end
  end

  # GET /api/reviews/user/:user_id
  def reviews_by_user
    user = User.find(params[:user_id])
    reviews = Review.where(user_id: user.id).order(created_at: :desc)
    render json: reviews, include: ['user','movie']
  end

  def all
    reviews = Review.all.order(created_at: :desc)
    render json: reviews, include: ['user','movie']
  end

  def like
    # byebug
    review = Review.find(params[:id])
    like = review.likes.build(user: current_user)

    if like.save
      render json: { message: 'Review liked successfully', likes_count: review.likes_count, liked_by_current_user: true }
    else
      render json: { error: like.errors.full_messages.join(', ') }, status: :unprocessable_entity
    end
  end

  def unlike
    review = Review.find(params[:id])
    like = review.likes.find_by(user: current_user)
  
    if like&.destroy
      render json: { message: 'Review unliked successfully', likes_count: review.likes_count, liked_by_current_user: false }
    else
      render json: { error: 'Unable to unlike the review' }, status: :unprocessable_entity
    end
  end

  def update
    review = Review.find(params[:id])

    if review.update(review_params)
      render json: { message: 'Review updated successfully', review: reviews_data, include: 'user'}
    else
      render json: { error: review.errors.full_messages.join(', ') }, status: :unprocessable_entity
    end
  end

  def destroy
    review = Review.find(params[:id])
  
    if review.destroy
      render json: { message: 'Review deleted successfully' }
    else
      render json: { error: 'Unable to delete the review' }, status: :unprocessable_entity
    end
  end

  def likes_count
    read_attribute(:likes_count)
  end

  private

  def review_params
    params.require(:review).permit(:tmdb_id, :rating, :text, :spoilers)
  end

  def review_json(review)
    json = review.as_json(include: 'user')
    json['liked_by_current_user'] = review.likes.exists?(user: current_user)
    json
  end
end
