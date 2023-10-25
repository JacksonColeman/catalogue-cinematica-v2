class ReviewsController < ApplicationController
  def create
    tmdb_id = params[:review][:tmdb_id]
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
      render json: reviews, include: 'user'
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
    review = Review.find(params[:id])
    like = review.likes.build(user: current_user)

    if like.save
      render json: { message: 'Review liked successfully', likes_count: review.likes_count }
    else
      render json: { error: like.errors.full_messages.join(', ') }, status: :unprocessable_entity
    end
  end

  def update
    review = Review.find(params[:id])

    if review.update(review_params)
      render json: { message: 'Review updated successfully', review: review }
    else
      render json: { error: review.errors.full_messages.join(', ') }, status: :unprocessable_entity
    end
  end

  private

  def review_params
    params.require(:review).permit(:rating, :text, :spoilers)
  end
end
